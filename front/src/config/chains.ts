import { defineChain } from 'viem';
import { Chain } from 'wagmi';
import { sepolia, chiliz } from 'viem/chains';

export enum NetworkEnum {
    SEPOLIA = 11155111,
    CHILIZ = 88882,
}

const viemFormattedChains: {
    [networkId in NetworkEnum]?: Chain;
} = {
    [NetworkEnum.SEPOLIA]: sepolia,
    [NetworkEnum.CHILIZ]: chiliz,
};

export const getDefaultViemFormattedChain = (): Chain =>
    viemFormattedChains[
        process.env.NEXT_PUBLIC_DEFAULT_CHAIN_ID as unknown as NetworkEnum
    ] as Chain;

export const getViemFormattedChain = (networkId: NetworkEnum): Chain =>
    viemFormattedChains[networkId] || getDefaultViemFormattedChain();
