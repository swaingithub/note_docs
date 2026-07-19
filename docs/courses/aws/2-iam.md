---
title: 'Lesson 2 — IAM: Users, Groups, Roles'
---

# Lesson 2 — IAM: Users, Groups, Roles

IAM (Identity and Access Management) controls **who** can do **what** in your AWS account. It is the security backbone of everything else.

## The IAM model

- **Principal** — the entity making a request (user, role, service).
- **Policy** — a JSON document stating allowed/denied actions on resources.
- **User** — a long-term identity for a person or service.
- **Group** — a collection of users that share policies.
- **Role** — a temporary identity assumed by a principal (no long-term key).

> 💡 **Principle of least privilege:** grant only the permissions needed, nothing more.

## Create a user + access key

<ExampleBox title="Create a user and an access key" lang="bash">

```bash
aws iam create-user --user-name devuser
aws iam create-access-key --user-name devuser
# save the AccessKeyId + SecretAccessKey, then run: aws configure --profile devuser
```

</ExampleBox>

## Attach a policy (managed)

<ExampleBox title="Give read-only S3 access via a managed policy" lang="bash">

```bash
aws iam attach-user-policy \
  --user-name devuser \
  --policy-arn arn:aws:iam::aws:policy/AmazonS3ReadOnlyAccess
```

</ExampleBox>

## Groups

<ExampleBox title="Group-based access" lang="bash">

```bash
aws iam create-group --group-name developers
aws iam attach-group-policy \
  --group-name developers \
  --policy-arn arn:aws:iam::aws:policy/PowerUserAccess
aws iam add-user-to-group --group-name developers --user-name devuser
```

</ExampleBox>

## Roles (for services, not people)

Roles are assumed temporarily — no static secret. EC2 instances assume roles to call other AWS services.

<ExampleBox title="Create a role for EC2 to read S3" lang="bash">

```bash
# trust policy allowing EC2 to assume the role
cat > trust.json <<'EOF'
{ "Version":"2012-10-17",
  "Statement":[{ "Effect":"Allow","Principal":{"Service":"ec2.amazonaws.com"},
  "Action":"sts:AssumeRole" }] }
EOF
aws iam create-role --role-name ec2-s3-reader --assume-role-policy-document file://trust.json
aws iam attach-role-policy --role-name ec2-s3-reader \
  --policy-arn arn:aws:iam::aws:policy/AmazonS3ReadOnlyAccess
```

</ExampleBox>

## A policy document (JSON)

<ExampleBox title="Custom inline policy" lang="json">

```json
{
  "Version": "2012-10-17",
  "Statement": [
    { "Effect": "Allow",
      "Action": ["s3:GetObject"],
      "Resource": "arn:aws:s3:::my-bucket/*" }
  ]
}
```

</ExampleBox>

<ExerciseBox title="Least-privilege user" difficulty="Easy">
Create a user `reader`, attach only `AmazonS3ReadOnlyAccess`, then run `aws s3 ls` as that user (profile) and confirm it works. Try `aws s3 mb s3://new-bucket` and confirm it is **denied**.
</ExerciseBox>

<ExerciseBox title="Service role" difficulty="Medium">
Create a role `lambda-basic` that trusts `lambda.amazonaws.com` and attach `AWSLambdaBasicExecutionRole`. Confirm the trust policy shows the Lambda service principal.
</ExerciseBox>

## Self-Test (Flashcards)

<Quiz storageKey="quiz-aws-2" :cards="[
  { q: 'What is the difference between a user and a role?', a: 'A user has a long-term identity + access key; a role is assumed temporarily with no static secret.' },
  { q: 'What does a policy document contain?', a: 'Effect (Allow/Deny), Action (APIs), Resource (ARNs), and optional Conditions.' },
  { q: 'Why use groups?', a: 'To assign the same permissions to many users at once, by attaching policies to the group.' },
  { q: 'What is the principle of least privilege?', a: 'Grant only the minimum permissions required for a task — nothing extra.' }
]" />

## Resources

<ResourceTable title="Lesson 2 — further reading" :resources="[
  { label: 'IAM User Guide', platform: 'Official', type: 'Docs', url: 'https://docs.aws.amazon.com/IAM/latest/UserGuide/' },
  { label: 'IAM JSON policy reference', platform: 'Official', type: 'Docs', url: 'https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies.html' },
  { label: 'AWS Security best practices', platform: 'Official', type: 'Docs', url: 'https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html' }
]" />

## Checklist

<ProgressChecklist :items="['Created an IAM user', 'Attached a managed policy', 'Created a group + added user', 'Created a service role with a trust policy']" storageKey="aws/2-iam" />

> Draft extra notes in the [Live Editor](/editor) and export them here.
