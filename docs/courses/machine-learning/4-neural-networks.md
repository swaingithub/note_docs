---
title: Neural Networks
---

# Deep Learning: Neural Networks

A neural network stacks layers of neurons that apply a weighted sum followed by a nonlinear activation. Training uses **backpropagation** to compute gradients and **gradient descent** to update weights, minimizing a loss function. Frameworks like PyTorch make this declarative.

<ExampleBox title="A tiny neural net in PyTorch" lang="python">

```python
import torch
import torch.nn as nn

model = nn.Sequential(
    nn.Linear(4, 8),
    nn.ReLU(),
    nn.Linear(8, 3),
)
loss_fn = nn.CrossEntropyLoss()
opt = torch.optim.SGD(model.parameters(), lr=0.01)

x = torch.randn(16, 4)
y = torch.randint(0, 3, (16,))
opt.zero_grad()
loss = loss_fn(model(x), y)
loss.backward()
opt.step()
print(loss.item())
```
</ExampleBox>

Key points:
- Each layer computes `activation(W @ x + b)`; ReLU adds nonlinearity.
- **Backpropagation** propagates the loss gradient back through layers.
- An **optimizer** (SGD, Adam) updates weights using those gradients.
- Deeper networks learn hierarchical features but need more data and care.
- Watch for overfitting — use validation splits and regularization.

<ExerciseBox title="Train a classifier" difficulty="Medium">

Build a 2-hidden-layer network with PyTorch and train it on a small dataset (e.g. iris or a toy tensor). Track train loss over epochs and plot it.

</ExerciseBox>

<ExerciseBox title="Understand backprop" difficulty="Hard">

On paper, derive the gradient of MSE loss with respect to a single weight in a 1-neuron network. Then verify with `loss.backward()` and the printed `.grad`.

</ExerciseBox>

## Checklist

<ProgressChecklist :items="['Built a simple net', 'Understood backprop']" storageKey="machine-learning/4-neural-networks" />

> Note your learnings in the [Live Editor](/editor) and export them here.

## Self-Test (Flashcards)

<Quiz storageKey="quiz-4-neural-networks" :cards="[
{ q: 'What does each layer compute?', a: '<code>activation(W @ x + b)</code>; ReLU adds nonlinearity.' }, { q: 'What computes gradients in training?', a: '<b>Backpropagation</b> propagates the loss gradient.' }, { q: 'What updates the weights?', a: 'An optimizer like SGD or Adam.' }, { q: 'What prevents overfitting?', a: 'Validation splits and regularization.' }
]" />

## Resources

<ResourceTable title="Neural Networks Resources" :resources="[
  { label: 'PyTorch Tutorials', platform: 'Official', type: 'Docs', url: 'https://pytorch.org/tutorials/' },
  { label: 'fast.ai', platform: 'Official', type: 'Tutorial', url: 'https://www.fast.ai/' },
  { label: 'Neural Networks (3Blue1Brown)', platform: 'YouTube', type: 'Video', url: 'https://www.youtube.com/watch?v=aircAruvnKk' },
  { label: 'Deep Learning Book', platform: 'GitHub', type: 'Book', url: 'https://github.com/janishar/mit-deep-learning-book-pdf' }
]" />
