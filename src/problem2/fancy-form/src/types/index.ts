export interface PriceData {
	currency: string;
	date: string;
	price: number;
}

export interface TokenIcon {
	[key: string]: string;
}

export interface SwapFormData {
	fromAmount: string;
	fromCurrency: string;
	toCurrency: string;
}
