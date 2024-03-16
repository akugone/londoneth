import Image from 'next/image';
import { WagmiConnect } from '@/components/wagmi-connect';
import Logo from '@/components/logo';
import { Button } from '@/components/ui/button';
import { EventsGrid } from '@/components/events-grid';
import HomeMenu from '@/components/HomeComponent/HomeMenu';
import Hero from '@/components/HomeComponent/Hero';
import Tiger from '@/components/Svg/Tiger';
import Organizer from '@/components/HomeComponent/Organizer';
import Donator from '@/components/HomeComponent/Donator';
import YellowSun from '@/components/Svg/YellowSun';
import MainTitle from '@/components/HomeComponent/MainTitle';
import { IconBackground } from '@tabler/icons-react';
import PixelBackground from '@/components/Svg/PixelBackground';
import Features from '@/components/HomeComponent/Features';
import Partners from '@/components/HomeComponent/Partner';
import TextPics from '@/components/HomeComponent/TextPics';
import Footers from '@/components/HomeComponent/Footers';
// import { DynamicWidget } from '@dynamic-labs/sdk-react-core';

export default function Home() {
    return (
        <>
            <main>
                <HomeMenu />
                <Hero />
                <div className="flex justify-center items-center gap-10 mt-10 p-10">
                    <PixelBackground />
                    <Organizer />
                    <Donator />
                </div>
                <MainTitle />
                <EventsGrid />
                <Features />
                <TextPics />
                <Partners />
                <Footers />
            </main>
        </>
    );
}
