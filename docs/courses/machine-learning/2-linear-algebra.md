---
title: Linear Algebra
---

# Math for ML: Linear Algebra

Linear algebra is the arithmetic of ML: data is represented as vectors and matrices, and models are trained through matrix operations. Understanding dot products, matrix multiplication, and transformations explains how neural networks compute.

<ExampleBox title="Vectors and matrices with NumPy" lang="python">

```python
import numpy as np

A = np.array([[1, 2], [3, 4]])
x = np.array([5, 6])

print(A @ x)        # matrix-vector product: [17, 39]
print(A @ A)        # matrix product
print(A.T)          # transpose
print(np.dot(A[0], A[1]))  # dot product of two rows: 11
```
</ExampleBox>

Key points:
- A **vector** is a 1-D array; a **matrix** is 2-D. Data rows are usually samples.
- `@` is matrix multiplication; `np.dot` computes inner (dot) products.
- The **transpose** flips rows and columns (`A.T`).
- Dot products measure similarity/direction between vectors.
- Most ML frameworks (NumPy, PyTorch, TensorFlow) are built on these ops.

<ExerciseBox title="Vector math" difficulty="Easy">

Compute the dot product and Euclidean norm of two vectors using NumPy. Verify the norm equals `sqrt(dot(v, v))`.

</ExerciseBox>

<ExerciseBox title="Transform data" difficulty="Medium">

Given a 3x2 feature matrix and a 2x2 weight matrix, compute the linear transformation `X @ W` and interpret each output column as a learned feature.

</ExerciseBox>

## Checklist

<ProgressChecklist :items="['Implemented matrix multiply', 'Understood dot product']" storageKey="machine-learning/2-linear-algebra" />

> Note your learnings in the [Live Editor](/editor) and export them here.

## Self-Test (Flashcards)

<Quiz storageKey="quiz-2-linear-algebra" :cards="[
{ q: 'What is matrix multiplication in NumPy?', a: 'The <code>@</code> operator, e.g. <code>A @ x</code>.' }, { q: 'What does <code>A.T</code> return?', a: 'The transpose, flipping rows and columns.' }, { q: 'What does np.dot compute?', a: 'The inner (dot) product of two vectors/rows.' }, { q: 'How is data usually shaped?', a: 'Rows are samples; columns are features.' }
]" />

## Resources

<ResourceTable title="Linear Algebra Resources" :resources="[
  { label: 'NumPy Documentation', platform: 'Official', type: 'Docs', url: 'https://numpy.org/doc/' },
  { label: 'Linear Algebra (3Blue1Brown)', platform: 'YouTube', type: 'Video', url: 'https://www.youtube.com/watch?v=fNk_zzaMoSs' },
  { label: 'MIT 18.06', platform: 'Official', type: 'Video', url: 'https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/' },
  { label: 'Linear Algebra in Python', platform: 'Programiz', type: 'Tutorial', url: 'https://www.programiz.com/python-programming/numpy' }
]" />
