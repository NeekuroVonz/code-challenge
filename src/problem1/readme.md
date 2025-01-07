## 3 Unique Implementations

### 1. Iterative Approach
```typescript
const sum_to_n_a = (n: number): number => {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
};
```

### 2. Arithmetic Series Formula
```typescript
const sum_to_n_b = (n: number): number => {
    return (n * (n + 1)) / 2;
};
```

### 3. Recursive Approach
```typescript
const sum_to_n_c = (n: number): number => {
    if (n === 1) return 1;
    return n + sum_to_n_c(n - 1);
};
```