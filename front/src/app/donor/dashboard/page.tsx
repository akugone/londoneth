'use client';

import { CreateEventForm } from '@/components/create-event-form';
import Link from 'next/link';

export default function AdminEventsPage() {
    return (
        <>
            <main className="lg:pl-72">
                <div className="xl:pl-96">
                    <div className="flex flex-col gap-6 px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
                        <div className="lg:w-full lg:max-w-2xl lg:flex-auto flex flex-col items-start gap-10">
                            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                                Publish my profile page
                            </h1>
                            <p className="text-xl leading-8 text-gray-600">
                                Here you can build and share your profile page
                                on the web
                            </p>
                            <Link
                                className="block my-4 bg-primary text-primary-foreground shadow hover:bg-primary/90 rounded-md px-10  py-3 text-md"
                                target="_blank"
                                href="/admin/events"
                            >
                                Share my page
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
