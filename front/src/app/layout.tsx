'use client';

import './globals.css';
import './styles.css';
import { PropsWithChildren } from 'react';
import { WagmiProvider } from '@/components/wagmi-provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SessionProvider from '@/components/Provider';

import { Londrina_Solid } from 'next/font/google';

const londrina = Londrina_Solid({ subsets: ['latin'], weight: '300' });

export default function RootLayout({ children }: PropsWithChildren) {
    const queryClient = new QueryClient();

    return (
        <html lang="en">
            <body className={londrina.className}>
                <SessionProvider>
                    {/*<DynamicProvider>*/}
                    <WagmiProvider>
                        <QueryClientProvider client={queryClient}>
                            {children}
                        </QueryClientProvider>
                    </WagmiProvider>
                    {/*</DynamicProvider>*/}
                </SessionProvider>
            </body>
        </html>
    );
}
