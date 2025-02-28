/**
 * KR Exchange Asset Splitter
 * @param symbol
 * @returns
 * @example
 * upbitAssetSplitter("KRW-BTC") // { quoteAsset: "KRW", baseAsset: "BTC" }
 * bithumbAssetSplitter("BTC-KRW") // { quoteAsset: "KRW", baseAsset: "BTC" }
 */
export const krExchangeAssetSplitter = (symbol: string) => {
  const [quoteAsset, baseAsset] = symbol.split('-');
  return { quoteAsset, baseAsset };
};

/**
 * Binance Asset Splitter
 * @param symbol
 * @returns
 * @example
 * binanceAssetSplitter("BTCUSDT") // { quoteAsset: "USDT", baseAsset: "BTC" }
 */
export const binanceAssetSplitter = (symbol: string) => {
  const baseAsset = symbol.slice(0, -4);
  const quoteAsset = 'USDT';
  return { baseAsset, quoteAsset };
};
