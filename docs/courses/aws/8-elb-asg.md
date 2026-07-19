---
title: 'Lesson 8 — ELB & Auto Scaling (SAA)'
---

# Lesson 8 — ELB & Auto Scaling

> **Module 3 · Managed Services · Lesson 8 of 10** &nbsp;•&nbsp; **SAA-C03 Domain 2:** Resilient, high-performance, elastic architectures
> 📌 *Authoritative source:* [ELB User Guide](https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/) · [EC2 Auto Scaling](https://docs.aws.amazon.com/autoscaling/ec2/userguide/) — verified against AWS docs.

ELB + ASG deliver **elasticity and resilience** — a cornerstone of the SAA exam.

## 1. Load balancer types

| Type | OSI | Use |
|------|-----|-----|
| **ALB** | L7 (HTTP/S) | path/host routing, microservices, containers |
| **NLB** | L4 (TCP/UDP) | ultra-low latency, static IP, millions req/s |
| **GWLB** | L3/L4 | security appliances |
| **CLB** | L4/L7 | legacy, avoid for new |

> 🧠 **Exam tip:** "Route `/api` to one target, `/static` to another" → **ALB** (L7). "Static IP + TCP at massive scale" → **NLB**.

## 2. Components & health checks

- **Target group** — a set of targets (instances, IPs, Lambda, ALB). Health check (protocol/port/path) decides in/out of rotation. **Unhealthy = removed**; ASG replaces the instance.
- **Listener** — port + protocol + default/rules → actions (forward, redirect, fixed response).
- **Sticky sessions** (ALB) — route a client to the same target (cookie).

## 3. Auto Scaling Group

- **Launch template/configuration** — what to launch (AMI, type, SG, key).
- **Min / Max / Desired** — capacity bounds.
- **Subnets (multi-AZ)** for resilience; instances spread across AZs.
- **Health check type**: EC2 (instance) or **ELB** (requests routed only if healthy).

## 4. Scaling policies

| Policy | Behavior |
|--------|----------|
| **Target tracking** | keep a metric (e.g. CPU 40%) at target — simplest |
| **Step scaling** | scale by alarm breach magnitude |
| **Simple scaling** | one adjustment per alarm |
| **Scheduled** | time-based (known peaks) |

## 5. Lifecycle hooks & termination

- **Lifecycle hooks** let you run code on instance launch/terminate (drain, backup).
- **Termination policies** choose which instance to remove first (oldest, AZ-balanced, etc.).
- **ASG + ALB** integration: instances register with target group automatically.

## 6. Deploy (CLI)

<ExampleBox title="Launch template + ASG + ALB" lang="bash">

```bash
aws ec2 create-launch-template --launch-template-name web-lt \
  --launch-template-data '{"ImageId":"ami-0c7217cdde317cfec","InstanceType":"t3.micro","KeyName":"mykey","SecurityGroupIds":["sg-0web"]}'
aws autoscaling create-auto-scaling-group --auto-scaling-group-name web-asg \
  --launch-template LaunchTemplateName=web-lt \
  --min-size 2 --max-size 4 --desired-capacity 2 \
  --vpc-zone-identifier "subnet-0a,subnet-0b" --health-check-type ELB
aws elbv2 create-target-group --name web-tg --protocol HTTP --port 80 --vpc-id vpc-0abc --target-type instance
aws elbv2 create-load-balancer --name web-alb --subnets subnet-0a subnet-0b --security-groups sg-0web
aws elbv2 create-listener --load-balancer-arn <alb> --protocol HTTP --port 80 \
  --default-actions Type=forward,TargetGroupArn=<tg>
```

</ExampleBox>

## 7. Exercises

<ExerciseBox title="ASG lifecycle" difficulty="Easy">
Create a launch template + ASG (`desired 2`); confirm 2 instances via `describe-instances`; set `desired-capacity 0`; clean up.
</ExerciseBox>

<ExerciseBox title="Health-check driven" difficulty="Medium">
Attach an ALB target group to the ASG; stop one instance's web process; confirm the target goes unhealthy and the ALB stops routing to it, then ASG replaces it.
</ExerciseBox>

## 8. Self-Test (Flashcards)

<Quiz storageKey="quiz-aws-8" :cards="[
  { q: 'ALB vs NLB?', a: 'ALB = L7 HTTP routing; NLB = L4 TCP, static IP, extreme throughput.' },
  { q: 'What removes an instance from an ALB?', a: 'A failed health check (unhealthy target).' },
  { q: 'Target tracking vs step scaling?', a: 'Target tracking holds a metric at a target (simple); step scales by alarm magnitude.' },
  { q: 'What do lifecycle hooks do?', a: 'Run custom actions on instance launch/terminate (drain/backup).' },
  { q: 'Why multi-AZ ASG?', a: 'Survives an AZ failure; capacity spread across zones.' }
]" />

## 9. SAA Practice Questions

<Quiz storageKey="quiz-aws-8-exam" :cards="[
  { q: 'Route /images to S3 and /api to EC2. Which LB?', a: 'ALB — L7 path-based routing (use a rule forwarding /images to a target/group).' },
  { q: 'CPU spikes unpredictably; you want automatic correction. Use?', a: 'Target tracking scaling policy on ASGAverageCPUUtilization.' },
  { q: 'An instance fails its ELB health check. What happens?', a: 'ALB stops sending traffic; ASG (health-check-type ELB) replaces it.' },
  { q: 'Need a fixed IP for a high-throughput TCP service. Use?', a: 'NLB — provides a static IP per AZ and L4 performance.' }
]" />

## 10. Resources (authoritative)

<ResourceTable title="Lesson 8 — official references" :resources="[
  { label: 'ELB User Guide', platform: 'Official', type: 'Docs', url: 'https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/' },
  { label: 'EC2 Auto Scaling', platform: 'Official', type: 'Docs', url: 'https://docs.aws.amazon.com/autoscaling/ec2/userguide/' },
  { label: 'Target groups', platform: 'Official', type: 'Docs', url: 'https://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-target-groups.html' },
  { label: 'Scaling policies', platform: 'Official', type: 'Docs', url: 'https://docs.aws.amazon.com/autoscaling/ec2/userguide/as-scaling-target-tracking.html' }
]" />

## 11. Checklist

<ProgressChecklist :items="['Created launch template', 'Created ASG (min/max/desired)', 'Created target group + ALB', 'Know ALB vs NLB', 'Added scaling policy']" storageKey="aws/8-elb-asg" />

> Draft extra notes in the [Live Editor](/editor) and export them here.
