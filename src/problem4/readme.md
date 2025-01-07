## Since it the same as the problem 1 there wont be demo
## and i totally forgot that problem 1 is Javascript but i did it in Typescript hope y'all don't mind

### 1. Iterative Approach (The Manual Labor Accountant)
```typescript
const sum_to_n_a(n: number): number {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i; // One... two... three... someone bring coffee!
    }
    return sum; // Finally done. Can I take a break now?
}
```
#### Complexity:
**Time Complexity: *O*(𝑛)** – We’re doing this the hard way, one number at a time.

**Space Complexity: *O*(1)** – We only need one box to store the growing sum. 

**Analysis:** Great for small numbers, but for 𝑛 n in the millions, it feels like an unpaid internship. Reliable, though—this accountant won’t miss a single number!

### 2. Arithmetic Series Formula (The Genius Mathematician)
```typescript
const sum_to_n_b = (n: number): number => {
    return (n * (n + 1)) / 2; // Quick math—no sweat!
};
```
#### Complexity:
**Time Complexity: *O*(1)** – One shot, one kill. No looping, no nonsense.

**Space Complexity: *O*(1)** – A single calculation, and we're outta here.

**Analysis:** This is the smooth-talker of summation methods. Fast, efficient, and has zero tolerance for inefficiency. Just don’t push **𝑛** so high that it messes with ```Number.MAX_SAFE_INTEGER```, or the math magician might turn into a clown.

### 3. Recursive Approach (The Drama Queen Recursion)
```typescript
const sum_to_n_c = (n: number): number => {
    if (n === 1) return 1; // We’ve hit the base case. Bravo!
    return n + sum_to_n_c(n - 1); // "One more step... we can do this!"
};
```
#### Complexity:
**Time Complexity: *O*(𝑛)** – Every number gets its 15 milliseconds of fame in the call stack.

**Space Complexity: *O*(𝑛)** – The recursion stack keeps growing, like a dramatic plot twist.

**Analysis:** Looks cool on paper but can be a diva for large numbers. If 𝑛 > 10^6, prepare for a "stack overflow" meltdown. Use this for showing off to your friends, not for serious work.