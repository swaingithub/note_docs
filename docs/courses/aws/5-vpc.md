---
title: 'Lesson 5 — VPC: Networking (SAA)'
---

# Lesson 5 — VPC: Networking

> **Module 2 · Core Compute & Storage · Lesson 5 of 10** &nbsp;•&nbsp; **SAA-C03 Domain 1 & 3:** Secure networking, content delivery
> 📌 *Authoritative source:* [VPC User Guide](https://docs.aws.amazon.com/vpc/latest/userguide/) — verified against AWS docs.

The VPC is the network fabric every other service runs in. SAA tests **subnet types, routing, NACL vs SG, and connectivity patterns (peering, endpoints, VPN/Direct Connect)** heavily.

## 1. VPC components

- **VPC** — your isolated network, CIDR e.g. `10.0.0.0/16` (up to `/16`).
- **Subnet** — CIDR slice, **in one AZ** (AZ = failure isolation).
- **Route table** — controls traffic; every subnet has one (explicit or main).
- **IGW** — horizontally scaled, redundant; gives a VPC internet access.
- **NAT gateway** — lets private subnets egress to internet (stateful, one per AZ).
- **NACL** — stateless subnet-level firewall. **SG** — stateful instance-level.

## 2. Public vs private vs isolated subnets

| Subnet type | Route to IGW | Inbound internet | Typical |
|-------------|--------------|------------------|---------|
| Public | 0.0.0.0/0 → IGW | Yes | ALB, bastion |
| Private | only → NAT | No | App servers, RDS |
| Isolated | none | No | internal-only, egress via proxy |

> "Public" is a **property of the route table**, not the subnet itself.

## 3. NACL vs Security Group (frequent SAA pair)

| | NACL | Security Group |
|---|------|----------------|
| Stateful? | **No** (must allow both directions) | **Yes** |
| Scope | Subnet | ENI/instance |
| Default | default NACL allows all; custom denies all | denies all inbound, allows all outbound |
| Rule order | **ordered by rule number (lowest first)** | all rules evaluated, Deny wins |

## 4. Build a VPC with public + private subnets

<ExampleBox title="VPC + 2 subnets + IGW + NAT" lang="bash">

```bash
VPC=$(aws ec2 create-vpc --cidr-block 10.0.0.0/16 --query 'Vpc.VpcId' --output text)
IGW=$(aws ec2 create-internet-gateway --query 'InternetGateway.InternetGatewayId' --output text)
aws ec2 attach-internet-gateway --vpc-id $VPC --internet-gateway-id $IGW
PUB=$(aws ec2 create-subnet --vpc-id $VPC --cidr-block 10.0.1.0/24 --availability-zone us-east-1a --query 'Subnet.SubnetId' --output text)
PRIV=$(aws ec2 create-subnet --vpc-id $VPC --cidr-block 10.0.2.0/24 --availability-zone us-east-1b --query 'Subnet.SubnetId' --output text)
# public route
RT=$(aws ec2 create-route-table --vpc-id $VPC --query 'RouteTable.RouteTableId' --output text)
aws ec2 create-route --route-table-id $RT --destination-cidr-block 0.0.0.0/0 --gateway-id $IGW
aws ec2 associate-route-table --route-table-id $RT --subnet-id $PUB
aws ec2 modify-subnet-attribute --subnet-id $PUB --map-public-ip-on-launch
# NAT for private egress
EIP=$(aws ec2 allocate-address --query 'AllocationId' --output text)
NAT=$(aws ec2 create-nat-gateway --subnet-id $PUB --allocation-id $EIP --query 'NatGateway.NatGatewayId' --output text)
```

</ExampleBox>

## 5. Connecting VPCs & on-prem

- **VPC Peering** — private connectivity between two VPCs (same/different accounts/regions); **not transitive**.
- **Transit Gateway** — hub-and-spoke for many VPCs + on-prem.
- **VPN (IPsec)** — on-prem over internet; **Direct Connect** — dedicated fiber, low latency, consistent.
- **VPC endpoints** — Gateway (S3/DynamoDB) and Interface (private link to services) keep traffic off the internet.

## 6. Exercises

<ExerciseBox title="Map a VPC" difficulty="Easy">
Create a VPC `10.0.0.0/16`, two subnets `10.0.1.0/24` + `10.0.2.0/24`, confirm both share the VPC.
</ExerciseBox>

<ExerciseBox title="Public route + NACL" difficulty="Medium">
Attach an IGW, add `0.0.0.0/0 → igw` to a route table, associate the public subnet, enable `map-public-ip-on-launch`, then add a NACL rule allowing 80/443 inbound and **1024–65535** inbound for return ephemeral ports (stateless!).
</ExerciseBox>

## 7. Self-Test (Flashcards)

<Quiz storageKey="quiz-aws-5" :cards="[
  { q: 'NACL vs SG?', a: 'NACL is stateless + per-subnet + ordered; SG is stateful + per-instance + deny-wins.' },
  { q: 'What makes a subnet public?', a: 'A route to an Internet Gateway (0.0.0.0/0 → igw) in its route table.' },
  { q: 'Is VPC peering transitive?', a: 'No — A↔B and B↔C does not imply A↔C.' },
  { q: 'NAT gateway purpose?', a: 'Private subnets egress to internet outbound-only, without inbound reachability.' },
  { q: 'VPN vs Direct Connect?', a: 'VPN = encrypted over internet; DX = dedicated private fiber, consistent low latency.' }
]" />

## 8. SAA Practice Questions

<Quiz storageKey="quiz-aws-5-exam" :cards="[
  { q: 'Two VPCs peered, a third peered to one. Can the third reach the first?', a: 'No — peering is non-transitive; you need a direct peering or Transit Gateway.' },
  { q: 'Instances in a private subnet can’t download patches. Fix?', a: 'Add a NAT gateway in a public subnet + a route 0.0.0.0/0 → nat in the private RT.' },
  { q: 'You need a stateful, instance-level firewall. Use?', a: 'Security Group (NACL is stateless + subnet-level).' },
  { q: 'Connect 15 VPCs + on-prem with least management overhead?', a: 'Transit Gateway (hub-and-spoke) rather than 100+ peerings.' }
]" />

## 9. Resources (authoritative)

<ResourceTable title="Lesson 5 — official references" :resources="[
  { label: 'VPC User Guide', platform: 'Official', type: 'Docs', url: 'https://docs.aws.amazon.com/vpc/latest/userguide/' },
  { label: 'Subnets & routing', platform: 'Official', type: 'Docs', url: 'https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Subnets.html' },
  { label: 'NACLs', platform: 'Official', type: 'Docs', url: 'https://docs.aws.amazon.com/vpc/latest/userguide/vpc-network-acls.html' },
  { label: 'VPC peering', platform: 'Official', type: 'Docs', url: 'https://docs.aws.amazon.com/vpc/latest/peering/' },
  { label: 'Transit Gateway', platform: 'Official', type: 'Docs', url: 'https://docs.aws.amazon.com/vpc/latest/tgw/' }
]" />

## 10. Checklist

<ProgressChecklist :items="['Created VPC + subnets', 'Attached IGW + NAT', 'Public vs private route tables', 'Explained NACL vs SG', 'Know peering/endpoints']" storageKey="aws/5-vpc" />

> Draft extra notes in the [Live Editor](/editor) and export them here.
