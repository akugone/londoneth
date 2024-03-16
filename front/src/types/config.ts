export enum NetworkEnum {
    SEPOLIA = '11155111',
}

export type IToken = {
    name: string;
    address: `0x${string}`;
    symbol: string;
    decimals: number;
    minimumTransactionAmount?: string;
};
