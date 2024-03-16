'use client';

import React, { useState } from 'react';
import { useSubgraphEvents } from '@/hooks/useSubgraphEvents';
import { EventCard } from '@/components/event-card';

interface Props {
    className?: string;
}

export const EventsGrid = ({ className }: Props) => {
    const { data } = useSubgraphEvents();

    // State to keep track of how many items to display
    const [displayCount, setDisplayCount] = useState(6);

    // Function to handle showing more events
    const showMoreEvents = () => {
        setDisplayCount((prevCount) => prevCount + 6);
    };

    // Slice the data to only include the number of items we want to display
    const displayedEvents = data?.slice(0, displayCount);

    return (
        <>
            <div
                className={`${className} px-10 grid grid-cols-6 lg:grid-cols-6 gap-8`}
            >
                {displayedEvents?.map((event: any) => (
                    <EventCard
                        key={event.id}
                        event={event}
                        variant="square"
                    />
                ))}
            </div>
            {data && displayCount < data.length && (
                <div className="flex justify-center mt-4">
                    <button
                        onClick={showMoreEvents}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
                    >
                        Show More
                    </button>
                </div>
            )}
        </>
    );
};
