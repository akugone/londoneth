import { IToken, NetworkEnum } from '@/types/config';

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

export type Config = {
    networkId: NetworkEnum;
    subgraphUrl: string;
    contracts: { [key: string]: `0x${string}` };
};

export const maxDecimals = {
    ETH: 2,
};

export const FEE_RATE_DIVIDER = 10_000;

const sepolia: Config = {
    networkId: NetworkEnum.SEPOLIA,
    subgraphUrl: 'https://api.thegraph.com/subgraphs/name/akugone/nodnol',
    contracts: {
        hackathonId: '0x9271De5df28708D2c7C5d8954293228b68234F7a',
        proofOfGive: '0x4169495E9dE1334621b5F83dc98eA6F2d23c4471',
    },
};

const chains: { [networkId in NetworkEnum]: Config } = {
    [NetworkEnum.SEPOLIA]: sepolia,
};

export const getConfig = (networkId: NetworkEnum) => chains[networkId];
