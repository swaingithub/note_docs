---
title: Transformers
---

# Deep Learning: Transformers

Transformers replaced recurrence with **self-attention**, letting models weigh every token against every other token in parallel. This architecture powers modern LLMs (GPT, BERT). MIT 6.S191 covers the foundations clearly.

<ExampleBox title="Scaled dot-product attention" lang="python">

```python
import torch
import torch.nn.functional as F

def attention(q, k, v):
    # q, k, v: (batch, seq_len, dim)
    scores = q @ k.transpose(-2, -1) / (q.size(-1) ** 0.5)
    weights = F.softmax(scores, dim=-1)
    return weights @ v

q = k = v = torch.randn(1, 5, 16)
out = attention(q, k, v)
print(out.shape)  # (1, 5, 16)
```
</ExampleBox>

Key points:
- **Self-attention** computes relevance between all token pairs via dot products.
- Scaling by `sqrt(d)` keeps gradients stable.
- Encoders (BERT) read all tokens; decoders (GPT) attend only to past tokens.
- Transformers train in parallel, scaling far better than RNNs.
- Positional encodings inject order, since attention is permutation-agnostic.

<ExerciseBox title="Compute attention by hand" difficulty="Medium">

With a 2-token query/key/value set, compute the attention weights and output manually, then verify with the code above.

</ExerciseBox>

<ExerciseBox title="Fine-tune a classifier" difficulty="Hard">

Use Hugging Face `transformers` to fine-tune a small pretrained model (e.g. DistilBERT) on a text-classification dataset and report test accuracy.

</ExerciseBox>

## Checklist

<ProgressChecklist :items="['Explained self-attention', 'Trained a classifier with PyTorch']" storageKey="machine-learning/4-transformers" />

> Note your learnings in the [Live Editor](/editor) and export them here.

## Self-Test (Flashcards)

<Quiz storageKey="quiz-4-transformers" :cards="[
{ q: 'What replaced recurrence in Transformers?', a: '<b>Self-attention</b> over all token pairs.' }, { q: 'Why scale dot products by sqrt(d)?', a: 'To keep gradients stable during training.' }, { q: 'What do encoders like BERT do?', a: 'Read all tokens at once (bidirectional).' }, { q: 'Why use positional encodings?', a: 'Attention is permutation-agnostic, so order must be injected.' }
]" />

## Resources

<ResourceTable title="Transformers Resources" :resources="[
  { label: 'The Annotated Transformer', platform: 'GitHub', type: 'Docs', url: 'https://nlp.seas.harvard.edu/annotated-transformer/' },
  { label: 'Hugging Face Course', platform: 'Official', type: 'Tutorial', url: 'https://huggingface.co/course' },
  { label: 'MIT 6.S191', platform: 'Official', type: 'Video', url: 'https://introtodeeplearning.com/' },
  { label: 'Attention Is All You Need', platform: 'Official', type: 'Book', url: 'https://arxiv.org/abs/1706.03762' },
  { label: 'Transformers Explained', platform: 'YouTube', type: 'Video', url: 'https://www.youtube.com/watch?v=iDulhoQ2pro' }
]" />
