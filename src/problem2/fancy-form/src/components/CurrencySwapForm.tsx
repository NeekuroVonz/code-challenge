import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowDownUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { getPrices, getTokenIcon } from "@/services/api";
import { PriceData, TokenIcon } from "@/types";
import CurrencySelect from "./CurrencySelect";

// Form validation schema
const swapFormSchema = z.object({
	fromAmount: z
		.string()
		.min(1, "Amount is required")
		.refine((val) => !isNaN(Number(val)), "Must be a number")
		.refine((val) => Number(val) > 0, "Amount must be greater than 0"),
	fromCurrency: z.string().min(1, "From currency is required"),
	toCurrency: z.string().min(1, "To currency is required"),
});

const CurrencySwapForm: React.FC = () => {
	// State
	const [prices, setPrices] = useState<PriceData[]>([]);
	const [tokenIcons, setTokenIcons] = useState<TokenIcon>({});
	const [toAmount, setToAmount] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>("");

	// Form handling
	const {
		register,
		handleSubmit,
		watch,
		setValue,
		formState: { errors },
	} = useForm<z.infer<typeof swapFormSchema>>({
		resolver: zodResolver(swapFormSchema),
		defaultValues: {
			fromAmount: "",
			fromCurrency: "ETH",
			toCurrency: "USDC",
		},
	});

	// Watch form values for real-time conversion
	const fromAmount = watch("fromAmount");
	const fromCurrency = watch("fromCurrency");
	const toCurrency = watch("toCurrency");

	// Function to encode SVG for use in img src
	const encodeSvg = (svgString: string) => {
		const encoded = encodeURIComponent(svgString).replace(/'/g, "%27").replace(/"/g, "%22");
		return `data:image/svg+xml;charset=utf-8,${encoded}`;
	};

	// Fetch initial data
	useEffect(() => {
		const fetchData = async () => {
			try {
				const pricesData = await getPrices();
				// Remove duplicates and get latest price for each currency
				const uniquePrices = Object.values(
					pricesData.reduce((acc: Record<string, PriceData>, curr) => {
						if (!acc[curr.currency] || new Date(acc[curr.currency].date) < new Date(curr.date)) {
							acc[curr.currency] = curr;
						}
						return acc;
					}, {})
				);
				setPrices(uniquePrices);

				// Fetch icons for all currencies
				const icons: TokenIcon = {};
				for (const price of uniquePrices) {
					const svgData = await getTokenIcon(price.currency);
					if (svgData) {
						icons[price.currency] = encodeSvg(svgData);
					}
				}
				setTokenIcons(icons);
			} catch (err) {
				console.error(err);
				setError("Failed to load currency data");
			}
		};

		fetchData();
	}, []);

	// Calculate exchange rate
	const getExchangeRate = (from: string, to: string): number => {
		const fromPrice = prices.find((p) => p.currency === from)?.price || 0;
		const toPrice = prices.find((p) => p.currency === to)?.price || 0;
		return fromPrice && toPrice ? fromPrice / toPrice : 0;
	};

	// Update to amount when from amount changes
	useEffect(() => {
		if (fromAmount && !isNaN(Number(fromAmount))) {
			const rate = getExchangeRate(fromCurrency, toCurrency);
			setToAmount((Number(fromAmount) * rate).toFixed(6));
			setError("");
		} else {
			setToAmount("");
		}
	}, [fromAmount, fromCurrency, toCurrency, prices]);

	// Handle currency swap
	const handleSwap = () => {
		const currentFrom = fromCurrency;
		const currentTo = toCurrency;
		setValue("fromCurrency", currentTo);
		setValue("toCurrency", currentFrom);
		setValue("fromAmount", toAmount);
	};

	// Handle form submission
	const onSubmit = async () => {
		setIsLoading(true);
		try {
			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 1500));

			// Reset form
			setValue("fromAmount", "");
			setToAmount("");
			setError("");
		} catch (err) {
			console.error(err);
			setError("Failed to process swap. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Card className="w-full max-w-md mx-auto">
			<CardHeader>
				<CardTitle className="text-2xl font-bold text-center">Swap Currencies</CardTitle>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
					{/* From Currency Section */}
					<div className="space-y-2">
						<label className="block text-sm font-medium">From</label>
						<div className="flex gap-2">
							<div className="w-1/3">
								<CurrencySelect value={fromCurrency} onValueChange={(value: string) => setValue("fromCurrency", value)} currencies={prices.map((p) => p.currency)} icons={tokenIcons} name="fromCurrency" />
							</div>
							<Input {...register("fromAmount")} type="number" placeholder="0.00" className="w-2/3" min="0" />
						</div>
						{errors.fromAmount && <p className="text-sm text-red-500">{errors.fromAmount.message}</p>}
					</div>

					{/* Swap Button */}
					<div className="flex justify-center">
						<Button type="button" variant="ghost" size="icon" onClick={handleSwap} className="rounded-full">
							<ArrowDownUp className="h-6 w-6" />
						</Button>
					</div>

					{/* To Currency Section */}
					<div className="space-y-2">
						<label className="block text-sm font-medium">To</label>
						<div className="flex gap-2">
							<div className="w-1/3">
								<CurrencySelect value={toCurrency} onValueChange={(value: string) => setValue("toCurrency", value)} currencies={prices.map((p) => p.currency)} icons={tokenIcons} name="toCurrency" />
							</div>
							<Input type="number" value={toAmount} readOnly placeholder="0.00" className="w-2/3 bg-muted" />
						</div>
					</div>

					{/* Exchange Rate Display */}
					{fromAmount && !isNaN(Number(fromAmount)) && (
						<div className="text-sm text-muted-foreground text-center">
							1 {fromCurrency} = {getExchangeRate(fromCurrency, toCurrency).toFixed(6)} {toCurrency}
						</div>
					)}

					{/* Error Message */}
					{error && (
						<Alert variant="destructive">
							<AlertDescription>{error}</AlertDescription>
						</Alert>
					)}

					{/* Submit Button */}
					<Button type="submit" className="w-full" disabled={isLoading || !fromAmount || isNaN(Number(fromAmount))}>
						{isLoading ? "Processing..." : "Swap"}
					</Button>
				</form>
			</CardContent>
		</Card>
	);
};

export default CurrencySwapForm;
