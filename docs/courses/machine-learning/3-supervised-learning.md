---
title: Supervised Learning
---

# Classical ML: Supervised Learning

Supervised learning fits a model to labeled data `(X, y)` so it can predict `y` for new `X`. Regression predicts continuous values; classification predicts discrete labels. Always split data into train/test sets and evaluate with appropriate metrics.

<ExampleBox title="Train and evaluate with scikit-learn" lang="python">

```python
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score
from sklearn.datasets import load_iris

X, y = load_iris(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = LogisticRegression(max_iter=200)
model.fit(X_train, y_train)

preds = model.predict(X_test)
print("accuracy:", accuracy_score(y_test, preds))
```
</ExampleBox>

Key points:
- Split data into **train/test** (often 80/20) to measure generalization.
- **Regression** uses metrics like MAE/RMSE; **classification** uses accuracy, precision, recall.
- `LogisticRegression`, `RandomForest`, and `SVC` are common classifiers.
- Feature scaling (e.g. `StandardScaler`) helps many models converge.
- Never evaluate on the same data you trained on — that overfits silently.

<ExerciseBox title="Your first model" difficulty="Easy">

Load a dataset with scikit-learn, split it, train a `RandomForestClassifier`, and report test accuracy. Try changing `random_state` and observe variance.

</ExerciseBox>

<ExerciseBox title="Regression task" difficulty="Medium">

Use `LinearRegression` on a regression dataset (e.g. `load_diabetes`). Report RMSE on the test set and plot predicted vs actual values.

</ExerciseBox>

## Checklist

<ProgressChecklist :items="['Trained a model', 'Split train/test', 'Reported accuracy']" storageKey="machine-learning/3-supervised-learning" />

> Note your learnings in the [Live Editor](/editor) and export them here.

## Self-Test (Flashcards)

<Quiz storageKey="quiz-3-supervised-learning" :cards="[
{ q: 'What predicts continuous values?', a: '<b>Regression</b> (e.g. LinearRegression).' }, { q: 'What predicts discrete labels?', a: '<b>Classification</b> (e.g. LogisticRegression).' }, { q: 'Why split train/test?', a: 'To measure generalization on unseen data.' }, { q: 'What metric scores classification?', a: 'Accuracy, precision, and recall.' }
]" />

## Resources

<ResourceTable title="Supervised Learning Resources" :resources="[
  { label: 'scikit-learn Docs', platform: 'Official', type: 'Docs', url: 'https://scikit-learn.org/stable/documentation.html' },
  { label: 'Andrew Ng ML Course', platform: 'Official', type: 'Video', url: 'https://www.coursera.org/learn/machine-learning' },
  { label: 'Python ML (W3Schools)', platform: 'W3Schools', type: 'Tutorial', url: 'https://www.w3schools.com/python/numpy/numpy_intro.asp' },
  { label: 'ML Crash Course', platform: 'YouTube', type: 'Video', url: 'https://www.youtube.com/watch?v=aircAruvnKk' }
]" />
