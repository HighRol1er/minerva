export interface ActiveUsersData {
  count: number;
}

export interface ExchangeRateData {
  rate: number;
  timestamp: number;
}

// TODO: 수정 필요
export interface ExchangeSymbolData {
  price: number;
  volume: number;
  change24h: number;
  timestamp: number;
}
// TODO: 수정 필요
export interface CoinPremiumData {
  [symbol: `${string}-${string}`]: {
    upbit?: ExchangeSymbolData;
    binance?: ExchangeSymbolData;
    bithumb?: ExchangeSymbolData;
    coinone?: ExchangeSymbolData;
    okx?: ExchangeSymbolData;
  };
}
