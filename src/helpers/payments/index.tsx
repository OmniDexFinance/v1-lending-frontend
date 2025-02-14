import { useWeb3React } from '@web3-react/core';
import TransakSDK from '@transak/transak-sdk';
import { RampInstantSDK } from '@ramp-network/ramp-instant-sdk';
import NashRamp from '@nash-io/ramp-widget-sdk';

import { useThemeContext } from '@omnidex/omnidex-ui-kit';

import * as logos from './images';
import { ENABLE_NASH, ONRAMP_API_KEY, TRANSAK_API_KEY } from '../config/onramp-config';

enum PaymentName {
  nash = 'nash',
  transak = 'transak',
  onRamp = 'onRamp',
}

interface Payment {
  name: PaymentName;
  logo: string;
  availableAssets?: string[];
  initialized: boolean;
}

type Payments = {
  payments: Payment[];
  paymentClick: (name: PaymentName, currencySymbol: string) => void;
  isPaymentNashNotOnMainMarket: (name: PaymentName) => boolean;
};

export function usePayments(): Payments {
  const { account } = useWeb3React();
  const { currentTheme, sm, lg } = useThemeContext();

  const transakAvailableAssets = ['TLOS', 'USDT', 'USDC'];

  const payments: Payment[] = [
    {
      name: PaymentName.nash,
      logo: logos.nashLogo,
      availableAssets: ['USDC', 'TLOS'],
      initialized: ENABLE_NASH,
    },
    {
      name: PaymentName.transak,
      logo: logos.transakLogo,
      availableAssets: transakAvailableAssets,
      initialized: !!TRANSAK_API_KEY,
    },
    {
      name: PaymentName.onRamp,
      logo: logos.onRampLogo,
      availableAssets: ['TLOS', 'USDC', 'USDT'],
      initialized: !!ONRAMP_API_KEY,
    },
  ].filter((option) => option.initialized);

  const paymentClick = (name: PaymentName, currencySymbol: string) => {
    switch (name) {
      case PaymentName.nash:
        // @ts-ignore
        new NashRamp({
          env: 'PRODUCTION',
          base: 'eur',
          target: currencySymbol,
          destination: account || '',
        }).init({
          width: 500,
          height: 480,
          // @ts-ignore
          modal: true,
        });
        break;
      case PaymentName.transak:
        new TransakSDK({
          apiKey: process.env.REACT_APP_TRANSAK_API_KEY, // Your API Key (Required)
          environment: 'PRODUCTION', // STAGING/PRODUCTION
          defaultCryptoCurrency: currencySymbol,
          walletAddress: account || '',
          networks: 'ETHEREUM',
          themeColor: currentTheme.primary.hex,
          hostURL: window.location.origin,
          widgetHeight: sm ? '550px' : lg ? '600px' : '680px',
          widgetWidth: sm ? '375px' : '500px',
        }).init();
        break;
      case PaymentName.onRamp:
        new RampInstantSDK({
          hostAppName: 'Aave',
          hostLogoUrl: 'https://aave.com/favicon64.png',
          hostApiKey: process.env.REACT_APP_ONRAMP_API_KEY,
          variant: 'auto',
          userAddress: account || '',
          swapAsset: currencySymbol,
        }).show();
        break;
    }
  };

  const isPaymentNashNotOnMainMarket = (name: PaymentName) => false;

  return { payments, paymentClick, isPaymentNashNotOnMainMarket };
}
