import Tiger from '../Svg/Tiger';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

function Donator() {
    return (
        <div className="ml-5 flex flex-col items-center gap-2 text-center">
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
                Make your first donation to a charity
            </p>
            <Link
                className="block my-4 bg-primary text-primary-foreground shadow hover:bg-primary/90 rounded-md px-10  py-3 text-md"
                target="_blank"
                href="/donor/dashboard"
            >
                Get Started
            </Link>
        </div>
    );
}

export default Donator;
