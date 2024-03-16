import { createPublicClient, createWalletClient, custom } from 'viem';
import { mainnet, chiliz } from 'viem/chains';

export const publicClient = createPublicClient({
    chain: mainnet,
    transport: http(),
});

export const walletClient = createWalletClient({
    chain: mainnet,
    transport: custom(window.ethereum),
});

// JSON-RPC Account
export const [account] = await walletClient.getAddresses();
// Local Account
export const account = privateKeyToAccount('0x...');
