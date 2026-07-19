---
title: 'Lesson 2 — IAM: Users, Groups, Roles (SAA)'
---

# Lesson 2 — IAM: Users, Groups, Roles

> **Module 1 · Foundations · Lesson 2 of 10** &nbsp;•&nbsp; **SAA-C03 Domain 1:** Secure networking and compute (IAM is cross-domain, tested everywhere)
> 📌 *Authoritative source:* [IAM User Guide](https://docs.aws.amazon.com/IAM/latest/UserGuide/) · [IAM JSON Policy Reference](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies.html) — verified against AWS docs.

IAM is the identity & authorization backbone. SAA-C03 asks heavily about **policy evaluation logic, condition keys, and when to use roles vs users**.

## 1. IAM entities

| Entity | Identified by | Long-term secret? |
|--------|---------------|-------------------|
| **User** | permanent identity (person/service) | Yes — access key |
| **Group** | collection of users | No — inherits policies |
| **Role** | temporary identity, **assumed** | No — STS issues temp creds |
| **Policy** | JSON permissions doc | n/a |

## 2. Policy evaluation logic (critical for the exam)

1. **Default: deny all.** Nothing is allowed unless explicitly allowed.
2. An **explicit Deny** always wins over any Allow.
3. An **Allow** in any attached policy (user, group, or role) permits the action.
4. **No** permission boundary / SCP / session policy can expand beyond what's granted.

> 🧠 **Exam tip:** If access is unexpectedly denied, look for an explicit `Deny` or a missing `Allow`. If unexpectedly allowed, check for a broad managed policy. "Deny overrides Allow" is a guaranteed SAA question.

## 3. Policy structure

<ExampleBox title="Identity policy (JSON)" lang="json">

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowS3ReadOwnBucket",
      "Effect": "Allow",
      "Action": ["s3:GetObject"],
      "Resource": "arn:aws:s3:::my-bucket/*",
      "Condition": { "StringEquals": { "aws:PrincipalTag/team": "data" } }
    }
  ]
}
```

</ExampleBox>

Key fields: `Effect` (Allow/Deny), `Action` (service:operation, supports `*`), `Resource` (ARN or `*`), `Condition` (context keys).

## 4. Condition keys (exam favorite)

- `aws:SourceIp` — restrict by IP range.
- `aws:PrincipalTag/...` — require a tag on the principal.
- `aws:RequestedRegion` — limit which regions actions may target.
- `aws:MultiFactorAuthPresent` — require MFA.
- `s3:prefix`, `s3:delimiter` — S3-specific scoping.

<ExampleBox title="Require MFA to stop EC2" lang="json">

```json
{
  "Effect": "Deny",
  "Action": "ec2:TerminateInstances",
  "Resource": "*",
  "Condition": { "BoolIfExists": { "aws:MultiFactorAuthPresent": "false" } }
}
```

</ExampleBox>

## 5. Users, groups, access keys

<ExampleBox title="Create user + key + managed policy" lang="bash">

```bash
aws iam create-user --user-name devuser
aws iam create-access-key --user-name devuser
aws iam attach-user-policy --user-name devuser \
  --policy-arn arn:aws:iam::aws:policy/AmazonS3ReadOnlyAccess
```
</ExampleBox>

Rotate keys regularly; deactivate (don't just delete) old ones. **Never** embed keys in code — use roles.

## 6. Roles & instance profiles

A role is assumed via STS (`AssumeRole`) and yields **temporary** credentials. EC2 uses an **instance profile** to assume a role — the SDK picks up creds automatically from the instance metadata service (IMDS).

<ExampleBox title="Role for EC2 to read S3" lang="bash">

```bash
cat > trust.json <<'EOF'
{ "Version":"2012-10-17",
  "Statement":[{ "Effect":"Allow","Principal":{"Service":"ec2.amazonaws.com"},
  "Action":"sts:AssumeRole" }] }
EOF
aws iam create-role --role-name ec2-s3-reader --assume-role-policy-document file://trust.json
aws iam attach-role-policy --role-name ec2-s3-reader \
  --policy-arn arn:aws:iam::aws:policy/AmazonS3ReadOnlyAccess
aws iam create-instance-profile --instance-profile-name web-profile
aws iam add-role-to-instance-profile --instance-profile-name web-profile --role-name ec2-s3-reader
```
</ExampleBox>

## 7. Permissions boundaries, SCPs, session policies

- **Permissions boundary** — caps the max permissions a user/role can have (delegated admin scenario).
- **SCP (Service Control Policy)** — guardrail at the Organizations account/OU level.
- **Session policy** — further restricts a temporary session.

## 8. Exercises

<ExerciseBox title="Least-privilege user" difficulty="Easy">
Create `reader`, attach only `AmazonS3ReadOnlyAccess`, run `aws s3 ls --profile reader` (works), then `aws s3 mb s3://x --profile reader` (Denied). Confirm the deny.
</ExerciseBox>

<ExerciseBox title="Conditional deny" difficulty="Medium">
Attach a customer-managed policy to `devuser` that **denies** `s3:DeleteObject` when `aws:MultiFactorAuthPresent` is false. Authenticate without MFA, attempt delete, observe the explicit Deny overriding any Allow.
</ExerciseBox>

<ExerciseBox title="Instance profile" difficulty="Medium">
Create `web-profile` from `ec2-s3-reader` and attach to an instance. SSH in, run `aws sts get-caller-identity` — the ARN shows the **role**, not a user. This proves no static key is used.
</ExerciseBox>

## 9. Self-Test (Flashcards)

<Quiz storageKey="quiz-aws-2" :cards="[
  { q: 'What wins: an explicit Deny or an Allow?', a: 'Explicit Deny always wins over any Allow.' },
  { q: 'What is the default IAM decision?', a: 'Deny — nothing is allowed unless explicitly permitted somewhere.' },
  { q: 'User vs role?', a: 'User has a long-term key; role is assumed for temporary credentials via STS.' },
  { q: 'What is an instance profile?', a: 'A container that lets an EC2 instance assume an IAM role (no static key).' },
  { q: 'What does a permissions boundary do?', a: 'Caps the maximum permissions a principal can be granted.' }
]" />

## 10. SAA Practice Questions

<Quiz storageKey="quiz-aws-2-exam" :cards="[
  { q: 'A developer needs temporary access to an S3 bucket from an EC2 app. Best practice?', a: 'Attach an IAM role (instance profile) — no long-term keys. SAA-correct.' },
  { q: 'An admin attaches both AmazonS3FullAccess (Allow) and a policy with Deny on s3:DeleteObject. Result?', a: 'Delete is denied — explicit Deny overrides Allow.' },
  { q: 'Which guardrail limits ALL accounts in an OU regardless of their IAM policies?', a: 'A Service Control Policy (SCP) in AWS Organizations.' },
  { q: 'A condition uses aws:RequestedRegion. What does it control?', a: 'It restricts which AWS regions an action may be performed in.' }
]" />

## 11. Resources (authoritative)

<ResourceTable title="Lesson 2 — official references" :resources="[
  { label: 'IAM User Guide', platform: 'Official', type: 'Docs', url: 'https://docs.aws.amazon.com/IAM/latest/UserGuide/' },
  { label: 'IAM JSON Policy Reference', platform: 'Official', type: 'Docs', url: 'https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies.html' },
  { label: 'IAM Condition Keys', platform: 'Official', type: 'Docs', url: 'https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_condition-keys.html' },
  { label: 'Security best practices in IAM', platform: 'Official', type: 'Docs', url: 'https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html' },
  { label: 'SCPs (Organizations)', platform: 'Official', type: 'Docs', url: 'https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html' }
]" />

## 12. Checklist

<ProgressChecklist :items="['Understand deny-overrides-allow', 'Created user + access key', 'Used a managed policy', 'Created group + added user', 'Created role + instance profile', 'Used a condition key']" storageKey="aws/2-iam" />

> Draft extra notes in the [Live Editor](/editor) and export them here.
