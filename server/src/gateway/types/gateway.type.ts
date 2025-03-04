export interface ActiveUsersData {
  count: number;
}

export interface ExchangeRateData {
  rate: number;
  timestamp: number;
}

// TODO: 수정 필요
export interface ExchangeSymbolData {
  price: number | string;
  volume: number | string;
  change24h: number | string;
  timestamp: number | string;
}
// TODO: 수정 필요
export interface ConsolidatedMarketData {
  [symbol: `${string}-${string}`]: {
    upbit?: ExchangeSymbolData;
    binance?: ExchangeSymbolData;
    bithumb?: ExchangeSymbolData;
    coinone?: ExchangeSymbolData;
    okx?: ExchangeSymbolData;
  };
}
