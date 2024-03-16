import {ReactNode} from "react";
import {Address} from "@/types/address";
import {useContractReads} from "wagmi";
import {wagmiContractConfig} from "@/config/wagmiConfig";
import {BaseError} from "viem";
import {notFound} from "next/navigation";

interface PropsChildren {
    address: Address;
    organization: {
        id: string;
        name: string;
        image: string;
        cid: string;
    };
}

interface Props {
    children: (props: PropsChildren) => ReactNode;
    address: Address;
}

export default function FetchOrganizerNft({address, children}: Props) {

    const {data, error, isLoading} = useContractReads({
        contracts: [
            {
                ...wagmiContractConfig,
                functionName: 'balanceOf',
                args: [address],
            },
            {
                ...wagmiContractConfig,
                functionName: 'hackathons',
                args: [address],
            },
        ],
    });

    const [balanceOf, hackathons] = data || [];

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return (
            <div>
                Error: {(error as BaseError).shortMessage || error.message}
            </div>
        );
    }

    const hasNft = Boolean(balanceOf);

    if (!hasNft) {
        notFound();
    }

    return !!hackathons?.result && (
        <>
            {
                children({
                    address: address,
                    organization: {
                        id: hackathons.result[0].toString(),
                        name: hackathons.result[1].toString(),
                        image: '',
                        cid: hackathons.result[2].toString(),
                    }
                })
            }
        </>
    );
}
