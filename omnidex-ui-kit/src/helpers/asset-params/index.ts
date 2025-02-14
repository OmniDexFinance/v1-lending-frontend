import { getAssetInfo } from '../assets-list';

export const getAssetColor = (assetSymbol: string) => {
  const asset = getAssetInfo(assetSymbol);
  const assetColor = asset.color;

  return assetColor || '#2ebac6';
};

export const STABLE_ASSETS = ['USDC', 'USDT'];

export const isAssetStable = (assetSymbol: string) => {
  const assetInfo = getAssetInfo(assetSymbol);
  return STABLE_ASSETS.includes(assetInfo.symbol.toLocaleUpperCase());
};

export const canBeEnsAddress = (ensAddress: string): boolean => {
  return ensAddress.toLowerCase().endsWith('.eth');
};
