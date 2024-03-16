'use client';

import {cn} from "@/lib/utils";
import React from "react";
import {Svg} from "@/components/svg";
import {usePathname} from "next/navigation";

const navigation = [
    {
        name: 'Events',
        href: '/admin/events',
        icon: Svg.Calendar,
        current: false,
    },
    {
        name: 'Donations',
        href: '/admin/donations',
        icon: Svg.Coin,
        current: false,
    },
];

export default function AdminMenu() {
    const pathname = usePathname();

    return (
        <ul
            role="list"
            className="-mx-2 space-y-1"
        >
            {navigation.map((item) => (
                <li key={item.name}>
                    <a
                        href={item.href}
                        className={cn(
                            pathname.includes(item.href)
                                ? 'bg-gray-50 text-primary'
                                : 'text-gray-700 hover:text-primary hover:bg-gray-50',
                            'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                        )}
                    >
                        <item.icon
                            className={cn(
                                pathname.includes(
                                    item.href
                                )
                                    ? 'text-primary'
                                    : 'text-gray-400 group-hover:text-primary',
                                'h-6 w-6 shrink-0'
                            )}
                            aria-hidden="true"
                        />
                        {item.name}
                    </a>
                </li>
            ))}
        </ul>
    )
}
