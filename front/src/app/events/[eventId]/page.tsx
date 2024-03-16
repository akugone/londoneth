'use client';

import { useParams } from 'next/navigation';
import { useSubgraphEvent } from '@/hooks/useSubgraphEvent';
import { EventImage } from '@/components/event-image';
import DonationForm from '@/components/Form/donationForm';
import Image from 'next/image';
import WorldCoinLogin from '@/components/Worldcoin/WorldCoinLogin';
import { DonationGrid } from '@/components/donations-grid';

const activityItems = [
    {
        user: {
            name: 'Polygon',
            imageUrl:
                'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        projectName: 'Gave 3 hoodies and 10 socks',
        commit: '2d89f0c8sds',
        branch: 'main',
        date: '1h',
        dateTime: '2023-01-23T11:00',
    },
    {
        user: {
            name: 'ENS',
            imageUrl:
                'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        projectName: 'Gave 10 tshirt and 5 pants',
        commit: '249df660csq',
        branch: 'main',
        date: '3h',
        dateTime: '2023-01-23T09:00',
    },
    {
        user: {
            name: 'IPC',
            imageUrl:
                'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        projectName: 'gave 3 hoodies and 10 socks',
        commit: '11464223cqqq',
        branch: 'main',
        date: '12h',
        dateTime: '2023-01-23T00:00',
    },
    {
        user: {
            name: 'Chiliz',
            imageUrl:
                'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        projectName: 'Gave 5 tshirt',
        commit: 'dad28e95gghgs',
        branch: 'main',
        date: '2d',
        dateTime: '2023-01-21T13:00',
    },
    {
        user: {
            name: 'Worldcoin',
            imageUrl:
                'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        projectName: 'gave 5 tshirt',
        commit: '624bc9',
        branch: 'main',
        date: '5d',
        dateTime: '2023-01-18T12:34',
    },
    {
        user: {
            name: 'Nouns',
            imageUrl:
                'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        projectName: 'gave 30 socks',
        commit: 'sdlkjlsk',
        branch: 'main',
        date: '5d',
        dateTime: '2023-01-18T12:34',
    },
];

export default function EventPage() {
    const { eventId }: { eventId: string } = useParams();
    const { data: event } = useSubgraphEvent(eventId);

    return (
        event && (
            <div className="mx-auto flex w-full items-start gap-x-8">
                <aside className="z-[-1] sticky top-0 w-1/3 h-screen left-0 shrink-0 xl:block">
                    <EventImage
                        className="absolute inset-0 w-full h-full object-cover"
                        event={event}
                    />
                </aside>

                <main className="sticky top-8 flex-1 shrink-0 xl:block px-8 py-12">
                    <Image
                        src="/images/nouns/diamond.png"
                        width={100}
                        height={100}
                        alt="hero"
                    />
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Organizer : {event.name}
                    </h2>

                    <div className="mt-6 flex flex-col gap-x-8 gap-y-20 lg:flex-row">
                        <div className="lg:w-full lg:max-w-2xl lg:flex-auto flex flex-col items-start gap-10">
                            <p className="text-xl leading-8 text-gray-600">
                                <span className="font-medium">
                                    Description :{' '}
                                </span>
                                Aliquet nec orci mattis amet quisque ullamcorper
                                neque, nibh sem. At arcu, sit dui mi, nibh dui,
                                diam eget aliquam. Quisque id at vitae feugiat
                            </p>
                            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                                Charity :{' '}
                                <span className="text-medium">UNICEF</span>
                            </h2>
                            <p className="max-w-xl text-base leading-7 text-gray-700">
                                Faucibus commodo massa rhoncus, volutpat.
                                Dignissim sed eget risus enim. Mattis mauris
                                semper sed amet vitae sed turpis id. Id dolor
                            </p>
                        </div>
                    </div>
                    <DonationForm />
                </main>

                <aside className="w-96 mr-12 flex flex-col gap-4 py-12">
                    <h2 className="mx-4 flex-none text-xs text-gray-500">
                        Donations
                    </h2>
                    <DonationGrid
                        items={activityItems}
                        className="border border-gray-100 rounded-xl"
                    />
                </aside>
            </div>
        )
    );
}
