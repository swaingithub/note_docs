---
title: 'Lesson 10 — Capstone: Deploy a 3-Tier App'
---

# Lesson 10 — Capstone: Deploy a 3-Tier App

Time to combine everything into a real, secure architecture: a **public ALB → private app tier (ASG) → private RDS**, with static assets on S3 + CloudFront. This is the kind of design you describe in an interview and deploy in production.

## The architecture

```
Internet
   │
CloudFront (CDN, cache static)
   │
ALB (public subnets)  ──►  ASG of EC2 (private subnets, port 80)
   │                          │
   │                      RDS PostgreSQL (private subnets)
S3 (static assets, encrypted)
CloudTrail (audit all)
```

## Module A — Network (from Lesson 5)

- VPC `10.0.0.0/16`
- 2 public subnets (ALB + NAT), 2 private subnets (app + DB)
- IGW + NAT gateway

## Module B — Data (from Lesson 6)

- RDS PostgreSQL in private subnets, `db.t3.micro`, encrypted, not public

## Module C — Compute (from Lessons 3 & 8)

- Launch template with `ec2-s3-reader` instance profile
- ASG (2–4) in private subnets
- ALB + target group in public subnets, HTTP:80 → targets

## Module D — Static + CDN

<ExampleBox title="Static site + CloudFront" lang="bash">

```bash
aws s3 mb s3://my-app-static-2026
aws s3 sync ./dist s3://my-app-static-2026
aws cloudfront create-distribution \
  --origin-domain-name my-app-static-2026.s3.amazonaws.com \
  --default-root-object index.html
```

</ExampleBox>

## Module E — Lock down (from Lesson 9)

- SG for app tier: allow 80 only from the ALB SG
- RDS SG: allow 5432 only from the app-tier SG
- CloudTrail on; S3 + RDS encrypted

## Validation

<ExampleBox title="Smoke test" lang="bash">

```bash
# hit the ALB DNS name
curl http://<alb-dns>
# should return your app's HTML
# check ASG health
aws autoscaling describe-auto-scaling-groups --auto-scaling-group-names web-asg
```

</ExampleBox>

## Teardown (avoid charges)

Delete in reverse order: CloudFront → ALB/listener → ASG (desired 0) → RDS → NAT → VPC. Or use the [In-Browser Editor](/editor) to write a Terraform/`aws cloudformation delete-stack` cleanup script.

<ExerciseBox title="Capstone challenge" difficulty="Hard">
Deploy the 3-tier stack in a test account: VPC + subnets, RDS (private), ASG + ALB (public), and an S3+CloudFront static layer. Document the security groups proving the DB is unreachable from the internet. Then tear it all down.
</ExerciseBox>

## Self-Test (Flashcards)

<Quiz storageKey="quiz-aws-10" :cards="[
  { q: 'Why is the app tier in private subnets but the ALB in public?', a: 'The ALB must face the internet; app servers should only be reachable via the ALB, not directly.' },
  { q: 'What does CloudFront add?', a: 'A global CDN caching static content close to users, reducing latency and origin load.' },
  { q: 'How do you prove the DB is not internet-reachable?', a: 'Its security group allows 5432 only from the app-tier SG, and it has no route to an IGW.' },
  { q: 'Why tear down in reverse order?', a: 'Resources depend on others (ALB needs SG/VPC); deleting dependencies first fails or orphans cost.' }
]" />

## Resources

<ResourceTable title="Lesson 10 — further reading" :resources="[
  { label: '3-tier reference architecture', platform: 'Official', type: 'Docs', url: 'https://docs.aws.amazon.com/wellarchitected/latest/reference-architecture/ra-on-aws.html' },
  { label: 'CloudFront Developer Guide', platform: 'Official', type: 'Docs', url: 'https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/' },
  { label: 'AWS Solutions Library', platform: 'Official', type: 'Docs', url: 'https://aws.amazon.com/solutions/' }
]" />

## Checklist

<ProgressChecklist :items="['Designed VPC + subnets', 'Deployed RDS in private tier', 'Deployed ASG + ALB', 'Added S3 + CloudFront', 'Locked down SGs', 'Tore down cleanly']" storageKey="aws/10-capstone" />

> Draft extra notes in the [Live Editor](/editor) and export them here.

## 11. SAA Practice Questions (capstone)

<Quiz storageKey="quiz-aws-10-exam" :cards="[
  { q: 'A 3-tier app must survive an AZ failure with no data loss and <1 min RTO. Design?', a: 'Multi-AZ RDS (sync standby) + ASG across ≥2 AZs + ALB multi-AZ; RPO≈0 via sync replication.' },
  { q: 'The DB must never be reachable from the internet. How?', a: 'Private subnet + SG allowing 5432 only from the app-tier SG + no IGW route; optionally a VPC endpoint.' },
  { q: 'Static assets must be served globally with low latency. Add?', a: 'CloudFront in front of the S3 origin (OAC), caching at edge locations.' },
  { q: 'You want to prove every API change is audited. Enable?', a: 'CloudTrail (org trail) shipping to a dedicated, access-controlled S3 bucket.' }
]" />

## 12. Well-Architected mapping

| Pillar | How this design scores |
|--------|------------------------|
| **Operational Excellence** | CloudTrail + CloudWatch + ASG self-healing |
| **Security** | Roles-not-keys, private DB, SSE, SG/NACL, GuardDuty-ready |
| **Reliability** | Multi-AZ, ASG, Multi-AZ RDS, health checks |
| **Performance Efficiency** | ALB + CloudFront caching, right-sized instances |
| **Cost Optimization** | t3.micro free-tier, ASG scaling to zero headroom, IA/lifecycle for S3 |

> This maps directly to the SAA-C03 "Design secure, resilient, high-performing, cost-optimized architectures" goal.
