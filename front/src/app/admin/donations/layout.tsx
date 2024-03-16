'use client';

import { PropsWithChildren } from 'react';
import { useAccount } from 'wagmi';
import { HackathonProvider } from '@/contexts/HackathonProvider';
import FetchOrganizerNft from "@/components/fetch-organizer-nft";
import DonationsAside from "@/app/admin/donations/donations-aside";
import DonationsHeader from "@/app/admin/donations/donations-header";

export default function AdminLayout({ children }: PropsWithChildren) {
    const { address } = useAccount();

    if (!address) {
        return <div>Loading...</div>;
    }

    return (
            <FetchOrganizerNft address={address}>
                {
                    ({address, organization}) => {
                        return !! organization && (
                            <HackathonProvider id={organization.id}>
                                <DonationsHeader
                                    address={address}
                                    organization={organization}
                                />
                                {children}
                                <DonationsAside address={address} />
                            </HackathonProvider>
                        )
                    }
                }
            </FetchOrganizerNft>
    );
}
