---
title: 'Lesson 8 — Load Balancers & Auto Scaling'
---

# Lesson 8 — Load Balancers & Auto Scaling

A single EC2 instance is a single point of failure. **Auto Scaling Groups (ASG)** keep a healthy count of instances; **Elastic Load Balancing (ELB)** spreads traffic across them.

## Elastic Load Balancer types

| Type | Use |
|------|-----|
| ALB (Application) | HTTP/HTTPS, route by path/host |
| NLB (Network) | TCP/UDP, ultra-low latency |
| CLB | legacy |

We use **ALB** for web traffic.

## Launch template + ASG

<ExampleBox title="Launch template" lang="bash">

```bash
aws ec2 create-launch-template \
  --launch-template-name web-lt \
  --launch-template-data '{"ImageId":"ami-0c7217cdde317cfec","InstanceType":"t3.micro","KeyName":"mykey","SecurityGroupIds":["sg-0web"]}'
```

</ExampleBox>

<ExampleBox title="Auto Scaling Group" lang="bash">

```bash
aws autoscaling create-auto-scaling-group \
  --auto-scaling-group-name web-asg \
  --launch-template LaunchTemplateName=web-lt \
  --min-size 2 --max-size 4 --desired-capacity 2 \
  --vpc-zone-identifier "subnet-0a,subnet-0b"
```

</ExampleBox>

## Target group + ALB

<ExampleBox title="ALB wiring" lang="bash">

```bash
aws elbv2 create-target-group --name web-tg \
  --protocol HTTP --port 80 --vpc-id vpc-0abc --target-type instance
aws elbv2 create-load-balancer --name web-alb \
  --subnets subnet-0a subnet-0b --security-groups sg-0web
aws elbv2 create-listener --load-balancer-arn <alb-arn> \
  --protocol HTTP --port 80 \
  --default-actions Type=forward,TargetGroupArn=<tg-arn>
```

</ExampleBox>

## Scaling policy

<ExampleBox title="Scale on CPU" lang="bash">

```bash
aws autoscaling put-scaling-policy --auto-scaling-group-name web-asg \
  --policy-name cpu40 --policy-type TargetTrackingScaling \
  --target-tracking-configuration '{"PredefinedMetricSpecification":{"PredefinedMetricType":"ASGAverageCPUUtilization"},"TargetValue":40}'
```

</ExampleBox>

<ExerciseBox title="ASG lifecycle" difficulty="Easy">
Create a launch template + ASG with `desired-capacity 2`. Confirm two instances launch via `aws ec2 describe-instances`. Then set `desired-capacity 0` and clean up.
</ExerciseBox>

<ExerciseBox title="ALB end-to-end" difficulty="Medium">
Create a target group, an ALB in public subnets, and a listener forwarding to the target group. Confirm the ALB has a DNS name you could hit in a browser.
</ExerciseBox>

## Self-Test (Flashcards)

<Quiz storageKey="quiz-aws-8" :cards="[
  { q: 'What problem does an ASG solve?', a: 'It keeps a desired count of healthy instances and replaces failed ones automatically.' },
  { q: 'ALB vs NLB?', a: 'ALB is HTTP/HTTPS with content routing; NLB is TCP/UDP with very low latency.' },
  { q: 'What is a target group?', a: 'A set of targets (instances) the load balancer routes traffic to.' },
  { q: 'What does a target-tracking scaling policy do?', a: 'Adjusts capacity to keep a metric (e.g. CPU) at a set target value.' }
]" />

## Resources

<ResourceTable title="Lesson 8 — further reading" :resources="[
  { label: 'EC2 Auto Scaling', platform: 'Official', type: 'Docs', url: 'https://docs.aws.amazon.com/autoscaling/ec2/userguide/' },
  { label: 'Elastic Load Balancing', platform: 'Official', type: 'Docs', url: 'https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/' }
]" />

## Checklist

<ProgressChecklist :items="['Created launch template', 'Created ASG (min/max/desired)', 'Created target group + ALB', 'Added a scaling policy']" storageKey="aws/8-elb-asg" />

> Draft extra notes in the [Live Editor](/editor) and export them here.
