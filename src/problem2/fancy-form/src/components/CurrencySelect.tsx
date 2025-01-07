import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TokenIcon } from "@/types";

interface CurrencySelectProps {
	value: string;
	onValueChange: (value: string) => void;
	currencies: string[];
	icons: TokenIcon;
	name: string;
}

const CurrencySelect: React.FC<CurrencySelectProps> = ({ value, onValueChange, currencies, icons, name }) => {
	return (
		<Select value={value} onValueChange={onValueChange} name={name}>
			<SelectTrigger className="w-full">
				<div className="flex items-center gap-2">
					{icons[value] && <img src={icons[value]} alt={`${value} icon`} className="w-5 h-5" />}

					<SelectValue>{value}</SelectValue>
				</div>
			</SelectTrigger>
			<SelectContent>
				{currencies.map((currency: string) => (
					<SelectItem key={currency} value={currency} className="flex items-center gap-2 cursor-pointer">
						<div className="flex items-center gap-2">
							{icons[currency] && <img src={icons[currency]} alt={`${currency} icon`} className="w-5 h-5" />}

							{currency}
						</div>
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
};

export default CurrencySelect;
