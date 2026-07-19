---
title: 'Lesson 6 — RDS: Managed Databases'
---

# Lesson 6 — RDS: Managed Databases

RDS (Relational Database Service) runs managed databases (PostgreSQL, MySQL, MariaDB, SQL Server, Oracle) so you don't patch or back up the OS yourself.

## Why RDS

- Automated backups + point-in-time recovery
- Multi-AZ failover for high availability
- Read replicas for scale
- You manage the schema; AWS manages the engine

## Create a PostgreSQL instance

<ExampleBox title="Launch RDS (free-tier)" lang="bash">

```bash
aws rds create-db-instance \
  --db-instance-identifier mydb \
  --db-instance-class db.t3.micro \
  --engine postgres \
  --master-username admin \
  --master-user-password 'ChangeMe123!' \
  --allocated-storage 20 \
  --backup-retention-period 7 \
  --publicly-accessible false
```

</ExampleBox>

> Never use `--publicly-accessible true` for real data. Place RDS in **private** subnets.

## Connect (from an EC2 in the VPC)

<ExampleBox title="psql from inside the VPC" lang="bash">

```bash
psql -h mydb.123456.us-east-1.rds.amazonaws.com -U admin -d postgres
```

</ExampleBox>

## Backups & snapshots

<ExampleBox title="Snapshot" lang="bash">

```bash
aws rds create-db-snapshot --db-instance-identifier mydb \
  --db-snapshot-identifier mydb-snap-1
```

</ExampleBox>

## Clean up

<ExampleBox title="Delete (no final snapshot for lab)" lang="bash">

```bash
aws rds delete-db-instance --db-instance-identifier mydb --skip-final-snapshot
```

</ExampleBox>

<ExerciseBox title="Launch + inspect" difficulty="Easy">
Create a `db.t3.micro` MySQL instance, wait for status `available` via `aws rds describe-db-instances`, then delete it with `--skip-final-snapshot`.
</ExerciseBox>

<ExerciseBox title="Private placement" difficulty="Medium">
Create the DB in your private subnets from Lesson 5 (pass `--db-subnet-group-name`) with `--publicly-accessible false`, and confirm the endpoint is only reachable from inside the VPC.
</ExerciseBox>

## Self-Test (Flashcards)

<Quiz storageKey="quiz-aws-6" :cards="[
  { q: 'What does RDS manage for you?', a: 'The DB engine, OS patching, backups, and (optionally) Multi-AZ failover.' },
  { q: 'What is a read replica?', a: 'A read-only copy of your DB used to scale read traffic and offload the primary.' },
  { q: 'Why keep RDS in private subnets?', a: 'To avoid exposing the database directly to the internet; only app servers in the VPC reach it.' },
  { q: 'What is point-in-time recovery?', a: 'Restoring the DB to any second within the backup retention window using automated backups.' }
]" />

## Resources

<ResourceTable title="Lesson 6 — further reading" :resources="[
  { label: 'RDS User Guide', platform: 'Official', type: 'Docs', url: 'https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/' },
  { label: 'RDS CLI reference', platform: 'Official', type: 'Docs', url: 'https://awscli.amazonaws.com/v2/documentation/api/latest/reference/rds/index.html' }
]" />

## Checklist

<ProgressChecklist :items="['Created an RDS instance', 'Confirmed available status', 'Took a snapshot', 'Deleted cleanly']" storageKey="aws/6-rds" />

> Draft extra notes in the [Live Editor](/editor) and export them here.
