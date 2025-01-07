# Computational Inefficiencies and Anti-Patterns
## 1. ```getPriority``` function inside ```useMemo```:
**Issue:** The ```getPriority``` function is defined inside the ```useMemo``` hook. This means that the function gets recreated on every render, which is computationally expensive. Although the ```useMemo``` hook helps memoize the sorted balances, recreating the ```getPriority``` function on every render defeats its purpose.

**Solution:** Move the ```getPriority``` function outside of the ```useMemo``` hook to ensure it’s only created once.

## 2. Inefficient filtering and sorting inside ```useMemo```:
**Issue:** The ```balances.filter()``` and ```balances.sort()``` operations are executed together inside the ```useMemo``` hook. Filtering and sorting are both O(n) and O(n log n) operations, respectively. Every time either ```balances``` or ```prices``` change, the filtering and sorting are recalculated, which can be computationally expensive for large datasets.

**Solution:** Refactor the logic to perform filtering and sorting only when necessary. For instance, filter out negative balances first and then sort the remaining balances to minimize unnecessary operations.

## 3. Unnecessary sorting when filtering:
**Issue:** You are filtering the balances by checking ```balance.amount <= 0``` and then sorting them. Sorting may not be necessary after filtering if the final result doesn't require ordered data.

**Solution:** If sorting is not strictly needed, eliminate it after filtering. Otherwise, perform the sorting only after filtering out the irrelevant balances.

## 4. Mapping ```formattedBalances``` after sorting:
**Issue:** It’s like you’re writing a shopping list, and then making a separate list of prices after you’ve already written down everything you bought. Why do it twice when you can just write the price next to each item the first time around? Two steps for something that could be done in one.

**Solution:** Skip the extra round of formatting by doing it in the ```rows``` map, where you already have the data. This way, you format while you’re listing things — one trip to the store, no extra running around.

## 5. Repeated usage of ```prices[balance.currency]```:
**Issue:** It's like asking your friend for the price of a t-shirt every time you need it, even though you already know the price. You're just repeating yourself, and it's time-consuming.

**Solution:** Grab the price once, put it in a variable, and use it. It's like looking at the price tag once and remembering it. Less time spent asking questions, more time for fun things (like staring at cats on the internet).

## 6. ```key``` prop in the ```WalletRow``` component:
**Issue:** Using the array index as a ```key``` in React is like putting your name on a list and then realizing 10 other people have the same name. It’s confusing, and React won’t know who is who when things move around. It’s an organizational nightmare!

**Solution:** Use a unique key like ```balance.currency```. That way, React knows exactly who’s who, and there's no confusion — it’s like giving each person at the party a name tag.

## [Click here for the new code (not actually lmao)](https://choosealicense.com/licenses/mit/)