'use client';

import React, { FC, ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RainbowKitProvider, lightTheme } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { config } from './Eth/config';

const queryClient = new QueryClient();

interface WalletProviderProps {
  children: ReactNode;
}
const EthWalletProvider: FC<WalletProviderProps> = ({ children }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={lightTheme({
          accentColor: '#A9DDE0',
          accentColorForeground:'white',
          borderRadius: 'large',
          fontStack: 'rounded',
          overlayBlur: 'none'
        })}>{children}</RainbowKitProvider>
        </QueryClientProvider>
    </WagmiProvider>
  );
};
export default EthWalletProvider;
