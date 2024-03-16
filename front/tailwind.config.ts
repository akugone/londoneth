import type { Config } from 'tailwindcss';

const colors = require('tailwindcss/colors');

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
            colors: {
                ...colors,
                midnight: '#ffffff',
                endnight: '#5D3FD3',
                redpraha: '#FFCF96',
                yellowpraha: '#F6FDC3',
                bluepraha: '#FF8080',
                electricblue: '#3137fd',
            },
        },
    },
    plugins: [],
};
export default config;
