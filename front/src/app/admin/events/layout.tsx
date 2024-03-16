'use client';

import { PropsWithChildren } from 'react';
import { useAccount } from 'wagmi';
import EventsHeader from './events-header';
import { HackathonProvider } from '@/contexts/HackathonProvider';
import EventsAside from './events-aside';
import FetchOrganizerNft from "@/components/fetch-organizer-nft";

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
                                <EventsHeader
                                    address={address}
                                    organization={organization}
                                />
                                {children}
                                <EventsAside />
                            </HackathonProvider>
                        )
                    }
                }
            </FetchOrganizerNft>
    );
}
