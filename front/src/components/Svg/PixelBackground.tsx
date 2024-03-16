function PixelBackground() {
    return (
        <svg
            className="absolute h-full w-full object-cover top-0 left-0 z-[-1] text-gray-100 scale-[3.18]"
            width="80"
            height="80"
            viewBox="0 0 80 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M20 0H10V10H20V0Z"
                fill="currentColor"
            />
            <path
                d="M40 20H20V30H40V20Z"
                fill="currentColor"
            />
            <path
                d="M10 30H0V40H10V30Z"
                fill="currentColor"
            />
            <path
                d="M40 30H20V40H40V30Z"
                fill="currentColor"
            />
            <path
                d="M70 40H50V50H70V40Z"
                fill="currentColor"
            />
            <path
                d="M80 50H40V60H80V50Z"
                fill="currentColor"
            />
            <path
                d="M30 60H20V70H30V60Z"
                fill="currentColor"
            />
            <path
                d="M80 60H40V70H80V60Z"
                fill="currentColor"
            />
            <path
                d="M70 70H50V80H70V70Z"
                fill="currentColor"
            />
        </svg>
    );
}

export default PixelBackground;
