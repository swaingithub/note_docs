---
title: AWS — Complete Course
---

# AWS — Complete Course

A hands-on, project-based course for learning Amazon Web Services from zero. We go from your first account and the CLI to compute, storage, networking, databases, and serverless — ending with a real architecture you can deploy. Follow the lessons in order, run every CLI command, tick the checklist.

> **Prereqs:** A free-tier AWS account + the AWS CLI v2 installed. We use the `us-east-1` region by default — change it with `--region` or via `aws configure`.
> **Difficulty:** Medium–Hard &nbsp;•&nbsp; **Time:** ~10–12 hours &nbsp;•&nbsp; **Style:** Udemy-style, project-based.

## Course Checklist

Track your overall progress. Check off each lesson as you complete it — progress is saved in your browser.

<ProgressChecklist :items="[
  'Lesson 1 — Account, CLI & Free Tier',
  'Lesson 2 — IAM: Users, Groups, Roles',
  'Lesson 3 — EC2: Your First Virtual Server',
  'Lesson 4 — S3: Object Storage',
  'Lesson 5 — VPC: Networking Foundations',
  'Lesson 6 — RDS: Managed Databases',
  'Lesson 7 — Lambda: Serverless Functions',
  'Lesson 8 — Load Balancers & Auto Scaling',
  'Lesson 9 — Security, IAM Roles & Best Practices',
  'Lesson 10 — Capstone: Deploy a 3-Tier App'
]" storageKey="aws/overview" />

## Modules

### Module 1 — Foundations
*Set up your account, the CLI, and identity & access management.*

- [Lesson 1 — Account, CLI & Free Tier](./1-account-cli)
- [Lesson 2 — IAM: Users, Groups, Roles](./2-iam)

### Module 2 — Core Compute & Storage
*The workhorses: virtual servers, object storage, and networking.*

- [Lesson 3 — EC2: Your First Virtual Server](./3-ec2)
- [Lesson 4 — S3: Object Storage](./4-s3)
- [Lesson 5 — VPC: Networking Foundations](./5-vpc)

### Module 3 — Managed Services
*Databases, serverless, scaling, and resilience.*

- [Lesson 6 — RDS: Managed Databases](./6-rds)
- [Lesson 7 — Lambda: Serverless Functions](./7-lambda)
- [Lesson 8 — Load Balancers & Auto Scaling](./8-elb-asg)

### Module 4 — Security & Capstone
*Lock it down and ship a real architecture.*

- [Lesson 9 — Security, IAM Roles & Best Practices](./9-security)
- [Lesson 10 — Capstone: Deploy a 3-Tier App](./10-capstone)

## Playground

Prefer to experiment before spending? Try the AWS CLI in a sandbox, or use the [In-Browser Editor](/editor) to draft infrastructure-as-code (Terraform/CloudFormation) snippets.

## SAA-C03 Exam Prep

This course is aligned to **AWS Certified Solutions Architect – Associate (SAA-C03)**. Each lesson has two flashcard sets: **concept cards** (`quiz-aws-N`) and **exam-style questions** (`quiz-aws-N-exam`). Use them together.

**Quick cheat sheet (high-yield):**

- **Global services:** IAM, Route 53, CloudFront, WAF, Organizations, RAM.
- **Storage classes:** unknown access → Intelligent-Tiering; archive → Glacier Deep; 11×9 durability S3.
- **EC2:** Spot = fault-tolerant/cheap; Reserved/Savings Plans = steady; Dedicated = isolation.
- **RDS:** Multi-AZ = HA (no reads); Read Replica = read scaling + DR; restore = new instance.
- **Aurora:** 6-way storage across 3 AZs; Serverless v2 (0.5–128 ACU); Global DB <1s.
- **VPC:** public = route to IGW; NACL stateless/subnet; SG stateful/instance; peering non-transitive.
- **Lambda:** mem→CPU; cold start → provisioned concurrency; max 15 min; 1000 acct concurrency.
- **Security:** roles-not-keys; SSE-KMS auditable; Secrets Manager rotates; CloudTrail audits; GuardDuty detects.

**Practice exam:** take the exam-style cards per lesson, then attempt a full pass: Lessons [1](./1-account-cli) → [2](./2-iam) → [3](./3-ec2) → [4](./4-s3) → [5](./5-vpc) → [6](./6-rds) → [7](./7-lambda) → [8](./8-elb-asg) → [9](./9-security) → [10](./10-capstone).

> 📌 *Authoritative source for exam objectives:* [SAA-C03 Exam Guide](https://aws.amazon.com/certification/certified-solutions-architect-associate/) and the [AWS Well-Architected Framework](https://docs.aws.amazon.com/wellarchitected/latest/framework/). Content here is verified against official AWS documentation but is a study aid, not an officially endorsed AWS product.

> 📝 Draft anything in the [Live Editor](/editor), then paste it here to keep your docs current.
