import { abi } from '@/abis/HackathonID';
import { Address } from '@/types/address';

interface Config {
    abi: typeof abi;
    address: Address;
}

export const wagmiContractConfig: Config = {
    abi: abi,
    address: '0x9271De5df28708D2c7C5d8954293228b68234F7a',
};
