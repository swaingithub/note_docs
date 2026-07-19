---
title: 'Lesson 1 — Account, CLI & Free Tier'
---

# Lesson 1 — Account, CLI & Free Tier

Before touching any service, you need an AWS account and the CLI configured. This lesson gets you from zero to a working `aws` command.

## Create an account

1. Sign up at https://aws.amazon.com (requires a credit card, but the **free tier** covers most of what we do for 12 months).
2. **Enable MFA** on the root account immediately — it is the single most important security step.
3. Create an **IAM user** for daily use (never use root for real work). We do this in Lesson 2.

## Install the AWS CLI

<ExampleBox title="Install AWS CLI v2" lang="bash">

```bash
# macOS
brew install awscli
# Linux
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip && sudo ./aws/install
# Verify
aws --version
```

</ExampleBox>

## Configure the CLI

`aws configure` stores credentials in `~/.aws/credentials`. Use an IAM access key (created in Lesson 2), not root.

<ExampleBox title="Configure" lang="bash">

```bash
aws configure
# AWS Access Key ID: AKIA...
# AWS Secret Access Key: ****
# Default region name: us-east-1
# Default output format: json
```

</ExampleBox>

## Test it

<ExampleBox title="Your first AWS call" lang="bash">

```bash
aws sts get-caller-identity
# {
#   "UserId": "AIDA...",
#   "Account": "123456789012",
#   "Arn": "arn:aws:iam::123456789012:user/yourname"
# }
```

</ExampleBox>

`sts get-caller-identity` prints who you are authenticated as — your first sanity check for any setup problem.

## The free tier (what's free)

| Service | Free tier |
|---------|-----------|
| EC2 | 750 hrs/month of `t2.micro`/`t3.micro` (12 mo) |
| S3 | 5 GB storage, 20k GET, 2k PUT (12 mo) |
| RDS | 750 hrs of `db.t2.micro` (12 mo) |
| Lambda | 1M requests + 400k GB-seconds/month (always) |
| CloudWatch | 10 metrics, 5 GB logs (always) |

<ExerciseBox title="Verify your CLI" difficulty="Easy">
Install the AWS CLI, run `aws --version`, and confirm `aws sts get-caller-identity` returns your Account ID. Note the ARN it shows.
</ExerciseBox>

<ExerciseBox title="Region awareness" difficulty="Medium">
Run `aws configure get region` to see your default region. Then run `aws sts get-caller-identity` with `--region eu-west-1` and confirm the account is the same (identity is global, region only routes the call).
</ExerciseBox>

## Self-Test (Flashcards)

<Quiz storageKey="quiz-aws-1" :cards="[
  { q: 'Why should you avoid using the root account for daily work?', a: 'Root has unrestricted access to everything; a leaked root key is catastrophic. Use a scoped IAM user instead.' },
  { q: 'What does <code>aws sts get-caller-identity</code> return?', a: 'The UserId, Account ID, and ARN of the currently authenticated principal.' },
  { q: 'Where does <code>aws configure</code> store credentials?', a: 'In ~/.aws/credentials (and settings in ~/.aws/config).' },
  { q: 'What is the AWS free tier?', a: 'A 12-month (and some always-free) allowance of usage for services like EC2, S3, and RDS so you can learn without cost.' }
]" />

## Resources

<ResourceTable title="Lesson 1 — further reading" :resources="[
  { label: 'AWS CLI v2 install', platform: 'Official', type: 'Docs', url: 'https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html' },
  { label: 'AWS Free Tier', platform: 'Official', type: 'Docs', url: 'https://aws.amazon.com/free/' },
  { label: 'AWS CLI reference', platform: 'Official', type: 'Docs', url: 'https://awscli.amazonaws.com/v2/documentation/api/latest/reference/index.html' }
]" />

## Checklist

<ProgressChecklist :items="['Created AWS account + MFA on root', 'Installed AWS CLI v2', 'Ran aws configure', 'Verified with sts get-caller-identity']" storageKey="aws/1-account-cli" />

> Draft extra notes in the [Live Editor](/editor) and export them here.
