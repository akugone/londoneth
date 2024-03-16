import Image from 'next/image';
import { Event } from '@/types/event';

interface Props {
    event: Event;
    className?: string;
}

export const EventImage = ({ event, className }: Props) => {
    const images = [
        'marseille.jpg',
        'newyork.jpg',
        'paris.jpg',
        'london.png',
        'istambul.png',
        'budapest.jpg',
        'denver.jpg',
        'nantes.jpg',
        'bangkok.jpg',
        'sydney.jpg',
        'boston.jpg',
        'tokyo.jpg',
        'berlin.jpg',
        'seattle.jpg',
        'dublin.jpg',
    ];

    // Select a random image from the list
    let image = images[Math.floor(Math.random() * images.length)];

    // Overwrite image if specific city is found in the event name
    if (event.name.toLowerCase().includes('istambul')) {
        image = 'istambul.png';
    }

    if (event.name.toLowerCase().includes('london')) {
        image = 'london.png';
    }

    if (event.name.toLowerCase().includes('istambul')) {
        image = 'istambul.png';
    }

    if (event.name.toLowerCase().includes('london')) {
        image = 'london.png';
    }

    return (
        <Image
            className={className}
            src={`/images/${image}`}
            alt={event.name}
            width={500}
            height={500}
        />
    );
};
