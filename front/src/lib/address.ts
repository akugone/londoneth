import {Address} from "@/types/address";

export function formatAddress(address: Address): string {
    return `${address.toString().slice(0, 4)}…${address.toString().slice(-4)}`;
}
