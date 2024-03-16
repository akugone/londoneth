'use client';

import { UI } from '@/components/ui';
import { ChevronsUpDown } from 'lucide-react';
import { Icons } from '@/components/icons';
import { useNetwork, useSwitchNetwork } from 'wagmi';

const NETWORK_ICONS = {
    homestead: Icons.Ethereum,
    matic: Icons.Polygon,
    // "maticmum": Icons.Polygon,
    gnosis: Icons.Gnosis,
    // "matic": Icons.BinanceSmartChain,
};

export const WagmiNetworkSwitcher = () => {
    const { chain: activeChain } = useNetwork();
    const { chains, reset, switchNetwork } = useSwitchNetwork({
        onSettled: () => {
            // Reset mutation variables (eg. pendingChainId, error)
            reset();
        },
    });

    const ActiveIcon = NETWORK_ICONS[activeChain?.network] || null;

    console.log({ activeChain });

    return (
        <>
            {activeChain?.unsupported ? (
                <p>Chilliz_Spicy</p>
            ) : (
                <UI.DropdownMenu>
                    <UI.DropdownMenuTrigger asChild>
                        <UI.Button
                            variant="outline"
                            className="gap-2"
                        >
                            {ActiveIcon && (
                                <ActiveIcon className="w-6 h-6 rounded-full" />
                            )}
                            {activeChain?.name}
                            <ChevronsUpDown className="w-4 h-4 opacity-50" />
                        </UI.Button>
                    </UI.DropdownMenuTrigger>
                    <UI.DropdownMenuContent>
                        {chains &&
                            chains.map((chain) => {
                                const Icon =
                                    NETWORK_ICONS[chain?.network] || null;
                                return (
                                    <UI.DropdownMenuItem
                                        key={chain.id}
                                        className="gap-2 py-2 px-4"
                                        onClick={() =>
                                            switchNetwork({ chainId: chain.id })
                                        }
                                    >
                                        {Icon && (
                                            <Icon className="w-6 h-6 rounded-full" />
                                        )}
                                        {chain.name}
                                    </UI.DropdownMenuItem>
                                );
                            })}
                    </UI.DropdownMenuContent>
                </UI.DropdownMenu>
            )}
        </>
    );
};
