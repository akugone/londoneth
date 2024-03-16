'use client';

import { UI } from '@/components/ui';
import { useAccount, useNetwork, useSwitchNetwork } from 'wagmi';
import { ClipboardCheck, ClipboardCopy, LogOut, X } from 'lucide-react';
import { Icons } from '@/components/icons';
import { disconnect } from '@wagmi/core';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';
import { WagmiConnectWallet } from '@/components/wagmi-connect-wallet';
import { WagmiNetworkSwitcher } from '@/components/wagmi-network-switcher';

const formatAddress = (address: string) => {
    return `${address.slice(0, 4)}…${address.slice(-4)}`;
};

interface Props {
    className?: string;
}

export const WagmiConnect = ({className}: Props) => {
    const { chain: activeChain } = useNetwork();
    const { reset } = useSwitchNetwork({
        onSettled: () => {
            // Reset mutation variables (eg. pendingChainId, error)
            reset();
        },
    });
    const { address, isConnected } = useAccount();
    const { copiedText, copy } = useCopyToClipboard();

    return (
        <>
            {address && isConnected ? (
                <>
                    <WagmiNetworkSwitcher />
                    <UI.AlertDialog>
                        <UI.AlertDialogTrigger asChild>
                            <UI.Button variant="link">
                                {formatAddress(address.toString())}
                            </UI.Button>
                        </UI.AlertDialogTrigger>
                        <UI.AlertDialogContent>
                            <UI.AlertDialogHeader>
                                <UI.AlertDialogCancel className="absolute p-0 top-2 right-2 border-none w-8 h-8 flex items-center justify-center">
                                    <X className="w-4 h-4" />
                                    <span className="sr-only">Close</span>
                                </UI.AlertDialogCancel>
                                <UI.AlertDialogTitle className="text-center">
                                    {formatAddress(address.toString())}
                                </UI.AlertDialogTitle>
                            </UI.AlertDialogHeader>
                            <UI.AlertDialogDescription className="flex flex-col gap-4 md:flex-row">
                                <UI.Button
                                    variant="outline"
                                    className="py-4 h-auto flex-col flex-1 gap-2"
                                    onClick={() => copy(address.toString())}
                                >
                                    {copiedText ? (
                                        <ClipboardCheck className="w-5 h-5 opacity-50" />
                                    ) : (
                                        <ClipboardCopy className="w-5 h-5 opacity-50" />
                                    )}
                                    {copiedText ? 'Copied' : 'Copy address'}
                                </UI.Button>
                                <UI.Button
                                    className="py-4 h-auto flex-col flex-1 gap-2"
                                    onClick={() => disconnect()}
                                >
                                    <LogOut className="w-5 h-5 opacity-50" />
                                    Disconnect
                                </UI.Button>
                            </UI.AlertDialogDescription>
                        </UI.AlertDialogContent>
                    </UI.AlertDialog>
                </>
            ) : (
                <WagmiConnectWallet className={className} />
            )}
        </>
    );
};
