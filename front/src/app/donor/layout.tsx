'use client';

import { PropsWithChildren } from 'react';
import { useAccount, useContractReads } from 'wagmi';
import { notFound } from 'next/navigation';
import { BaseError } from 'viem';
import AdminHeader from './admin-header';
import { HackathonProvider } from '@/contexts/HackathonProvider';
import { wagmiContractConfig } from '@/config/wagmiConfig';
import AdminAside from './admin-aside';
import Home from '../page';
import HomeMenu from '@/components/HomeComponent/HomeMenu';

export default function AdminLayout({ children }: PropsWithChildren) {
    const { address } = useAccount();

    if (!address) {
        return <div>Loading...</div>;
    }

    const { data, error, isLoading } = useContractReads({
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
    console.log({ balanceOf, hackathons });

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

    const organization = {
        id: hackathons.result[0].toString(),
        name: hackathons.result[1],
        image: '',
        cid: hackathons.result[2],
    };

    return (
        <HackathonProvider id={organization.id}>
            <AdminHeader
                organization={organization}
                isPending={isLoading}
                error={error}
            />
            {children}
            <AdminAside />
        </HackathonProvider>
    );
}
