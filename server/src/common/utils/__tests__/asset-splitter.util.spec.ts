import { krExchangeAssetSplitter, binanceAssetSplitter } from '../asset-splitter.util';

describe('Asset Splitter Util', () => {
  describe('krExchangeAssetSplitter', () => {
    it('should split KRW-BTC correctly', () => {
      const result = krExchangeAssetSplitter('KRW-BTC');
      expect(result).toEqual({ quoteAsset: 'KRW', baseAsset: 'BTC' });
    });

    it('should split KRW-ETH correctly', () => {
      const result = krExchangeAssetSplitter('KRW-ETH');
      expect(result).toEqual({ quoteAsset: 'KRW', baseAsset: 'ETH' });
    });
  });

  describe('binanceAssetSplitter', () => {
    it('should split BTCUSDT correctly', () => {
      const result = binanceAssetSplitter('BTCUSDT');
      expect(result).toEqual({ baseAsset: 'BTC', quoteAsset: 'USDT' });
    });

    it('should split ETHUSDT correctly', () => {
      const result = binanceAssetSplitter('ETHUSDT');
      expect(result).toEqual({ baseAsset: 'ETH', quoteAsset: 'USDT' });
    });
  });
});
