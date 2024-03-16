'use client';

import { CreateEventForm } from '@/components/create-event-form';

export default function AdminEventsPage() {
    return (
        <>
            <main className="lg:pl-72">
                <div className="xl:pl-96">
                    <div className="flex flex-col gap-6 px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
                        <div className="lg:w-full lg:max-w-2xl lg:flex-auto flex flex-col items-start gap-10">
                            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                                Create new event
                            </h1>
                            <p className="text-xl leading-8 text-gray-600">
                                Here you can create some new event then attached
                                a Charity to this event
                            </p>
                            <CreateEventForm />
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
