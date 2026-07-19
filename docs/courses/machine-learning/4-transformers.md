---
title: Transformers
---

# Deep Learning: Transformers

Transformers replaced recurrence with **self-attention**, letting models weigh every token against every other token in parallel. This architecture powers modern language, vision, audio, and multimodal models.

## What You Will Learn

- Why attention lets models connect information across long sequences.
- How queries, keys, values, masks, and positional information work together.
- Why encoder-only, decoder-only, and encoder-decoder Transformers behave differently.
- What bottlenecks matter in real systems: context length, memory, latency, data quality, and evaluation.

## Prerequisites

- Matrix multiplication and softmax.
- Basic neural networks and gradient descent.
- Python tensor shapes: batch, sequence length, and hidden dimension.

## Mental Model

A Transformer turns each token into a vector, then repeatedly asks: **which other tokens should this token pay attention to, and how much?** Queries ask the question, keys advertise what each token contains, and values carry the information to mix into the next representation.

Think of attention as content-addressed routing. Instead of reading only the previous hidden state like an RNN, each position can directly route information from relevant positions.

## Deep Mechanics

For one attention head:

1. Input embeddings are projected into `Q`, `K`, and `V`.
2. `QK^T` produces pairwise compatibility scores.
3. Scores are scaled by `sqrt(d_k)` to keep softmax numerically stable.
4. A mask may block future tokens or padding tokens.
5. Softmax turns scores into weights.
6. Weighted values are summed to produce contextualized token representations.

Multi-head attention repeats this with several learned projections so different heads can specialize: syntax, coreference, local patterns, long-range dependencies, or task-specific features. Feed-forward layers then transform each position independently, while residual connections and normalization keep optimization stable.

<ExampleBox title="Scaled dot-product attention" lang="python">

```python
import torch
import torch.nn.functional as F

def attention(q, k, v, mask=None):
    # q, k, v: (batch, seq_len, dim)
    scores = q @ k.transpose(-2, -1) / (q.size(-1) ** 0.5)
    if mask is not None:
        scores = scores.masked_fill(mask == 0, float("-inf"))
    weights = F.softmax(scores, dim=-1)
    return weights @ v, weights

q = k = v = torch.randn(1, 5, 16)
out, weights = attention(q, k, v)
print(out.shape)      # (1, 5, 16)
print(weights.shape)  # (1, 5, 5)
```

</ExampleBox>

Key points:

- **Self-attention** computes relevance between all token pairs via dot products.
- Scaling by `sqrt(d_k)` keeps logits in a range where softmax gradients remain useful.
- Encoders read all tokens; decoders attend only to previous tokens.
- Transformers train in parallel across sequence positions, scaling better than RNNs.
- Positional information injects order because attention alone is permutation-agnostic.

## Encoder, Decoder, and Encoder-Decoder

| Architecture | Attention Pattern | Best For | Examples |
| --- | --- | --- | --- |
| Encoder-only | Bidirectional self-attention | Classification, retrieval, embeddings, token labeling | BERT-style models |
| Decoder-only | Causal self-attention | Text generation, chat, code completion | GPT-style models |
| Encoder-decoder | Encoder reads input, decoder generates output with cross-attention | Translation, summarization, structured generation | T5-style models |

## Masks and Positional Information

Attention alone has no sense of order. The model needs positional information so "dog bites man" differs from "man bites dog." Common approaches include learned positional embeddings, sinusoidal encodings, rotary position embeddings, and relative position biases.

Masks define what information a token is allowed to see:

- **Padding mask** prevents attention to fake padding tokens.
- **Causal mask** prevents a decoder from looking at future tokens during training.
- **Attention bias** can encourage or restrict attention patterns for specialized architectures.

<ExampleBox title="Causal mask" lang="python">

```python
import torch

seq_len = 6
mask = torch.tril(torch.ones(seq_len, seq_len))
print(mask)
```

</ExampleBox>

## Production Notes

| Concern | Expert Notes |
| --- | --- |
| Memory | Vanilla attention is `O(n^2)` in sequence length, so long contexts are expensive. |
| Latency | Autoregressive generation is sequential; KV caching avoids recomputing previous keys and values. |
| Data | Model quality depends heavily on dataset quality, deduplication, labeling, and evaluation design. |
| Evaluation | Accuracy alone is weak; use task metrics, calibration checks, robustness tests, and human review where needed. |
| Safety | Watch for hallucination, prompt injection, data leakage, biased outputs, and unsafe tool use. |
| Fine-tuning | Fine-tune when behavior must change consistently; use retrieval when the model mainly needs external knowledge. |

## Failure Modes

| Symptom | Likely Cause | Fix |
| --- | --- | --- |
| Model memorizes training set | Dataset too small or training too long | Add validation, regularization, early stopping, and more data |
| Generation repeats itself | Decoding settings or model distribution collapse | Tune temperature/top-p, repetition penalty, prompts, or fine-tuning data |
| Bad long-context answers | Relevant tokens are too far away or retrieval is noisy | Chunk better, rerank, summarize, or use a better context strategy |
| Fine-tuned model gets worse | Catastrophic forgetting or poor labels | Lower learning rate, mix general data, improve labels, evaluate per capability |
| High inference cost | Large model, long prompts, no caching | Use smaller model, trim context, cache, batch, quantize, or distill |

## Decision Guide

- Use **encoder-only** models when you need robust representations, ranking, classification, or embeddings.
- Use **decoder-only** models when you need open-ended generation, reasoning-style prompting, or chat interfaces.
- Use **encoder-decoder** models when the task is clearly sequence-to-sequence and controlled output matters.
- Prefer **RAG** over fine-tuning when the problem is missing knowledge rather than missing behavior.
- Prefer **fine-tuning** when examples define a repeated style, format, classification boundary, or domain behavior.

## Exercises

<ExerciseBox title="Compute attention by hand" difficulty="Medium">
With a 2-token query/key/value set, compute the attention weights and output manually, then verify with the code above.
</ExerciseBox>

<ExerciseBox title="Fine-tune a classifier" difficulty="Hard">
Use Hugging Face `transformers` to fine-tune a small pretrained model, such as DistilBERT, on a text-classification dataset and report validation accuracy, test accuracy, confusion matrix, and one failure analysis.
</ExerciseBox>

<ExerciseBox title="Build a decoder mask" difficulty="Hard">
Create a causal attention mask for a 6-token sequence. Show the matrix, explain why future positions are blocked, and verify that changing a future token cannot affect an earlier token's logits.
</ExerciseBox>

## Checklist

<ProgressChecklist :items="['Explained self-attention', 'Implemented scaled dot-product attention', 'Explained masks and positional encodings', 'Compared encoder/decoder architectures', 'Trained or evaluated a small Transformer model']" storageKey="machine-learning/4-transformers" />

> Note your learnings in the [Live Editor](/editor) and export them here.

## Self-Test (Flashcards)

<Quiz storageKey="quiz-4-transformers" :cards="[
  { q: 'What replaced recurrence in Transformers?', a: '<b>Self-attention</b> over all token pairs.' },
  { q: 'Why scale dot products by sqrt(d)?', a: 'To keep gradients stable during training.' },
  { q: 'What do encoders like BERT do?', a: 'Read all tokens at once with bidirectional attention.' },
  { q: 'Why use positional encodings?', a: 'Attention is permutation-agnostic, so order must be injected.' },
  { q: 'Why do decoder-only models use a causal mask?', a: 'To prevent each token from attending to future tokens during next-token prediction.' },
  { q: 'Why is long-context attention expensive?', a: 'Vanilla attention compares every token with every other token, giving O(n^2) sequence cost.' }
]" />

## Resources

<ResourceTable title="Transformers Resources" :resources="[
  { label: 'Attention Is All You Need', platform: 'arXiv', type: 'Paper', url: 'https://arxiv.org/abs/1706.03762' },
  { label: 'The Annotated Transformer', platform: 'Harvard NLP', type: 'Guide', url: 'https://nlp.seas.harvard.edu/annotated-transformer/' },
  { label: 'Hugging Face Course', platform: 'Official', type: 'Tutorial', url: 'https://huggingface.co/course' },
  { label: 'Stanford CS224N', platform: 'Stanford', type: 'Course', url: 'https://web.stanford.edu/class/cs224n/' },
  { label: 'MIT 6.S191', platform: 'MIT', type: 'Course', url: 'https://introtodeeplearning.com/' },
  { label: 'Transformers library docs', platform: 'Official', type: 'Docs', url: 'https://huggingface.co/docs/transformers/index' }
]" />
