---
title: 'Lesson 9 — Security & Best Practices (SAA)'
---

# Lesson 9 — Security & Best Practices

> **Module 4 · Security & Capstone · Lesson 9 of 10** &nbsp;•&nbsp; **SAA-C03 Domain 1:** Secure architectures
> 📌 *Authoritative source:* [AWS Well-Architected (Security)](https://docs.aws.amazon.com/wellarchitected/latest/framework/security.html) · [IAM/CloudTrail/KMS docs] — verified against AWS docs.

Security is cross-cutting on SAA. Know **defense in depth, KMS, secrets management, logging/audit, and the right service for the right control**.

## 1. Defense in depth (layers)

- **IAM** — identity, least privilege, roles-not-keys, MFA.
- **Network** — SG (stateful, instance) + NACL (stateless, subnet) + private subnets.
- **Data** — encryption at rest (KMS) + in transit (TLS/ACM).
- **Detect** — CloudTrail, GuardDuty, Config, Macie.
- **Respond** — SCPs, automated remediation.

## 2. Encryption & KMS

- **KMS** — managed keys (CMK) with key policies, rotation, CloudTrail audit. **SSE-KMS** for S3/RDS/EBS uses a CMK.
- **Envelope encryption** — data key (KMS) encrypts data; master key encrypts the data key.
- **CloudHSM** — FIPS 140-2 Level 3, single-tenant HSM (when you need it).
- **Secrets Manager** — rotates DB credentials, integrates with RDS; **Parameter Store** (SSM) for config (also secure string).

> 🧠 **Exam tip:** "Rotate DB passwords automatically + audit" → **Secrets Manager**. "Encrypt with my own auditable key" → **KMS CMK**.

## 3. Logging & audit

- **CloudTrail** — records every API call (mgmt events; data events for S3/S3 optional). Turn on **at org level**, send to a dedicated, usually S3 + CloudWatch Logs, ideally **log file integrity validation**.
- **CloudWatch Logs/Metrics** — app + resource telemetry.
- **AWS Config** — records resource config & compliance over time; rules for drift.
- **GuardDuty** — threat detection (VPC flow, CloudTrail, DNS).
- **Macie** — discovers/protects PII in S3.
- **Inspector** — vulnerability scanning for EC2/lambda/containers.

## 4. Roles, not keys (again — it's on the exam)

Instance profile / Lambda execution role / ECS task role all use **temporary STS credentials**. Never bake access keys into AMIs or code.

## 5. Apply (CLI)

<ExampleBox title="Encrypt S3 + CloudTrail org trail" lang="bash">

```bash
aws s3api put-bucket-encryption --bucket my-bucket-2026 \
  --server-side-encryption-configuration '{"Rules":[{"ApplyServerSideEncryptionByDefault":{"SSEAlgorithm":"aws:kms","KMSMasterKeyID":"<key-arn>"}}]}'
aws cloudtrail create-trail --name audit --s3-bucket-name my-bucket-2026 --is-organization-trail
aws cloudtrail start-logging --name audit
```

</ExampleBox>

<ExampleBox title="Instance profile from a role" lang="bash">

```bash
aws iam create-instance-profile --instance-profile-name web-profile
aws iam add-role-to-instance-profile --instance-profile-name web-profile --role-name ec2-s3-reader
aws ec2 associate-iam-instance-profile --instance-id i-0abc --iam-instance-profile Name=web-profile
```

</ExampleBox>

## 6. Exercises

<ExerciseBox title="KMS + Secrets" difficulty="Easy">
Create a CMK, encrypt an S3 bucket with SSE-KMS, then store a fake DB password in Secrets Manager and `get-secret-value` to confirm. Enable CloudTrail; verify `get-trail-status`.
</ExerciseBox>

<ExerciseBox title="Instance profile proof" difficulty="Medium">
Attach `web-profile` (role) to an instance; SSH in; `aws sts get-caller-identity` shows the **role ARN**, proving no static key. Remove the profile after.
</ExerciseBox>

## 7. Self-Test (Flashcards)

<Quiz storageKey="quiz-aws-9" :cards="[
  { q: 'KMS vs Secrets Manager?', a: 'KMS encrypts with auditable CMKs; Secrets Manager rotates + stores credentials.' },
  { q: 'CloudTrail vs CloudWatch?', a: 'CloudTrail = API/audit logs; CloudWatch = metrics + app logs.' },
  { q: 'GuardDuty / Macie / Inspector?', a: 'GuardDuty = threat detection; Macie = PII in S3; Inspector = vuln scanning.' },
  { q: 'Why roles over keys on EC2?', a: 'Temporary STS creds, no long-term secret to leak; auto-rotated.' },
  { q: 'What is envelope encryption?', a: 'A data key (from KMS) encrypts data; the master key encrypts that data key.' }
]" />

## 8. SAA Practice Questions

<Quiz storageKey="quiz-aws-9-exam" :cards="[
  { q: 'Need to prove who decrypted an S3 object and when. Service?', a: 'KMS with CloudTrail — logs all CMK use; SSE-S3 has no per-key audit.' },
  { q: 'A DB password must rotate automatically every 30 days. Use?', a: 'Secrets Manager (built-in rotation, RDS integration).' },
  { q: 'Detect anomalous API calls indicating compromise. Use?', a: 'GuardDuty (analyzes CloudTrail/VPC Flow/DNS).' },
  { q: 'Find PII accidentally uploaded to a bucket. Use?', a: 'Macie (S3 PII discovery/classification).' }
]" />

## 9. Resources (authoritative)

<ResourceTable title="Lesson 9 — official references" :resources="[
  { label: 'Well-Architected: Security', platform: 'Official', type: 'Docs', url: 'https://docs.aws.amazon.com/wellarchitected/latest/framework/security.html' },
  { label: 'KMS Developer Guide', platform: 'Official', type: 'Docs', url: 'https://docs.aws.amazon.com/kms/latest/developerguide/' },
  { label: 'Secrets Manager', platform: 'Official', type: 'Docs', url: 'https://docs.aws.amazon.com/secretsmanager/latest/userguide/' },
  { label: 'CloudTrail User Guide', platform: 'Official', type: 'Docs', url: 'https://docs.aws.amazon.com/awscloudtrail/latest/userguide/' },
  { label: 'GuardDuty', platform: 'Official', type: 'Docs', url: 'https://docs.aws.amazon.com/guardduty/latest/ug/' },
  { label: 'Security best practices in IAM', platform: 'Official', type: 'Docs', url: 'https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html' }
]" />

## 10. Checklist

<ProgressChecklist :items="['Enabled SSE-KMS', 'Used Secrets Manager/Parameter Store', 'Enabled CloudTrail (org)', 'Attached role to instance', 'Reviewed defense-in-depth']" storageKey="aws/9-security" />

> Draft extra notes in the [Live Editor](/editor) and export them here.
