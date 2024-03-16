import { EventsGrid } from '@/components/events-grid';
import HomeMenu from '@/components/HomeComponent/HomeMenu';
import Hero from '@/components/HomeComponent/Hero';
import Organizer from '@/components/HomeComponent/Organizer';
import Donator from '@/components/HomeComponent/Donator';
import MainTitle from '@/components/HomeComponent/MainTitle';
import PixelBackground from '@/components/Svg/PixelBackground';
import Features from '@/components/HomeComponent/Features';
import Partners from '@/components/HomeComponent/Partner';
import TextPics from '@/components/HomeComponent/TextPics';
import Footers from '@/components/HomeComponent/Footers';

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
