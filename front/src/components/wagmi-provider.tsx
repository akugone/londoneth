'use client';

import { WagmiConfig, createConfig, configureChains } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import {PropsWithChildren, useEffect, useState} from 'react';
import { publicProvider } from 'wagmi/providers/public'
import { MetaMaskConnector } from '@wagmi/connectors/metaMask';

const { chains, publicClient, webSocketPublicClient } = configureChains(
    [
        mainnet,
        sepolia,
    ],
    [publicProvider()]
);

const config = createConfig({
    autoConnect: true,
    connectors: [
        new MetaMaskConnector({ chains }),
    ],
    publicClient,
    webSocketPublicClient,
});

export const WagmiProvider = ({ children }: PropsWithChildren) => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    return <WagmiConfig config={config}>{mounted && children}</WagmiConfig>;
};
