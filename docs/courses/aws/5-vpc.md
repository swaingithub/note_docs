---
title: 'Lesson 5 — VPC: Networking Foundations'
---

# Lesson 5 — VPC: Networking Foundations

A VPC (Virtual Private Cloud) is your own isolated network in AWS. Understanding it is essential before wiring EC2, RDS, and load balancers together.

## VPC building blocks

- **VPC** — a private IP network (e.g. `10.0.0.0/16`).
- **Subnet** — a segment of the VPC IP range, tied to one AZ.
- **Internet Gateway (IGW)** — lets public subnets reach the internet.
- **Route table** — directs traffic in/out of subnets.
- **NAT gateway** — lets private subnets reach the internet (outbound only).

## Public vs private subnets

| | Public subnet | Private subnet |
|---|---|---|
| Route to IGW | Yes | No |
| Inbound internet | Yes | No |
| Typical workload | Load balancers, bastion | App servers, databases |

## Create a VPC + subnets

<ExampleBox title="One public + one private subnet" lang="bash">

```bash
# VPC
aws ec2 create-vpc --cidr-block 10.0.0.0/16 --query 'Vpc.VpcId'
VPC=vpc-0abc

# Internet gateway
aws ec2 create-internet-gateway --query 'InternetGateway.InternetGatewayId'
aws ec2 attach-internet-gateway --vpc-id $VPC --internet-gateway-id igw-0abc

# Public subnet (us-east-1a)
aws ec2 create-subnet --vpc-id $VPC --cidr-block 10.0.1.0/24 --availability-zone us-east-1a
# Private subnet
aws ec2 create-subnet --vpc-id $VPC --cidr-block 10.0.2.0/24 --availability-zone us-east-1b

# Public route: 0.0.0.0/0 -> IGW
aws ec2 create-route --route-table-id rtb-0pub --destination-cidr-block 0.0.0.0/0 --gateway-id igw-0abc
```

</ExampleBox>

## Why it matters

Putting databases in **private** subnets and only exposing a load balancer in a **public** subnet is the standard secure pattern (used in the capstone, Lesson 10).

<ExerciseBox title="Map a VPC" difficulty="Easy">
Create a VPC with CIDR `10.0.0.0/16`, then create two subnets `10.0.1.0/24` and `10.0.2.0/24`. List them and confirm both belong to the VPC.
</ExerciseBox>

<ExerciseBox title="Public route" difficulty="Medium">
Attach an internet gateway to your VPC and add a route `0.0.0.0/0 -> igw` to a route table, then associate the public subnet with it. Verify with `aws ec2 describe-route-tables`.
</ExerciseBox>

## Self-Test (Flashcards)

<Quiz storageKey="quiz-aws-5" :cards="[
  { q: 'What is a VPC?', a: 'A logically isolated virtual network you define in AWS, with your own IP range.' },
  { q: 'What distinguishes a public subnet?', a: 'It has a route to an internet gateway (0.0.0.0/0 -> igw).' },
  { q: 'What is a NAT gateway for?', a: 'Lets instances in private subnets reach the internet outbound without being reachable inbound.' },
  { q: 'Why put databases in private subnets?', a: 'They are not directly reachable from the internet, reducing attack surface.' }
]" />

## Resources

<ResourceTable title="Lesson 5 — further reading" :resources="[
  { label: 'VPC User Guide', platform: 'Official', type: 'Docs', url: 'https://docs.aws.amazon.com/vpc/latest/userguide/' },
  { label: 'VPC CLI reference', platform: 'Official', type: 'Docs', url: 'https://awscli.amazonaws.com/v2/documentation/api/latest/reference/ec2/index.html' },
  { label: 'VPC with public/private subnets', platform: 'Official', type: 'Docs', url: 'https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Scenario2.html' }
]" />

## Checklist

<ProgressChecklist :items="['Created a VPC + CIDR', 'Created public + private subnets', 'Attached an IGW', 'Added a public route']" storageKey="aws/5-vpc" />

> Draft extra notes in the [Live Editor](/editor) and export them here.
