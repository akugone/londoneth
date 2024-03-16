import Image from 'next/image';

function Features() {
    return (
        <section
            id="features"
            className=" relative z-10 pt-[110px]"
        >
            <div className="container">
                <div
                    className="wow fadeInUp mx-auto mb-14 max-w-[690px] text-center lg:mb-[70px]"
                    data-wow-delay=".2s"
                >
                    <h2 className="mb-4 text-3xl font-bold text-black  sm:text-4xl md:text-[44px] md:leading-tight">
                        Swagg feature to make Hackathon better
                    </h2>
                    <p className="text-base text-body">
                        Make an impact in city where you organize your hackathon
                    </p>
                </div>
            </div>

            <div className="container max-w-[1390px]">
                <div className="rounded-2xl bg-white px-5 pt-14 pb-14 shadow-md md:pb-1 lg:pt-20 lg:pb-5 xl:px-10">
                    <div className="-mx-4 flex flex-wrap">
                        <div className="w-full px-4 md:w-1/2 lg:w-1/3">
                            <div
                                className="wow fadeInUp group mx-auto mb-[60px] max-w-[310px] text-center"
                                data-wow-delay=".2s"
                            >
                                <div className="mx-auto mb-8 flex h-[90px] w-[90px] items-center justify-center rounded-3xl bg-yellow-gradient-color text-redpraha duration-300 group-hover:bg-redpraha group-hover:text-white   ">
                                    <Image
                                        src="/images/nouns/star.png"
                                        alt="feature image"
                                        width={80}
                                        height={80}
                                    />
                                </div>
                                <h3 className="mb-4 text-xl font-semibold text-black  sm:text-[22px] xl:text-[26px]">
                                    Proof Of Give
                                </h3>
                                <p className="text-base text-body">
                                    You get an NFT proof of gift with each
                                    donation you make.
                                </p>
                            </div>
                        </div>

                        <div className="w-full px-4 md:w-1/2 lg:w-1/3">
                            <div
                                className="wow fadeInUp group mx-auto mb-[60px] max-w-[310px] text-center"
                                data-wow-delay=".3s"
                            >
                                <div className="mx-auto mb-8 flex h-[90px] w-[90px] items-center justify-center rounded-3xl bg-yellow-gradient-color text-redpraha duration-300 group-hover:bg-redpraha group-hover:text-white   ">
                                    <Image
                                        src="/images/home/features/encrypt.png"
                                        alt="feature image"
                                        width={80}
                                        height={80}
                                    />
                                </div>
                                <h3 className="mb-4 text-xl font-semibold text-black  sm:text-[22px] xl:text-[26px]">
                                    Encrypted Data Sharing
                                </h3>
                                <p className="text-base text-body">
                                    Upload your data with confidence; iExec's
                                    DataProtector weaves a spell of encryption
                                    around your documents.
                                </p>
                            </div>
                        </div>

                        <div className="w-full px-4 md:w-1/2 lg:w-1/3">
                            <div
                                className="wow fadeInUp group mx-auto mb-[60px] max-w-[310px] text-center"
                                data-wow-delay=".4s"
                            >
                                <div className="mx-auto mb-8 flex h-[90px] w-[90px] items-center justify-center rounded-3xl bg-yellow-gradient-color text-redpraha duration-300 group-hover:bg-redpraha group-hover:text-white   ">
                                    <Image
                                        src="/images/home/features/pay.png"
                                        alt="feature image"
                                        width={80}
                                        height={80}
                                    />
                                </div>
                                <h3 className="mb-4 text-xl font-semibold text-black  sm:text-[22px] xl:text-[26px]">
                                    Pay-per-Wish Pricing
                                </h3>
                                <p className="text-base text-body">
                                    Unlock expert knowledge with a simple, small
                                    fee. Affordable wisdom at your command
                                </p>
                            </div>
                        </div>

                        <div className="w-full px-4 md:w-1/2 lg:w-1/3">
                            <div
                                className="wow fadeInUp group mx-auto mb-[60px] max-w-[310px] text-center"
                                data-wow-delay=".2s"
                            >
                                <div className="mx-auto mb-8 flex h-[90px] w-[90px] items-center justify-center rounded-3xl bg-yellow-gradient-color text-redpraha duration-300 group-hover:bg-redpraha group-hover:text-white ">
                                    <Image
                                        src="/images/home/features/spectrum.png"
                                        alt="feature image"
                                        width={90}
                                        height={90}
                                    />
                                </div>
                                <h3 className="mb-4 text-xl font-semibold text-black  sm:text-[22px] xl:text-[26px]">
                                    Spectrum of Expertise
                                </h3>
                                <p className="text-base text-body">
                                    Choose from a diverse ensemble of Genies,
                                    from a Legal Luminary, a Health Herald, or a
                                    Fiscal Sage, your specialized Genie is at
                                    your service.
                                </p>
                            </div>
                        </div>

                        <div className="w-full px-4 md:w-1/2 lg:w-1/3">
                            <div
                                className="wow fadeInUp group mx-auto mb-[60px] max-w-[310px] text-center"
                                data-wow-delay=".3s"
                            >
                                <div className="mx-auto mb-8 flex h-[90px] w-[90px] items-center justify-center rounded-3xl bg-yellow-gradient-color text-redpraha duration-300 group-hover:bg-redpraha group-hover:text-white   ">
                                    <Image
                                        src="/images/home/features/ring.png"
                                        alt="feature image"
                                        width={90}
                                        height={90}
                                    />
                                </div>
                                <h3 className="mb-4 text-xl font-semibold text-black  sm:text-[22px] xl:text-[26px]">
                                    Be notify
                                </h3>
                                <p className="text-base text-body">
                                    As soon as our Genies have completed their
                                    analysis, you will be notified
                                </p>
                            </div>
                        </div>

                        <div className="w-full px-4 md:w-1/2 lg:w-1/3 relative">
                            <div
                                className="wow fadeInUp group mx-auto mb-[60px] max-w-[310px] text-center"
                                data-wow-delay=".4s"
                            >
                                <div className="mx-auto mb-8 flex h-[90px] w-[90px] items-center justify-center rounded-3xl bg-yellow-gradient-color text-redpraha duration-300 group-hover:bg-redpraha group-hover:text-white   ">
                                    <Image
                                        src="/images/home/features/reputation.png"
                                        alt="feature image"
                                        width={90}
                                        height={90}
                                    />
                                </div>
                                <h3 className="mb-4 text-xl font-semibold text-black  sm:text-[22px] xl:text-[26px]">
                                    Reputation
                                </h3>
                                {/* <div className='absolute top-[-5px] right-[40px] md:right-[100px] p-2 bg-redpraha text-black text-xs rounded-md'>
                      Coming Soon
                    </div> */}
                                <p className="text-base text-body">
                                    Each Genie’s reputation is based on the
                                    quality of their analysis, ensuring the
                                    highest standards of service.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="absolute top-0 right-0 -z-10">
                <svg
                    width="602"
                    height="1154"
                    viewBox="0 0 602 1154"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <g
                        opacity="0.25"
                        filter="url(#filter0_f_26_84)"
                    >
                        <circle
                            cx="577"
                            cy="577"
                            r="317"
                            fill="url(#paint0_linear_26_84)"
                        />
                    </g>
                    <defs>
                        <filter
                            id="filter0_f_26_84"
                            x="0"
                            y="0"
                            width="1154"
                            height="1154"
                            filterUnits="userSpaceOnUse"
                            colorInterpolationFilters="sRGB"
                        >
                            <feFlood
                                floodOpacity="0"
                                result="BackgroundImageFix"
                            />
                            <feBlend
                                mode="normal"
                                in="SourceGraphic"
                                in2="BackgroundImageFix"
                                result="shape"
                            />
                            <feGaussianBlur
                                stdDeviation="130"
                                result="effect1_foregroundBlur_26_84"
                            />
                        </filter>
                        <linearGradient
                            id="paint0_linear_26_84"
                            x1="183.787"
                            y1="894"
                            x2="970.173"
                            y2="346.491"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop stopColor="#8EA5FE" />
                            <stop
                                offset="0.541667"
                                stopColor="#BEB3FD"
                            />
                            <stop
                                offset="1"
                                stopColor="#90D1FF"
                            />
                        </linearGradient>
                    </defs>
                </svg>
            </div>
            <div className="absolute left-0 -bottom-1/2 -z-10 hidden md:block">
                <svg
                    width="622"
                    height="1236"
                    viewBox="0 0 622 1236"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <g
                        opacity="0.2"
                        filter="url(#filter0_f_26_85)"
                    >
                        <circle
                            cx="4"
                            cy="618"
                            r="368"
                            fill="url(#paint0_linear_26_85)"
                        />
                    </g>
                    <defs>
                        <filter
                            id="filter0_f_26_85"
                            x="-614"
                            y="0"
                            width="1236"
                            height="1236"
                            filterUnits="userSpaceOnUse"
                            colorInterpolationFilters="sRGB"
                        >
                            <feFlood
                                floodOpacity="0"
                                result="BackgroundImageFix"
                            />
                            <feBlend
                                mode="normal"
                                in="SourceGraphic"
                                in2="BackgroundImageFix"
                                result="shape"
                            />
                            <feGaussianBlur
                                stdDeviation="125"
                                result="effect1_foregroundBlur_26_85"
                            />
                        </filter>
                        <linearGradient
                            id="paint0_linear_26_85"
                            x1="-364"
                            y1="250"
                            x2="506.12"
                            y2="754.835"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop stopColor="#FF8FE8" />
                            <stop
                                offset="1"
                                stopColor="#FFC960"
                            />
                        </linearGradient>
                    </defs>
                </svg>
            </div>
        </section>
    );
}

export default Features;
