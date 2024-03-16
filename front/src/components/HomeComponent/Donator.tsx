import Tiger from '../Svg/Tiger';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

function Donator() {
    return (
        <div className="flex flex-col items-center gap-2 text-center">
            <Image
                src="/images/nouns/heart.png"
                width={100}
                height={100}
                alt="hero"
            />
            <h1 className="text-2xl font-semibold tracking-tight">
                Are you an Donator?
            </h1>
            <p className="text-sm text-muted-foreground">
                Create your first event to collect donation to charities
            </p>
            <Button
                size="lg"
                className="block my-4"
                href="/organizer"
            >
                Get Started
            </Button>
        </div>
    );
}

export default Donator;
