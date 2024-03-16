'use client';

import { Svg } from '@/components/svg';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { usePathname } from 'next/navigation';

interface Props {
    className?: string;
    events: Array<{
        id: string;
        name: string;
        email: string;
        image: string;
        href: string;
    }>;
}

export default function DonationListDashboard({ events }: Props) {
    const pathname = usePathname();

    return (
        <ul
            role="list"
            className="divide-y divide-gray-100"
        >
            {events.map((organization) => {
                const initials = organization.name
                    .split(' ')
                    .map((word) => word[0])
                    .join('');

                return (
                    <li
                        key={organization.id}
                        className={cn(
                            'relative flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6 lg:px-8',
                            {
                                'bg-gray-50': pathname.includes(
                                    organization.href
                                ),
                            }
                        )}
                    >
                        <div className="flex items-center min-w-0 gap-x-4">
                            <Avatar className="h-12 w-12 flex-none rounded-full bg-gray-50">
                                <AvatarImage src={organization.image} />
                                <AvatarFallback>
                                    {initials.toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <div className="min-w-0 flex-auto">
                                <p className="text-sm font-semibold leading-6 text-gray-900">
                                    <Link href={organization.href}>
                                        <span className="absolute inset-x-0 -top-px bottom-0" />
                                        {organization.name}
                                    </Link>
                                </p>
                            </div>
                        </div>
                        <div className="flex shrink-0 items-center gap-x-4">
                            <Svg.ChevronRight
                                className="h-5 w-5 flex-none text-gray-400"
                                aria-hidden="true"
                            />
                        </div>
                    </li>
                );
            })}
        </ul>
    );
}
