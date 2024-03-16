'use client';

import { Svg } from '@/components/svg';
import EventsList from '@/components/events-list';
import {useSubgraphProofOfGive} from "@/hooks/useSubgraphProofOfGive";
import {Address} from "wagmi";
import DonationsList from "@/components/donations-list";

interface Donation{
    id: string;
    userAddress: string;
}

interface Props {
    address: Address;
}

export default function DonationsAside({address}: Props) {
    const { data: donations, loading } = useSubgraphProofOfGive(address);
    const donationsWithAdminLink = donations.map((donation: Donation) => {
        return {
            ...donation,
            href: `/admin/donations/${donation.id}`,
        };
    });

    return (
        <aside className="fixed inset-y-0 left-72 hidden w-96 overflow-y-auto border-r border-gray-200 xl:block">
            {
                loading && (
                    <div className="flex flex-col items-center justify-center h-full">
                        <Svg.Refresh className="h-12 w-12 text-gray-500 animate-spin" strokeWidth={1.5} />
                        <p className="mt-4 text-gray-500 text-sm">
                            Loading
                        </p>
                    </div>
                )
            }
            {
                donationsWithAdminLink.length > 0 && (
                    <>
                        <div className="sticky top-0 z-10 border-y border-b-gray-200 border-t-gray-100 bg-gray-50 px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900">
                            <h3>{donationsWithAdminLink.length} donations</h3>
                        </div>
                        <DonationsList donations={donationsWithAdminLink} />
                    </>
                )
            }
            {
                ! loading && donationsWithAdminLink.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full">
                        <Svg.Coin className="h-12 w-12 text-gray-500" strokeWidth={1.5} />
                        <p className="mt-4 text-gray-500 text-sm">
                            No donations yet
                        </p>
                    </div>
                )
            }
        </aside>
    );
}
