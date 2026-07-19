---
title: 'Lesson 1 — Account, CLI & Free Tier (SAA)'
---

# Lesson 1 — Account, CLI & Free Tier

> **Module 1 · Foundations · Lesson 1 of 10** &nbsp;•&nbsp; **SAA-C03 Domain:** Course Intro / Account & CLI fundamentals
> 📌 *Authoritative source:* [AWS General Reference](https://docs.aws.amazon.com/general/latest/gr/) · [AWS CLI User Guide](https://docs.aws.amazon.com/cli/latest/userguide/) — content below is verified against these docs.

This lesson establishes the AWS account model, the CLI, and the free tier — the footing for every later service. Certified Solutions Architect – Associate (SAA-C03) expects you to know **regions, AZs, the global vs regional scope of services, and the shared responsibility model** cold.

## 1. The AWS global infrastructure

- **Region** — a physical geographic area (e.g. `us-east-1`) with multiple isolated **Availability Zones (AZs)**.
- **AZ** — one or more discrete data centers with redundant power/cooling/networking. Named `us-east-1a`, `us-east-1b`, … (the letter suffix is randomized per account).
- **Edge location / Regional edge cache** — CloudFront/CDN PoPs (200+), distinct from regions.
- **Local Zone / Wavelength / Outpost** — extensions for low-latency or on-prem.

> 🧠 **Exam tip:** Most services are **regional** (EC2, S3, RDS, VPC). **Global** services: IAM, Route 53, CloudFront, WAF, Organizations, Resource Access Manager. Knowing which is which is a frequent SAA question.

## 2. Account, root, and the shared responsibility model

- The **root user** = the email used to create the account. It has unrestricted access. Enable **MFA** and never use it daily.
- **AWS Organizations** lets you manage multiple accounts (OU, SCP, consolidated billing).
- **Shared responsibility:** AWS secures the *cloud* (hardware, hypervisor, global infra); you secure *in* the cloud (OS, security groups, IAM, data encryption, customer data).

## 3. Install & configure the CLI

<ExampleBox title="Install AWS CLI v2" lang="bash">

```bash
# macOS
brew install awscli
# Linux
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip && sudo ./aws/install
aws --version
```

</ExampleBox>

Credentials live in `~/.aws/credentials`; settings (region, output) in `~/.aws/config`. You can use **named profiles** (`--profile devuser`) to switch identities.

<ExampleBox title="Configure a named profile" lang="bash">

```bash
aws configure --profile devuser
# AWS Access Key ID: AKIA...
# AWS Secret Access Key: ****
# Default region name: us-east-1
# Default output format: json
aws sts get-caller-identity --profile devuser
```

</ExampleBox>

`aws sts get-caller-identity` returns `UserId`, `Account`, and `Arn` — your first troubleshooting command when permissions fail.

## 4. The free tier

| Service | Free tier (12 months unless noted) |
|---------|-----------|
| EC2 | 750 hrs/mo of `t2.micro`/`t3.micro` |
| S3 | 5 GB std storage, 20k GET, 2k PUT |
| RDS | 750 hrs of `db.t2.micro`/`db.t3.micro` |
| Lambda | 1M req + 400k GB-s/mo (**always free**) |
| CloudWatch | 10 metrics, 5 GB logs (**always free**) |
| DynamoDB | 25 GB + 25 RCU/WCU (**always free**) |

> ⚠️ **Exam/real-world:** "Always free" services still need correct config to avoid charges. Set **billing alarms** + **CloudTrail** from day one.

## 5. Regions & endpoints

Every API call targets a regional endpoint. `aws configure get region` shows the default. The **ARN** (Amazon Resource Name) uniquely identifies a resource: `arn:aws:service:region:account-id:resource`.

<ExerciseBox title="Verify identity & scope" difficulty="Easy">
Install the CLI, configure a profile, and run `aws sts get-caller-identity --profile devuser`. Record the Account ID and the ARN's service/resource portion.
</ExerciseBox>

<ExerciseBox title="Region independence of identity" difficulty="Medium">
Run `aws sts get-caller-identity --region eu-west-1` and `--region ap-southeast-1`. Confirm the Account ID is identical (STS identity is global), while a regional call like `aws ec2 describe-instances --region eu-west-1` returns only that region's resources.
</ExerciseBox>

## 6. Self-Test (Flashcards)

<Quiz storageKey="quiz-aws-1" :cards="[
  { q: 'Which AWS services are global (not regional)?', a: 'IAM, Route 53, CloudFront, WAF, Organizations, RAM.' },
  { q: 'What does the shared responsibility model split?', a: 'AWS secures the cloud (infra); you secure in the cloud (OS, IAM, data, SGs).' },
  { q: 'Why avoid the root account for daily work?', a: 'Root is unrestricted; a leaked key is catastrophic. Use a scoped IAM user/role + MFA.' },
  { q: 'What does <code>aws sts get-caller-identity</code> return?', a: 'UserId, Account ID, and Arn of the authenticated principal.' },
  { q: 'What is an ARN?', a: 'A unique identifier: arn:aws:service:region:account-id:resource.' }
]" />

## 7. SAA Practice Questions

<Quiz storageKey="quiz-aws-1-exam" :cards="[
  { q: 'A company wants one consolidated bill for 12 AWS accounts. Which service enables this?', a: 'AWS Organizations (consolidated billing). Correct answer for SAA.' },
  { q: 'Which statement about AZ letter suffixes is TRUE?', a: 'The suffix (e.g. 1a) is randomized per account, so us-east-1a for you may differ from another account.' },
  { q: 'An EC2 instance is launched in us-east-1. Can it be reached from a VPC in eu-west-1?', a: 'No — a VPC and its subnets are confined to one region; cross-region requires peering/transit and explicit config.' },
  { q: 'Who is responsible for patching the guest OS on an EC2 instance?', a: 'The customer — under shared responsibility, AWS manages the hypervisor, you manage the OS.' }
]" />

## 8. Resources (authoritative)

<ResourceTable title="Lesson 1 — official references" :resources="[
  { label: 'AWS Global Infrastructure', platform: 'Official', type: 'Docs', url: 'https://aws.amazon.com/about-aws/global-infrastructure/' },
  { label: 'AWS General Reference (ARNs, regions)', platform: 'Official', type: 'Docs', url: 'https://docs.aws.amazon.com/general/latest/gr/' },
  { label: 'AWS CLI v2 User Guide', platform: 'Official', type: 'Docs', url: 'https://docs.aws.amazon.com/cli/latest/userguide/' },
  { label: 'AWS Shared Responsibility Model', platform: 'Official', type: 'Docs', url: 'https://aws.amazon.com/compliance/shared-responsibility-model/' },
  { label: 'AWS Free Tier', platform: 'Official', type: 'Docs', url: 'https://aws.amazon.com/free/' },
  { label: 'SAA-C03 Exam Guide', platform: 'Official', type: 'Docs', url: 'https://aws.amazon.com/certification/certified-solutions-architect-associate/' }
]" />

## 9. Checklist

<ProgressChecklist :items="['Created account + MFA on root', 'Installed AWS CLI v2', 'Configured a named profile', 'Verified identity (global vs regional)', 'Reviewed shared responsibility + free tier']" storageKey="aws/1-account-cli" />

> Draft extra notes in the [Live Editor](/editor) and export them here.
