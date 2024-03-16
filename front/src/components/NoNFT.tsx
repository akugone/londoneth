import Image from 'next/image';
import Logo from './logo';

import YellowSun from '../components/Svg/YellowSun';

function NoNFT() {
    return (
        <section
            id="home"
            className="bg-primary pt-10 pb-10 lg:pt-16 lg:pb-16 min-h-screen"
        >
            <div className="container lg:max-w-[1305px] lg:px-10 ">
                <div className="-mx-4 ">
                    <div className="w-full px-4 flex flex-col items-center justify-center">
                        <Image
                            src="/images/nouns/hat.png"
                            width={100}
                            height={100}
                            alt="hero"
                        />
                        <h1 className="mb-6 text-3xl font-bold  text-center leading-tight text-black sm:text-[40px] md:text-[50px] lg:text-[42px] xl:text-[50px]">
                            <span className="bg-yellow-gradient-color bg-clip-text  mx-2">
                                Ohhhh go you don&apos;t have your Organizer NFT
                            </span>{' '}
                        </h1>
                        <p className="text-3xl mb-10 max-w-[475px] leading-relaxed text-body">
                            Please contact us at hello@swaggi.org
                        </p>
                        <p className="text-3xl text-center mb-10 max-w-[475px] leading-relaxed text-body">
                            We will mint your organizer NFT after a small due
                            diligence
                        </p>

                        <div className="flex justify-between">
                            <YellowSun />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default NoNFT;
