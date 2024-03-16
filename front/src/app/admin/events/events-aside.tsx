'use client';

import { Svg } from '@/components/svg';
import EventsList from '@/components/events-list';
import { Button } from '@/components/ui/button';
import { useHackathon } from '@/hooks/useHackathon';
import { useSubgraphEvents } from '@/hooks/useSubgraphEvents';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface Event {
    id: string;
    name: string;
    email: string;
    image: string;
}

interface Props {
    organization: {
        id: string;
    }
}

export default function EventsAside() {
    const { hackathonId } = useHackathon();
    const { push } = useRouter();

    useEffect(() => {
        if (hackathonId == '0') {
            push('/wait');
        }
    }, [hackathonId]);

    const { data: events, loading } = useSubgraphEvents(hackathonId);
    const eventWithAdminLink = events.map((event: Event) => {
        return {
            ...event,
            href: `/admin/events/${event.id}`,
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
                eventWithAdminLink.length > 0 && (
                    <>
                        <div className="sticky top-0 z-10 border-y border-b-gray-200 border-t-gray-100 bg-gray-50 px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900">
                            <h3>{eventWithAdminLink.length} events</h3>
                        </div>
                        <EventsList events={eventWithAdminLink} />
                    </>
                )
            }
            <Button
                variant="link"
                className="rounded-none w-full flex items-center gap-2 justify-center"
                size="lg"
            >
                <Svg.Plus
                    className="h-5 w-5 flex-none"
                    aria-hidden="true"
                />
                Create new event
            </Button>
        </aside>
    );
}
