const sum_to_n_a = (n: number): number => {
	let sum = 0;
	for (let i = 1; i <= n; i++) {
		sum += i;
	}
	return sum;
};

const sum_to_n_b = (n: number): number => {
	return (n * (n + 1)) / 2;
};

const sum_to_n_c = (n: number): number => {
	if (n === 1) return 1;
	return n + sum_to_n_c(n - 1);
};

document.getElementById("sumForm")?.addEventListener("submit", (e) => {
	e.preventDefault();
	const n = parseInt((document.getElementById("number") as HTMLInputElement).value, 10);
	const resultsDiv = document.getElementById("results");
	if (resultsDiv) {
		resultsDiv.innerHTML = `
            <p>Sum (Iterative): ${sum_to_n_a(n)}</p>
            <p>Sum (Formula): ${sum_to_n_b(n)}</p>
            <p>Sum (Recursive): ${sum_to_n_c(n)}</p>
        `;
	}
});