---
title: RAG & Agents
---

# Modern AI (LLMs & Agents): RAG & Agents

Retrieval-Augmented Generation (RAG) grounds an LLM by fetching relevant documents and feeding them into the prompt, reducing hallucinations. **Agents** extend this by letting the model call tools (search, code execution, APIs) in a loop to accomplish goals.

<ExampleBox title="A minimal FAISS-backed RAG" lang="python">

```python
from sentence_transformers import SentenceTransformer
import faiss
import numpy as np

docs = ["Paris is the capital of France.", "Berlin is the capital of Germany."]
model = SentenceTransformer("all-MiniLM-L6-v2")
emb = model.encode(docs)
index = faiss.IndexFlatL2(emb.shape[1])
index.add(np.array(emb))

q = model.encode(["What is the capital of France?"])
_, idx = index.search(np.array(q), k=1)
print(docs[idx[0][0]])  # Paris is the capital of France.
```
</ExampleBox>

Key points:
- **Embeddings** turn text into vectors; a vector index retrieves neighbors.
- RAG retrieves top-k chunks and injects them into the LLM prompt.
- **Agents** loop: plan + call tool + observe + repeat until done.
- Tools are just functions the model can invoke via structured output.
- Always cite retrieved sources so answers stay verifiable.

<ExerciseBox title="Build a RAG app" difficulty="Hard">

Index a small set of Markdown notes with FAISS, retrieve the top-3 chunks for a user question, and pass them to an LLM (e.g. via the OpenAI or Hugging Face API) to answer.

</ExerciseBox>

<ExerciseBox title="Add a tool" difficulty="Medium">

Wrap a calculator function as a tool and have an agent decide when to call it versus answering from memory. Log the tool calls.

</ExerciseBox>

## Checklist

<ProgressChecklist :items="['Built a RAG app', 'Added an agent with tools']" storageKey="machine-learning/5-rag-agents" />

> Note your learnings in the [Live Editor](/editor) and export them here.

## Self-Test (Flashcards)

<Quiz storageKey="quiz-5-rag-agents" :cards="[
{ q: 'What does RAG do?', a: 'Retrieves relevant documents and feeds them into the LLM prompt.' }, { q: 'What turns text into vectors for RAG?', a: '<b>Embeddings</b> indexed in a vector store like FAISS.' }, { q: 'What is an agent loop?', a: 'Plan, call tool, observe, repeat until the goal is done.' }, { q: 'Why cite retrieved sources?', a: 'To keep generated answers verifiable and grounded.' }
]" />

## Resources

<ResourceTable title="RAG & Agents Resources" :resources="[
  { label: 'LangChain Docs', platform: 'Official', type: 'Docs', url: 'https://python.langchain.com/docs/' },
  { label: 'FAISS', platform: 'GitHub', type: 'Docs', url: 'https://github.com/facebookresearch/faiss' },
  { label: 'Hugging Face Course', platform: 'Official', type: 'Tutorial', url: 'https://huggingface.co/course' },
  { label: 'CS50 AI', platform: 'Official', type: 'Video', url: 'https://cs50.harvard.edu/ai/' },
  { label: 'RAG Explained', platform: 'YouTube', type: 'Video', url: 'https://www.youtube.com/watch?v=T-D1OfcMzVg' }
]" />
