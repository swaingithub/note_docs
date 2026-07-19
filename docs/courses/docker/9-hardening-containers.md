---
title: Hardening Containers
---

# Module 9 - Security: Hardening Containers

Defense-in-depth means reducing what a compromised container can do. Dropping Linux capabilities, using a read-only root filesystem, running as a non-root user, and disabling privilege escalation all shrink the attack surface.

## What You Will Learn

- How Docker runtime security controls map to Linux isolation features.
- How to build a least-privilege runtime profile for a real service.
- How to diagnose common breakages caused by read-only filesystems, dropped capabilities, and restricted users.
- How container hardening fits into image security, host security, secrets handling, and supply-chain controls.

## Prerequisites

- Basic Docker commands: `docker run`, `docker inspect`, and `docker compose up`.
- Linux process basics: users, filesystems, signals, ports, and permissions.
- The idea that containers share the host kernel; they are isolated processes, not full virtual machines.

## Mental Model

A hardened container is a process with a smaller blast radius. If an attacker gets code execution inside it, you want them trapped in a narrow sandbox: few kernel privileges, few writable paths, no root escalation, limited resources, and no unnecessary host access.

Hardening is not one magic flag. It is a stack of controls:

| Layer | Goal | Example Control |
| --- | --- | --- |
| Image | Ship less attack surface | Distroless image, pinned versions, CVE scanning |
| Runtime | Remove privileges | `cap_drop`, `read_only`, `no-new-privileges` |
| Filesystem | Limit tampering | `read_only: true`, explicit writable volumes |
| Kernel boundary | Reduce syscall/capability access | seccomp, AppArmor, SELinux, capabilities |
| Network | Expose only what is needed | private networks, minimal published ports |
| Operations | Detect and recover | logs, metrics, healthchecks, restart policy |

## Deep Mechanics

Docker relies on Linux kernel primitives:

- **Namespaces** give the process its own view of users, processes, mounts, and networks.
- **Cgroups** limit CPU, memory, and other resources.
- **Capabilities** split root privileges into smaller pieces such as `NET_BIND_SERVICE`, `SYS_ADMIN`, and `CHOWN`.
- **Seccomp** filters which syscalls a process may use.
- **AppArmor or SELinux** can add mandatory access control policy.

The dangerous mistake is thinking "container" automatically means "safe." A container runs on the host kernel. If you mount the Docker socket, run as privileged, add broad capabilities, or write secrets into the image, a compromise can escape the small sandbox you expected.

## Hardened Runtime Flags

<ExampleBox title="Hardened docker run" lang="bash">

```bash
docker run -d \
  --name myapp \
  --user 10001:10001 \
  --cap-drop ALL \
  --cap-add NET_BIND_SERVICE \
  --read-only \
  --tmpfs /tmp:rw,noexec,nosuid,size=64m \
  --security-opt no-new-privileges \
  --memory=256m \
  --cpus=0.5 \
  -p 8080:8080 \
  myapp:1.0
```

</ExampleBox>

Key controls:

- `--user 10001:10001` avoids running the app as root.
- `--cap-drop ALL` removes all capabilities; re-add only what the app needs.
- `NET_BIND_SERVICE` is only needed when a non-root process must bind to privileged ports such as 80.
- `--read-only` prevents runtime tampering with the root filesystem.
- `--tmpfs /tmp` gives the app an explicit writable scratch path.
- `no-new-privileges` blocks setuid binaries from gaining more privileges at runtime.
- CPU and memory limits reduce noisy-neighbor and denial-of-service blast radius.

## Compose Version

<ExampleBox title="Hardening in compose.yaml" lang="yaml">

```yaml
services:
  app:
    image: myapp:1.0
    user: "10001:10001"
    read_only: true
    tmpfs:
      - /tmp:rw,noexec,nosuid,size=64m
    cap_drop:
      - ALL
    cap_add:
      - NET_BIND_SERVICE
    security_opt:
      - no-new-privileges:true
    mem_limit: 256m
    cpus: 0.5
    ports:
      - "8080:8080"
```

</ExampleBox>

## Production Hardening Checklist

| Area | 10/10 Practice | Verification |
| --- | --- | --- |
| User | Run as a non-root UID/GID | `docker inspect --format '&lbrace;&lbrace;.Config.User&rbrace;&rbrace;' image` |
| Capabilities | Drop all, add back only required capabilities | Check `HostConfig.CapDrop` and `HostConfig.CapAdd` |
| Filesystem | Make root filesystem read-only | Check `HostConfig.ReadonlyRootfs` |
| Writable paths | Use explicit `tmpfs` or named volumes | App writes only to expected paths |
| Privilege escalation | Enable `no-new-privileges` | Check `SecurityOpt` |
| Secrets | Use runtime secrets, not image layers or committed env files | `docker history` does not expose secrets |
| Networking | Publish only required ports | `docker ps` and firewall rules match design |
| Resources | Set CPU and memory limits | `docker stats` and inspect cgroup limits |
| Supply chain | Pin image versions and scan CVEs | Docker Scout, Trivy, or equivalent scanner |
| Observability | Emit structured logs and health status | Logs, healthcheck, alerts |

## Failure Modes and Debugging

| Symptom | Likely Cause | Fix |
| --- | --- | --- |
| App cannot write logs or cache | Root filesystem is read-only | Write to stdout/stderr, `/tmp`, a named volume, or app-specific writable mount |
| Permission denied binding to port 80 | Non-root process lacks `NET_BIND_SERVICE` | Use high port such as 8080, or add only `NET_BIND_SERVICE` |
| Package manager fails at startup | Container tries to mutate itself | Move installation to image build time |
| Healthcheck fails after hardening | Probe depends on missing shell/tool | Use an app-native health endpoint or include the minimal probe binary |
| Debug shell missing | Distroless/minimal image has no shell | Use a debug variant or ephemeral debug container |
| App breaks after dropping all capabilities | It depended on a kernel privilege | Identify the exact need, then add the single capability required |

## Decision Guide

- Use strict hardening for internet-facing services, CI runners, multi-tenant workloads, and anything processing untrusted input.
- Relax controls only when a specific requirement proves necessary, and document the reason.
- Avoid `--privileged`, host PID/network modes, and Docker socket mounts unless you are intentionally building infrastructure tooling and understand the host-level risk.
- Prefer Kubernetes `securityContext` equivalents in clusters: `runAsNonRoot`, `readOnlyRootFilesystem`, `allowPrivilegeEscalation: false`, `capabilities.drop`, seccomp profiles, and network policies.

## Exercises

<ExerciseBox title="Harden a running container" difficulty="Medium">
Take a working container and relaunch it with `--cap-drop ALL`, `--read-only`, `--tmpfs /tmp`, and `--security-opt no-new-privileges`. Fix any write-path errors by mounting writable volumes or tmpfs, then confirm it still serves traffic.
</ExerciseBox>

<ExerciseBox title="Express hardening in Compose" difficulty="Easy">
Add `read_only`, `cap_drop`, `security_opt`, and `tmpfs` to a service in your `compose.yaml`. Run `docker compose up` and verify the settings with `docker inspect`.
</ExerciseBox>

<ExerciseBox title="Threat-model a production container" difficulty="Hard">
Pick a real web app container and document its assets, trust boundaries, exposed ports, writable paths, required capabilities, secrets, and recovery plan. Produce a hardened Compose file and explain every exception.
</ExerciseBox>

## Self-Test (Flashcards)

<Quiz storageKey="quiz-docker-hardening-containers" :cards="[
  { q: 'What does <code>--cap-drop ALL</code> do, and when would you re-add a capability?', a: 'It removes all Linux capabilities; re-add only what the app needs, e.g. <code>NET_BIND_SERVICE</code> to bind a privileged port.' },
  { q: 'What does <code>--read-only</code> do to the container filesystem?', a: 'It makes the root filesystem read-only, preventing runtime tampering; use <code>tmpfs</code> or volumes for writable paths.' },
  { q: 'What does <code>--security-opt no-new-privileges</code> prevent?', a: 'It blocks setuid or similar mechanisms from gaining more privileges at runtime.' },
  { q: 'Why is mounting the Docker socket dangerous?', a: 'It can give the container control over the Docker daemon and therefore host-level power.' },
  { q: 'What should you do when a read-only root filesystem breaks an app?', a: 'Find the required write paths and mount only those paths as tmpfs or volumes.' }
]" />

## Resources

<ResourceTable title="Hardening Containers" :resources="[
  { label: 'Docker security', platform: 'Official', type: 'Docs', url: 'https://docs.docker.com/engine/security/' },
  { label: 'Docker Compose service reference', platform: 'Official', type: 'Docs', url: 'https://docs.docker.com/reference/compose-file/services/' },
  { label: 'Docker Scout image analysis', platform: 'Official', type: 'Docs', url: 'https://docs.docker.com/scout/' },
  { label: 'CIS Docker Benchmark', platform: 'CIS', type: 'Benchmark', url: 'https://www.cisecurity.org/benchmark/docker' },
  { label: 'Kubernetes security context', platform: 'Official', type: 'Docs', url: 'https://kubernetes.io/docs/tasks/configure-pod-container/security-context/' },
  { label: 'OWASP Docker Security Cheat Sheet', platform: 'OWASP', type: 'Guide', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Docker_Security_Cheat_Sheet.html' }
]" />

## Checklist

<ProgressChecklist :items="['Dropped capabilities', 'Used read-only FS', 'Set no-new-privileges', 'Ran as non-root', 'Documented writable paths', 'Threat-modeled Docker socket and host mounts']" storageKey="docker/9-hardening-containers" />

> Draft extra notes in the [Live Editor](/editor) and export them here.
