import Image from 'next/image';

function TextPics() {
    return (
        <section
            id="about"
            className="relative pt-[100px] pb-[50px] "
        >
            <div className="container lg:max-w-[1120px]">
                <div>
                    <div className="-mx-4 flex flex-wrap items-center justify-between">
                        <div className="w-full px-4 lg:w-1/2">
                            <div
                                className="wow fadeInUp relative z-10 mx-auto mb-14 w-full max-w-[470px] pb-6 lg:mx-0 lg:mb-0"
                                data-wow-delay=".2s"
                            >
                                <img
                                    src="https://pbs.twimg.com/media/GIvXMdmWoAAoBrZ?format=jpg&name=large"
                                    alt="about image"
                                    className="mx-auto max-w-full"
                                />

                                <div className="absolute top-0 right-5 -z-10">
                                    <svg
                                        width="72"
                                        height="50"
                                        viewBox="0 0 72 50"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <g clipPath="url(#clip0_33_10)">
                                            <path
                                                d="M21.8126 0.216481C21.8159 0.143661 21.8196 0.071493 21.8237 0C21.8203 0.0723874 21.8165 0.144547 21.8126 0.216481C21.4747 7.63863 25.1425 21.8522 42.5976 21.0032C35.4678 21.503 21.3391 26.5685 21.822 42.8298C21.6005 35.7375 17.0094 21.7229 0.441399 21.645C0.291298 21.6473 0.144104 21.6477 0 21.6462C0.148069 21.6447 0.2952 21.6443 0.441399 21.645C7.47462 21.5363 20.8883 17.1617 21.8126 0.216481Z"
                                                fill="#ff0050"
                                            />
                                            <path
                                                d="M58.7832 24.2896C58.7851 24.2459 58.7874 24.2025 58.7898 24.1597C58.7878 24.2031 58.7855 24.2464 58.7832 24.2896C58.5804 28.7428 60.7811 37.271 71.2541 36.7616C66.9763 37.0614 58.499 40.1008 58.7888 49.8576C58.6559 45.6022 55.9013 37.1934 45.9605 37.1467C45.8704 37.1481 45.782 37.1482 45.6956 37.1474C45.7844 37.1465 45.8727 37.1462 45.9605 37.1467C50.1803 37.0815 58.2286 34.4567 58.7832 24.2896Z"
                                                fill="#1e293b"
                                            />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_33_10">
                                                <rect
                                                    width="71.2541"
                                                    height="49.8779"
                                                    fill="white"
                                                />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="w-full px-4 lg:w-1/2">
                            <div
                                className="wow fadeInUp lg:ml-auto lg:max-w-[510px]"
                                data-wow-delay=".3s"
                            >
                                <span className="mb-4 block text-lg font-medium text-redpraha md:text-[22px]">
                                Swaggi Team
                                </span>
                                <h2 className="mb-4 text-3xl font-bold text-black  sm:text-4xl md:text-[44px] md:leading-tight">
                                    Crafting futur
                                </h2>
                                <p className="mb-[30px] text-base leading-relaxed text-body">
                                The team behind Swaggi is a passionate crew, dedicated to going the extra mile for a project that promises to enrich the ecosystem. United by a shared vision of sustainability and generosity, they&apos;re all in, committed to making a tangible difference by connecting surplus swag with meaningful causes.
                                </p>

                                <div className="mb-[30px] flex items-center">
                                    <div className="shrink-0 mr-3 flex h-[60px] w-[60px] items-center justify-center rounded-full border border-stroke text-xl font-semibold text-black text-center ">
                                        01
                                    </div>
                                    <div>
                                        <h5 className="text-xl font-medium text-black ">
                                            Martin
                                        </h5>
                                        <p className="text-base text-body">
                                        Imagine Martin, the swag wizard behind Swaggi, who looked at a pile of leftover hackathon merch and saw not clutter, but opportunity. With a vision as bold as his code, he&apos;s on a mission to funnel forgotten hoodies and tees from tech closets to charitable causes, one T-shirt cannon at a time.

                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    <div className="shrink-0 mr-3 flex h-[60px] w-[60px] items-center justify-center rounded-full border border-stroke text-xl font-semibold text-black  ">
                                        02
                                    </div>
                                    <div>
                                        <h5 className="text-xl font-medium text-black ">
                                            Tom
                                        </h5>
                                        <p className="text-base text-body">
                                        Tom is the steadfast co-pilot of Swaggi, skillfully backing Martin to turn the dream of redistributing hackathon swag into reality. He&apos;s the quiet force ensuring the project&apos;s smooth sailing.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="absolute right-0 top-36 -z-10">
                <svg
                    width="95"
                    height="190"
                    viewBox="0 0 95 190"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <circle
                        cx="95"
                        cy="95"
                        r="77"
                        stroke="url(#paint0_linear_47_27)"
                        strokeWidth="36"
                    />
                    <defs>
                        <linearGradient
                            id="paint0_linear_47_27"
                            x1="0"
                            y1="0"
                            x2="224.623"
                            y2="130.324"
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

export default TextPics;
