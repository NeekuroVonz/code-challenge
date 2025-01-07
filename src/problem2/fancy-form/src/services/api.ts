import axios from "axios";
import { PriceData } from "../types";

const PRICES_URL = "https://interview.switcheo.com/prices.json";
const TOKENS_BASE_URL = "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens";

export const getPrices = async (): Promise<PriceData[]> => {
	try {
		const response = await axios.get<PriceData[]>(PRICES_URL);
		return response.data;
	} catch (error) {
		console.log("Error fetching prices:", error);
		return [];
	}
};

export const getTokenIcon = async (currency: string): Promise<string | null> => {
	try {
		const response = await axios.get(`${TOKENS_BASE_URL}/${currency}.svg`);
		return response.data;
	} catch (error) {
		console.log(`Error fetching icon for ${currency}:`, error);
		return null;
	}
};
