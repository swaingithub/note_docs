---
title: 'Lesson 6 — RDS & Aurora: Databases (SAA)'
---

# Lesson 6 — RDS & Aurora: Databases

> **Module 3 · Managed Services · Lesson 6 of 10** &nbsp;•&nbsp; **SAA-C03 Domain 1 & 2:** Resilient, high-performance storage
> 📌 *Authoritative source:* [RDS User Guide](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/) · [Aurora User Guide](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/) — verified against AWS docs.

RDS is managed relational DB; **Aurora** is AWS's cloud-native engine. SAA loves **Multi-AZ, Read Replicas, backups/PITR, and Aurora architecture**.

## 1. Engines

RDS supports **PostgreSQL, MySQL, MariaDB, SQL Server, Oracle, Db2**. Each runs in a managed instance; you handle schema/queries, AWS handles patching, backups, failover.

## 2. High availability: Multi-AZ

- **Multi-AZ (standby)** — a synchronous standby in a *different AZ*. On failure, AWS fails over (same endpoint). **No reads** from standby; it's for HA only.
- **Multi-AZ Cluster** (for MySQL/PostgreSQL/Aurora) — 3 copies, one writer + 2 readers, <1s failover.

> 🧠 **Exam tip:** "HA, automatic failover, no extra cost for reads" → **Multi-AZ standby**. "Read scaling + DR in another region" → **Read Replica** (async, can be cross-region).

## 3. Read Replicas (scaling + DR)

- **Async** replication; up to 5 per source (15 for MySQL/Aurora).
- Used for **read scaling** and can be **promoted** to a standalone DB (DR).
- Can be **cross-region** (for DR) and **cross-engine** (MySQL→Aurora).
- Replicas have their own endpoint; apps point reads at them.

## 4. Backups & recovery

- **Automated backups**: daily snapshot + transaction logs → **Point-in-Time Recovery (PITR)** within retention (1–35 days).
- **Manual DB snapshots**: persist until deleted; can copy across regions.
- Restoring creates a **new** DB instance (the original is untouched).

## 5. Aurora (exam highlight)

- **Aurora** separates compute from a **distributed, self-healing 6-copy storage** (3 AZs, 10 GB auto-grow).
- **15 copies** of durability logic; **11 nines**; 1/10 the cost of commercial DBs at 1/3 the latency of standard MySQL/PostgreSQL.
- **Aurora Serverless v2**: instant scale compute 0.5–128 ACU.
- **Aurora Global Database**: cross-region replication <1s for DR.
- **Aurora Replicas** share the same storage (low lag) vs RDS Read Replicas (network copy).

## 6. Encryption

- Encryption at rest via **KMS**; for MySQL/PostgreSQL/MaríaDB also in transit (TLS).
- **Cannot** encrypt an existing unencrypted RDS instance in place — snapshot → copy encrypted → restore.
- Replicas must match source encryption state.

## 7. Create (CLI)

<ExampleBox title="RDS PostgreSQL Multi-AZ" lang="bash">

```bash
aws rds create-db-instance \
  --db-instance-identifier mydb \
  --db-instance-class db.t3.micro \
  --engine postgres --master-username admin \
  --master-user-password 'ChangeMe123!' \
  --allocated-storage 20 \
  --multi-az \
  --backup-retention-period 7 \
  --storage-encrypted \
  --db-subnet-group-name private-db-subnet-group
```

</ExampleBox>

## 8. Exercises

<ExerciseBox title="Launch + PITR" difficulty="Easy">
Create a `db.t3.micro` MySQL with 7-day backup retention, wait for `available`, then `aws rds restore-db-instance-to-point-in-time` to a new instance at a past time (lab only). Delete after.
</ExerciseBox>

<ExerciseBox title="Read replica" difficulty="Medium">
Create a source instance, add a read replica, promote it, and confirm it becomes a standalone writable DB with its own endpoint.
</ExerciseBox>

## 9. Self-Test (Flashcards)

<Quiz storageKey="quiz-aws-6" :cards="[
  { q: 'Multi-AZ vs Read Replica?', a: 'Multi-AZ = sync standby for HA (no read); Read Replica = async for read scaling + DR.' },
  { q: 'Can you encrypt an existing RDS instance in place?', a: 'No — snapshot, copy encrypted, restore to a new instance.' },
  { q: 'What is Aurora storage?', a: '6-way replicated across 3 AZs, self-healing, auto-grows 10 GB.' },
  { q: 'What does a restore create?', a: 'A new DB instance; the original remains unchanged.' },
  { q: 'Aurora Serverless v2?', a: 'Compute auto-scales 0.5–128 ACU on demand.' }
]" />

## 10. SAA Practice Questions

<Quiz storageKey="quiz-aws-6-exam" :cards="[
  { q: 'Need automatic failover in <1s across 3 copies for a MySQL DB. Best?', a: 'Aurora Multi-AZ cluster (or Aurora) — RDS Multi-AZ standby alone is slower failover.' },
  { q: 'Read traffic spikes; want to offload the primary without DR. Solution?', a: 'Read Replica (async, scales reads); Multi-AZ standby does not serve reads.' },
  { q: 'DB must survive an AZ failure AND be restorable to 5 min ago. Needs?', a: 'Multi-AZ (AZ failure) + automated backups/PITR (5-min RPO).' },
  { q: 'Cross-region DR with <1s replica lag for Aurora. Use?', a: 'Aurora Global Database (cross-region, typical <1s).' }
]" />

## 11. Resources (authoritative)

<ResourceTable title="Lesson 6 — official references" :resources="[
  { label: 'RDS User Guide', platform: 'Official', type: 'Docs', url: 'https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/' },
  { label: 'RDS Multi-AZ', platform: 'Official', type: 'Docs', url: 'https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.MultiAZ.html' },
  { label: 'RDS Read Replicas', platform: 'Official', type: 'Docs', url: 'https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ReadRepl.html' },
  { label: 'Aurora User Guide', platform: 'Official', type: 'Docs', url: 'https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/' },
  { label: 'Aurora Global Database', platform: 'Official', type: 'Docs', url: 'https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-global-database.html' }
]" />

## 12. Checklist

<ProgressChecklist :items="['Explained Multi-AZ vs replicas', 'Created RDS (encrypted, private)', 'Took + restored snapshot', 'Understand Aurora architecture', 'Deleted cleanly']" storageKey="aws/6-rds" />

> Draft extra notes in the [Live Editor](/editor) and export them here.
