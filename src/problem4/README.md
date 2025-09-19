# Problem 4: Three ways to sum to n

This folder contains my solution to **Problem 4: Three ways to sum to n**.

## 📌 Problem
Given an integer `n`, return the summation from `1` to `n`.

Example:
```
sum_to_n(5) = 1 + 2 + 3 + 4 + 5 = 15
```

---

## 📂 Files
- `problem4.ts` → Contains three implementations:
    - `sum_to_n_a` – Iterative loop
    - `sum_to_n_b` – Formula (Gauss' formula)
    - `sum_to_n_c` – Recursion

---

## 🛠 Implementations & Complexity

### 1. Iterative Loop (`sum_to_n_a`)
```ts
function sum_to_n_a(n: number): number {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}
```
- **Time Complexity**: O(n)
- **Space Complexity**: O(1)
- ✅ Simple and easy to understand.

---

### 2. Formula / Gauss’ Trick (`sum_to_n_b`)
```ts
function sum_to_n_b(n: number): number {
  return (n * (n + 1)) / 2;
}
```
- **Time Complexity**: O(1)
- **Space Complexity**: O(1)
- ✅ Most efficient solution.

---

### 3. Recursion (`sum_to_n_c`)
```ts
function sum_to_n_c(n: number): number {
  if (n <= 1) return n;
  return n + sum_to_n_c(n - 1);
}
```
- **Time Complexity**: O(n)
- **Space Complexity**: O(n) (due to call stack)
- ⚠️ Not suitable for very large `n` but shows recursive thinking.

---

## ▶️ Example Output
Running `npm install` then `npx ts-node problem4.ts` with `n = 5`:

```
15
15
15
```

---

## ✅ Notes
- Solutions assume input `n` is a positive integer.
- All outputs fit within `Number.MAX_SAFE_INTEGER`.