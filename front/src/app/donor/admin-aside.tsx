'use client';

import { Svg } from '@/components/svg';
import EventsList from '@/components/events-list';
import { Button } from '@/components/ui/button';
import { useHackathon } from '@/hooks/useHackathon';
import { useSubgraphEvents } from '@/hooks/useSubgraphEvents';
import { useRouter } from 'next/navigation';
import { use, useEffect } from 'react';

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

export default function AdminAside() {
    const { hackathonId } = useHackathon();
    const { push } = useRouter();
    console.log(hackathonId);

    useEffect(() => {
        if (hackathonId == '0') {
            push('/wait');
        }
    }, [hackathonId]);

    const { data: events } = useSubgraphEvents(hackathonId);
    const eventWithAdminLink = events.map((event) => {
        return {
            ...event,
            href: `/admin/events/${event.id}`,
        };
    });

    return (
        <aside className="fixed inset-y-0 left-72 hidden w-96 overflow-y-auto border-r border-gray-200 xl:block">
            <EventsList events={eventWithAdminLink} />
        </aside>
    );
}
