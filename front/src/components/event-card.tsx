import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { EventImage } from '@/components/event-image';
import { Event } from '@/types/event';
import { cn } from '@/lib/utils';

interface Props {
    event: Event;
    variant: 'default' | 'square';
}

export const EventCard = ({ event, variant = 'default' }: Props) => {
    //
    const classes = cn(
        'relative isolate flex flex-col gap-3 justify-end overflow-hidden rounded-2xl bg-gray-900 px-8',
        {
            'pb-8 pt-80 sm:pt-48 lg:pt-80': variant === 'default',
            'h-0 w-full pb-[100%] aspect-square': variant === 'square',
        }
    );

    const textClasses = cn({
        'p-8': variant === 'default',
        'p-4 absolute inset-0 flex flex-col items-start justify-end':
            variant === 'square',
    });

    const titleClasses = cn('font-semibold leading-6 text-white', {
        'text-lg': variant === 'default',
        'text-md': variant === 'square',
    });

    const images = [
        'unicef.svg',
        'keep.jpg',
        'rpca.jpg',
        'cancer.jpg',
        'unicef.svg',
        'keep.jpg',
        'rpca.jpg',
        'cancer.jpg',
        'marie.jpg',
        'john.jpg',
        'wwf.jpg',
        'dog.jpg',
        'heart.jpg',
        'macmillan.jpg',
        'boats.jpg',
        'redcross.jpg',
        'alzamer.jpg',
    ];

    // Select a random image from the list
    let image = images[Math.floor(Math.random() * images.length)];

    return (
        <>
            <article className={classes}>
                <EventImage
                    className="-z-10 absolute inset-0 h-full w-full object-cover"
                    event={event}
                />
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40" />
                <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                <figure className="absolute border border-gray-200 inline-flex items-center justify-center p-2 top-4 left-4 w-16 h-16 overflow-hidden rounded-full bg-white">
                    <Image
                        className="block"
                        src={`/logos/${image}`}
                        alt={event.name}
                        width={500}
                        height={281}
                    />
                </figure>

                <div className={textClasses}>
                    <div className="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
                        <time
                            dateTime
                            className="mr-8"
                        >
                            12/11/2021
                        </time>
                    </div>

                    <h2 className={titleClasses}>
                        <Link href={`/events/${event.id}`}>
                            <span className="absolute inset-0" />
                            {event.name}
                        </Link>
                    </h2>
                </div>
            </article>
        </>
    );
};
