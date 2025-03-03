export interface ActiveUsersData {
  count: number;
}

export interface ExchangeRateData {
  rate: number;
  timestamp: number;
}

// TODO: 수정 필요
export interface ExchangeTickerData {
  price: number;
  timestamp: number;
  volume: number;
  change24h: number;
}
// TODO: 수정 필요
export interface CoinPremiumData {
  [symbol: `${string}-${string}`]: {
    upbit?: ExchangeTickerData;
    binance?: ExchangeTickerData;
    bithumb?: ExchangeTickerData;
    coinone?: ExchangeTickerData;
    okx?: ExchangeTickerData;
  };
}
