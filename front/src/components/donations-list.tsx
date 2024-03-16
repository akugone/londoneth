'use client';

import { Svg } from '@/components/svg';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {usePathname} from "next/navigation";

interface Props {
    className?: string;
    donations: Array<{
        id: string;
        userAddress: string;
        href: string;
    }>;
}

export default function DonationsList({donations}: Props) {
    const pathname = usePathname();

    return (
        <ul role="list" className="divide-y divide-gray-100">
            {donations.map((donation) => {

                return (
                    <li
                        key={donation.id}
                        className={
                            cn("relative flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6 lg:px-8",
                                {
                                    "bg-gray-50": pathname.includes(donation.href)
                                }
                            )
                        }
                    >
                        <div className="flex items-center min-w-0 gap-x-4">
                            <div className="min-w-0 flex-auto">
                                <p className="text-sm font-semibold leading-6 text-gray-900">
                                    <Link href={donation.href}>
                                        <span className="absolute inset-x-0 -top-px bottom-0" />
                                        {donation.userAddress}
                                    </Link>
                                </p>
                            </div>
                        </div>
                        <div className="flex shrink-0 items-center gap-x-4">
                            <Svg.ChevronRight className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
                        </div>
                    </li>
                )
            })}
        </ul>
    )
}
