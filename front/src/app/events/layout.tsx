import Logo from "@/components/logo";
import Link from "next/link";
import {PropsWithChildren} from "react";
import {WagmiConnect} from "@/components/wagmi-connect";

export default function RootLayout({children}: PropsWithChildren) {
    return (
        <main className="flex min-h-full flex-col">
            <header className="shrink-0 border-b border-gray-200 bg-white">
                <div className="mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-12">
                    <Link href="/" className=" p-1.5">
                        <Logo className="h-6 w-auto"/>
                    </Link>
                    <div className="flex items-center gap-x-8">
                        <WagmiConnect/>
                        <a href="#" className=" p-1.5">
                            <span className="sr-only">Your profile</span>
                            <img
                                className="h-8 w-8 rounded-full bg-gray-800"
                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt=""
                            />
                        </a>
                    </div>
                </div>
            </header>
            {children}
        </main>
    );
}
