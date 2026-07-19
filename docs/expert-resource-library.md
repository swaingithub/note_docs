---
title: Expert Resource Library
---

# Expert Resource Library

This is the high-signal resource map for turning DevNotes into expert-level notes. Prefer these over generic tutorials when deepening pages.

## How to Use This Library

- Use **official docs** for current behavior, commands, APIs, and deployment guidance.
- Use **books and papers** for durable concepts, design tradeoffs, algorithms, and theory.
- Use **postmortems and engineering blogs** for production reality: incidents, scaling limits, migrations, and failure modes.
- Use **specifications** when precision matters: language behavior, protocols, file formats, and security standards.

## Computer Science

| Area | Expert Resources | Why It Matters |
| --- | --- | --- |
| Programming foundations | SICP, How to Design Programs, CS50 | Builds the mental model for abstraction, recursion, state, and programs as data. |
| Systems | Computer Systems: A Programmer's Perspective, OSTEP | Explains memory, processes, concurrency, filesystems, and operating-system behavior. |
| Architecture | Nand2Tetris, Patterson & Hennessy | Connects logic gates, CPU design, assembly, compilers, and machine execution. |
| Distributed systems | MIT 6.824, Designing Data-Intensive Applications | Teaches consensus, replication, partitioning, clocks, and failure handling. |
| Algorithms | CLRS, Algorithm Design Manual, CP-algorithms | Gives proofs, complexity analysis, and implementation patterns. |

## Web Development

| Area | Expert Resources | Why It Matters |
| --- | --- | --- |
| Web platform | MDN Web Docs, WHATWG HTML, W3C specs | Primary source for browser APIs, semantics, accessibility, and compatibility. |
| JavaScript | ECMAScript specification, You Don't Know JS Yet | Separates language truth from framework folklore. |
| HTTP | RFC 9110, MDN HTTP, High Performance Browser Networking | Explains caching, headers, methods, TLS, connection reuse, and network performance. |
| Frontend architecture | Web.dev, Chrome Developers, React/Vue official docs | Covers performance, rendering, hydration, state, and app structure. |
| Accessibility | WCAG, WAI-ARIA Authoring Practices | Essential for professional UI quality. |

## Data Structures and Algorithms

| Area | Expert Resources | Why It Matters |
| --- | --- | --- |
| Complexity | CLRS, MIT 6.006 | Gives formal reasoning for time, space, recurrence, and amortized analysis. |
| Problem solving | Algorithm Design Manual, Competitive Programmer's Handbook | Builds pattern recognition and implementation fluency. |
| Graphs | CLRS, CP-algorithms | Covers BFS, DFS, shortest paths, MSTs, flows, SCCs, and topological reasoning. |
| Dynamic programming | MIT 6.006/6.046, AtCoder DP archive | Turns memorized patterns into recurrence design skill. |

## Machine Learning and AI

| Area | Expert Resources | Why It Matters |
| --- | --- | --- |
| Foundations | Mathematics for Machine Learning, Dive into Deep Learning | Builds linear algebra, probability, optimization, and tensor intuition. |
| Deep learning | Deep Learning Book, Stanford CS231n, MIT 6.S191 | Explains neural architectures, training, regularization, and optimization. |
| NLP and Transformers | Stanford CS224N, Attention Is All You Need, The Annotated Transformer | Covers attention, embeddings, sequence modeling, and modern language models. |
| MLOps | Made With ML, Google ML Engineering, Full Stack Deep Learning | Shows evaluation, deployment, monitoring, data drift, and production loops. |
| LLM systems | OpenAI docs, Hugging Face docs, LangChain/LlamaIndex docs as secondary | Connects prompting, retrieval, tool use, evaluation, and safety. |

## Databases

| Area | Expert Resources | Why It Matters |
| --- | --- | --- |
| Relational design | Database System Concepts, PostgreSQL docs | Teaches normalization, transactions, indexes, query planning, and constraints. |
| Internals | Designing Data-Intensive Applications, CMU 15-445 | Explains storage engines, B-trees, LSM trees, WAL, recovery, and concurrency control. |
| SQL mastery | PostgreSQL docs, Use The Index Luke | Builds serious query, indexing, and performance-tuning skill. |
| Distributed data | DDIA, Spanner paper, Dynamo paper, Bigtable paper | Explains replication, partitioning, consistency, and tradeoffs. |

## System Design

| Area | Expert Resources | Why It Matters |
| --- | --- | --- |
| Core theory | Designing Data-Intensive Applications | Best single source for reliability, scalability, maintainability, and data systems. |
| Large-scale architecture | Google SRE books, AWS Architecture Center | Teaches reliability targets, error budgets, capacity, incident response, and cloud tradeoffs. |
| Distributed systems papers | Dynamo, Spanner, MapReduce, Bigtable, Raft | Shows why real distributed systems are designed the way they are. |
| Practice | System Design Primer, ByteByteGo as secondary | Useful for interview framing, but should be backed by deeper sources. |

## DevOps and Cloud

| Area | Expert Resources | Why It Matters |
| --- | --- | --- |
| Linux | Linux man pages, The Linux Programming Interface, OSTEP | Explains the environment containers and servers actually run on. |
| Git | Pro Git, Git documentation | Builds real version-control fluency beyond memorized commands. |
| CI/CD | GitHub Actions docs, GitLab CI docs, DORA research | Connects pipelines to release safety, deployment frequency, and recovery. |
| Reliability | Google SRE books, OpenTelemetry docs | Teaches monitoring, alerting, incident response, SLIs/SLOs, and tracing. |

## Docker and Containers

| Area | Expert Resources | Why It Matters |
| --- | --- | --- |
| Docker behavior | Docker official docs, Dockerfile reference, Compose reference | Primary source for commands, image building, networking, storage, and Compose. |
| Container security | Docker security docs, CIS Docker Benchmark, OWASP Docker cheat sheet | Covers hardening, least privilege, image scanning, and daemon risks. |
| Image quality | Distroless docs, BuildKit docs, SLSA, Sigstore/cosign | Teaches reproducible, minimal, signed, and verifiable artifacts. |
| Runtime internals | Linux namespaces, cgroups, seccomp, OCI runtime spec | Explains what containers really are under the hood. |

## Kubernetes

| Area | Expert Resources | Why It Matters |
| --- | --- | --- |
| Core Kubernetes | Kubernetes official docs | Primary source for pods, deployments, services, ingress, scheduling, and config. |
| Operations | Kubernetes Patterns, Google SRE, CNCF TAG resources | Teaches probes, rollouts, autoscaling, reliability, and cluster operations. |
| Security | Kubernetes security docs, NSA/CISA hardening guide, RBAC docs | Covers workload isolation, admission, secrets, policies, and cluster hardening. |
| GitOps | Argo CD docs, Flux docs | Explains declarative delivery and cluster state reconciliation. |
| Observability | OpenTelemetry, Prometheus, Grafana docs | Teaches metrics, traces, logs, dashboards, and alerting. |

## Cybersecurity

| Area | Expert Resources | Why It Matters |
| --- | --- | --- |
| Web security | OWASP Top 10, OWASP Cheat Sheet Series, PortSwigger Web Security Academy | Builds practical exploit and defense knowledge. |
| Secure engineering | Secure by Design, NIST SSDF, threat modeling resources | Teaches designing systems that resist whole classes of failures. |
| Cryptography | Serious Cryptography, Cryptopals, NIST guidance | Helps avoid dangerous DIY crypto mistakes. |
| AppSec testing | Burp Suite Academy, OWASP Testing Guide | Converts theory into testable security workflows. |

## Language Mastery

| Language | Primary Sources | Expert Topics |
| --- | --- | --- |
| JavaScript/TypeScript | ECMAScript spec, TypeScript handbook, MDN | Event loop, prototypes, types, modules, bundling, async, runtime differences. |
| Python | Python docs, Fluent Python, Effective Python | Data model, iterators, descriptors, async, packaging, typing, performance. |
| Java | Java Language Spec, Effective Java, JVM docs | Generics, concurrency, memory model, GC, JVM tuning, design patterns. |
| C/C++ | C standard references, cppreference, Effective Modern C++ | Undefined behavior, memory, templates, RAII, concurrency, ABI. |
| Go | Go spec, Effective Go, Go blog | Interfaces, goroutines, channels, memory model, profiling, modules. |
| Rust | Rust Book, Rustonomicon, Rust reference | Ownership, lifetimes, unsafe, traits, concurrency, zero-cost abstractions. |
| SQL | PostgreSQL docs, Use The Index Luke | Query planning, indexing, transactions, isolation, schema design. |
