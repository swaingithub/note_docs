---
title: 'Lesson 9 — Security, IAM Roles & Best Practices'
---

# Lesson 9 — Security, IAM Roles & Best Practices

AWS security is layered: identity, network, data, and logging. This lesson consolidates the secure-by-default habits you should carry into every project.

## The shared responsibility model

- **AWS** secures the cloud (hardware, hypervisor, global infra).
- **You** secure in the cloud (OS patches on EC2, security groups, IAM, data encryption).

## Security groups vs NACLs

| | Security group | NACL |
|---|---|---|
| Stateful? | Yes | No |
| Scope | Instance | Subnet |
| Default | Deny all inbound | Allow all (default) |

## Encryption

- **At rest** — S3 SSE, RDS storage encryption, EBS encryption.
- **In transit** — TLS (HTTPS/ALB listeners, ACM certs).

<ExampleBox title="Encrypt an S3 bucket by default" lang="bash">

```bash
aws s3api put-bucket-encryption \
  --bucket my-unique-bucket-2026 \
  --server-side-encryption-configuration '{"Rules":[{"ApplyServerSideEncryptionByDefault":{"SSEAlgorithm":"AES256"}}]}'
```

</ExampleBox>

## Use roles, not keys, on instances

Never bake access keys into EC2. Attach an **instance profile** (role) — the SDK picks up credentials automatically.

<ExampleBox title="Attach a role to an instance" lang="bash">

```bash
aws iam create-instance-profile --instance-profile-name web-profile
aws iam add-role-to-instance-profile --instance-profile-name web-profile \
  --role-name ec2-s3-reader
aws ec2 associate-iam-instance-profile --instance-id i-0abc \
  --iam-instance-profile Name=web-profile
```

</ExampleBox>

## Logging & auditing

- **CloudTrail** — records every API call (who did what, when).
- **CloudWatch** — metrics + logs.

<ExampleBox title="Enable CloudTrail" lang="bash">

```bash
aws cloudtrail create-trail --name audit --s3-bucket-name my-unique-bucket-2026
aws cloudtrail start-logging --name audit
```

</ExampleBox>

## Best practices checklist

- ✅ MFA on root + all users
- ✅ Least-privilege policies
- ✅ Roles (not keys) on EC2/Lambda
- ✅ Resources in private subnets where possible
- ✅ Encryption at rest + in transit
- ✅ CloudTrail + billing alarms on

<ExerciseBox title="Encrypt + audit" difficulty="Easy">
Enable default SSE on a bucket and turn on CloudTrail for your account. Confirm both with `aws s3api get-bucket-encryption` and `aws cloudtrail get-trail-status`.
</ExerciseBox>

<ExerciseBox title="Instance profile" difficulty="Medium">
Create an instance profile from the `ec2-s3-reader` role and attach it to an instance. SSH in and run `aws sts get-caller-identity` — it should show the role ARN, not a user.
</ExerciseBox>

## Self-Test (Flashcards)

<Quiz storageKey="quiz-aws-9" :cards="[
  { q: 'Shared responsibility: who patches the EC2 OS?', a: 'You do — AWS only secures the physical/hypervisor layer.' },
  { q: 'Security group vs NACL?', a: 'SG is stateful + per-instance; NACL is stateless + per-subnet.' },
  { q: 'Why use an instance profile instead of keys?', a: 'The role supplies temporary credentials automatically; no long-term secret to leak.' },
  { q: 'What does CloudTrail record?', a: 'Every API call made in the account — who, what, when, from where.' }
]" />

## Resources

<ResourceTable title="Lesson 9 — further reading" :resources="[
  { label: 'AWS Well-Architected', platform: 'Official', type: 'Docs', url: 'https://docs.aws.amazon.com/wellarchitected/latest/framework/' },
  { label: 'Security best practices', platform: 'Official', type: 'Docs', url: 'https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html' },
  { label: 'CloudTrail User Guide', platform: 'Official', type: 'Docs', url: 'https://docs.aws.amazon.com/awscloudtrail/latest/userguide/' }
]" />

## Checklist

<ProgressChecklist :items="['Enabled S3 encryption', 'Attached a role to an instance', 'Enabled CloudTrail', 'Reviewed best-practices checklist']" storageKey="aws/9-security" />

> Draft extra notes in the [Live Editor](/editor) and export them here.
