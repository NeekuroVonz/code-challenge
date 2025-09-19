// Problem 4: Three ways to sum to n

/**
 * Implementation A: Iterative Loop
 * - Time Complexity: O(n) because we loop from 1 to n
 * - Space Complexity: O(1) since we only keep a running total
 */
export function sum_to_n_a(n: number): number {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}

/**
 * Implementation B: Mathematical Formula (Gauss' formula)
 * - Time Complexity: O(1), constant time regardless of n
 * - Space Complexity: O(1)
 * - Most efficient solution
 */
export function sum_to_n_b(n: number): number {
  return (n * (n + 1)) / 2;
}

/**
 * Implementation C: Recursion
 * - Time Complexity: O(n), one recursive call per number
 * - Space Complexity: O(n), due to call stack depth
 * - Less efficient but demonstrates recursive thinking
 */
export function sum_to_n_c(n: number): number {
  if (n <= 1) return n;
  return n + sum_to_n_c(n - 1);
}

// ✅ Example usage
console.log(sum_to_n_a(5)); // 15
console.log(sum_to_n_b(5)); // 15
console.log(sum_to_n_c(5)); // 15
