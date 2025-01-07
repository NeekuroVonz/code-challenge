```typescript
interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string;
}
interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}

interface Props extends BoxProps {}

const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  // Let's move this 'priority-setting' function out, so it's not recreated every time like a lazy student copying homework last minute
  const getPriority = (blockchain: string): number => {
    switch (blockchain) {
      case 'Osmosis': return 100;
      case 'Ethereum': return 50;
      case 'Arbitrum': return 30;
      case 'Zilliqa': return 20;
      case 'Neo': return 20;
      default: return -99; // Basically, the blockchain nobody invited to the party
    }
  };

  const sortedBalances = useMemo(() => {
    // First, let's kick out the negative balances from the party - no one wants those, right?
    const filteredBalances = balances.filter((balance: WalletBalance) => {
      const balancePriority = getPriority(balance.blockchain);
      return balancePriority > -99 && balance.amount > 0; // Only positive and invited blockchains allowed
    });

    // Sorting them based on priority, so the best ones are at the top of the list like the popular kids
    return filteredBalances.sort((lhs: WalletBalance, rhs: WalletBalance) => {
      const leftPriority = getPriority(lhs.blockchain);
      const rightPriority = getPriority(rhs.blockchain);
      return rightPriority - leftPriority; // Priorities! It's like sorting your Spotify playlists by how cool they are
    });
  }, [balances]);

  const rows = sortedBalances.map((balance: WalletBalance) => {
    // Cache prices, so we're not looking up the same info twice like an indecisive shopper
    const usdValue = prices[balance.currency] * balance.amount;
    const formattedAmount = balance.amount.toFixed(); // Formatting the amount because we care about details (just like you do on your resume)

    return (
      <WalletRow 
        className={classes.row}
        key={balance.currency} // Using something unique as key because no one likes a copycat
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={formattedAmount}
      />
    );
  });

  return <div {...rest}>{rows}</div>; // Displaying everything like a proud parent showing off their kid's grades
};
```