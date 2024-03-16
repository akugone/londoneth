import { useAccount, useContractRead, useContractReads } from 'wagmi';
import { abi } from '@/abis/HackathonID';
import { BaseError } from 'viem';
import React, { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Svg } from '@/components/svg';
import Logo from '@/components/logo';
import { cn } from '@/lib/utils';
import { formatAddress } from '@/lib/address';
import { usePathname } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { wagmiContractConfig } from '@/config/wagmiConfig';
import { useHackathon } from '@/hooks/useHackathon';
import Image from 'next/image';
import YellowSun from '@/components/Svg/YellowSun';
import Tiger from '@/components/Svg/Tiger';

const navigation = [
    {
        name: 'Your Donations',
        href: '/admin/donations',
        icon: Svg.Coin,
        current: false,
    },
];
const teams = [
    { id: 1, name: 'Heroicons', href: '#', initial: 'H', current: false },
    { id: 2, name: 'Tailwind Labs', href: '#', initial: 'T', current: false },
    { id: 3, name: 'Workcation', href: '#', initial: 'W', current: false },
];

interface Props {
    isPending: boolean;
    error: any;
    organization: {
        name: string;
        image: string;
    };
}

export default function AdminHeader({ isPending, error, organization }: Props) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const pathname = usePathname();
    const { address } = useAccount();
    const { hackathonId } = useHackathon();

    if (!address) {
        return <div>Loading...</div>;
    }

    const { data, isLoading } = useContractReads({
        contracts: [
            {
                ...wagmiContractConfig,
                functionName: 'tokenURI',
                args: [hackathonId],
            },
        ],
    });

    const tokenURI = data[0].result;
    const base64String = tokenURI.split(',')[1];
    const jsonString = atob(base64String);
    const tokenData = JSON.parse(jsonString);

    console.log('tokenData', tokenData.image);

    if (error) {
        return (
            <main className="lg:pl-72">
                <div className="p-12">
                    {error instanceof BaseError
                        ? error.message
                        : 'An error occurred'}
                </div>
            </main>
        );
    }

    return (
        <header>
            <Transition.Root
                show={sidebarOpen}
                as={Fragment}
            >
                <Dialog
                    as="div"
                    className="relative z-50 lg:hidden"
                    onClose={setSidebarOpen}
                >
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-900/80" />
                    </Transition.Child>

                    <div className="fixed inset-0 flex">
                        <Transition.Child
                            as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full"
                        >
                            <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-in-out duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="ease-in-out duration-300"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                                        <button
                                            type="button"
                                            className="-m-2.5 p-2.5"
                                            onClick={() =>
                                                setSidebarOpen(false)
                                            }
                                        >
                                            <span className="sr-only">
                                                Close sidebar
                                            </span>
                                            <Svg.X
                                                className="h-6 w-6 text-white"
                                                aria-hidden="true"
                                            />
                                        </button>
                                    </div>
                                </Transition.Child>
                                {/* Sidebar component, swap this element with another sidebar if you like */}
                                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-2">
                                    <div className="flex h-16 shrink-0 items-center">
                                        <Link
                                            href="/"
                                            className=" p-1.5"
                                        >
                                            <Logo className="h-6 w-auto" />
                                        </Link>
                                    </div>
                                    {isPending && (
                                        <div className="flex items-center gap-x-2 text-sm font-semibold leading-6 text-gray-400">
                                            <Svg.Refresh
                                                className="h-5 w-5 animate-spin"
                                                aria-hidden="true"
                                            />
                                            Loading...
                                        </div>
                                    )}
                                    {organization && (
                                        <Avatar className="h-12 w-12 flex-none rounded-full bg-gray-50">
                                            <AvatarImage
                                                src={organization.image}
                                            />
                                            <AvatarFallback>
                                                {organization.name
                                                    .split(' ')
                                                    .map((word) => word[0])
                                                    .join('')
                                                    .toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>
                                    )}
                                    <nav className="flex flex-1 flex-col">
                                        <ul
                                            role="list"
                                            className="flex flex-1 flex-col gap-y-7"
                                        >
                                            <li>
                                                <ul
                                                    role="list"
                                                    className="-mx-2 space-y-1"
                                                >
                                                    {navigation.map((item) => (
                                                        <li key={item.name}>
                                                            <a
                                                                href={item.href}
                                                                className={cn(
                                                                    pathname.includes(
                                                                        item.href
                                                                    )
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
                                            </li>
                                            <li>
                                                <div className="text-xs font-semibold leading-6 text-gray-400">
                                                    Your teams
                                                </div>
                                                <ul
                                                    role="list"
                                                    className="-mx-2 mt-2 space-y-1"
                                                >
                                                    {organization && (
                                                        <li>
                                                            <span
                                                                className={cn(
                                                                    true
                                                                        ? 'bg-gray-50 text-primary'
                                                                        : 'text-gray-700 hover:text-primary hover:bg-gray-50',
                                                                    'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                                                )}
                                                            >
                                                                <span
                                                                    className={cn(
                                                                        true
                                                                            ? 'text-primary border-indigo-600'
                                                                            : 'text-gray-400 border-gray-200 group-hover:border-indigo-600 group-hover:text-primary',
                                                                        'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white'
                                                                    )}
                                                                >
                                                                    {organization.name
                                                                        .split(
                                                                            ' '
                                                                        )
                                                                        .map(
                                                                            (
                                                                                word
                                                                            ) =>
                                                                                word[0]
                                                                        )
                                                                        .join(
                                                                            ''
                                                                        )
                                                                        .toUpperCase()}
                                                                </span>
                                                                <span className="truncate">
                                                                    {
                                                                        organization.name
                                                                    }
                                                                </span>
                                                            </span>
                                                        </li>
                                                    )}
                                                </ul>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>

            {/* Static sidebar for desktop */}
            <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
                {/* Sidebar component, swap this element with another sidebar if you like */}
                <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
                    <div className="flex h-16 shrink-0 items-center">
                        <Link
                            href="/"
                            className=" p-1.5"
                        >
                            <Logo className="h-6 w-auto" />
                        </Link>
                    </div>
                    {isPending && (
                        <div className="flex items-center gap-x-2 text-sm font-semibold leading-6 text-gray-400">
                            <Svg.Refresh
                                className="h-5 w-5 animate-spin"
                                aria-hidden="true"
                            />
                            Loading...
                        </div>
                    )}
                    <nav className="flex flex-1 flex-col">
                        <ul
                            role="list"
                            className="flex flex-1 flex-col gap-y-7"
                        >
                            <li>
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
                            </li>

                            <li>
                                <div className="text-xl mb-4 font-semibold leading-6 text-gray-400">
                                    You have made 3 Donations
                                </div>
                                <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI3MjAiIGhlaWdodD0iNzIwIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIi8+PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNTAiIGhlaWdodD0iMTUwIiB2ZXJzaW9uPSIxLjIiIHZpZXdCb3g9Ii0yMDAgLTUwIDEwMDAgMTAwMCI+PHBhdGggZmlsbD0iI0ZGRkZGRiIgZD0iTTI2NC41IDE5MC41YzAtMTMuOCAxMS4yLTI1IDI1LTI1SDU2OGMxMy44IDAgMjUgMTEuMiAyNSAyNXY0OTBjMCAxMy44LTExLjIgMjUtMjUgMjVIMjg5LjVjLTEzLjggMC0yNS0xMS4yLTI1LTI1eiIvPjxwYXRoIGZpbGw9IiNGRkZGRkYiIGQ9Ik0yNjUgNjI0YzAtMTMuOCAxMS4yLTI1IDI1LTI1aDU0M2MxMy44IDAgMjUgMTEuMiAyNSAyNXY1Ni41YzAgMTMuOC0xMS4yIDI1LTI1IDI1SDI5MGMtMTMuOCAwLTI1LTExLjItMjUtMjV6Ii8+PHBhdGggZmlsbD0iI0ZGRkZGRiIgZD0iTTAgMTkwLjVjMC0xMy44IDExLjItMjUgMjUtMjVoNTQzYzEzLjggMCAyNSAxMS4yIDI1IDI1VjI0N2MwIDEzLjgtMTEuMiAyNS0yNSAyNUgyNWMtMTMuOCAwLTI1LTExLjItMjUtMjV6Ii8+PC9zdmc+PHRleHQgeD0iMzAiIHk9IjY3MCIgc3R5bGU9ImZvbnQ6IDYwcHggc2Fucy1zZXJpZjtmaWxsOiNmZmYiPmV0aGdsb2JhbC5mdW5kPC90ZXh0Pjwvc3ZnPg==" />
                            </li>
                            <li>
                                <div className="text-xl mb-4 font-semibold leading-6 text-gray-400">
                                    You have 6.8 PoG Token to claim
                                </div>
                                <Link
                                    className="block my-4 bg-primary text-primary-foreground shadow hover:bg-primary/90 rounded-md px-10  py-3 text-md"
                                    target="_blank"
                                    href="/admin/events"
                                >
                                    Claim my token
                                </Link>
                            </li>
                            <li>
                                <Tiger />
                            </li>
                            {!!address && (
                                <li className="-mx-6 mt-auto">
                                    <a
                                        href="#"
                                        className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-50"
                                    >
                                        <img
                                            className="h-8 w-8 rounded-full bg-gray-50"
                                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                            alt=""
                                        />
                                        <span className="sr-only">
                                            Your profile
                                        </span>
                                        <span aria-hidden="true">
                                            {formatAddress(address)}
                                        </span>
                                    </a>
                                </li>
                            )}
                        </ul>
                    </nav>
                </div>
            </div>

            <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-white px-4 py-4 shadow-sm sm:px-6 lg:hidden">
                <button
                    type="button"
                    className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
                    onClick={() => setSidebarOpen(true)}
                >
                    <span className="sr-only">Open sidebar</span>
                    <Svg.Menu
                        className="h-6 w-6"
                        aria-hidden="true"
                    />
                </button>
                <div className="flex-1 text-sm font-semibold leading-6 text-gray-900">
                    Dashboard
                </div>
                <a href="#">
                    <span className="sr-only">Your profile</span>
                    <img
                        className="h-8 w-8 rounded-full bg-gray-50"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                    />
                </a>
            </div>
        </header>
    );
}
