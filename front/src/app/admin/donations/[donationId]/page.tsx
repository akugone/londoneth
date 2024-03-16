'use client';

import {useSubgraphEvent} from "@/hooks/useSubgraphEvent";
import {useParams} from "next/navigation";

export default function AdminSingleDonationPage() {
    const {donationId}: { donationId: string } = useParams();
    // const {data: event} = useSubgraphEvent(eventId)

    return !!donationId && (
        <>
            <main className="lg:pl-72">
                <div className="xl:pl-96">
                    <div className="flex flex-col gap-6 px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
                        <div className="lg:w-full lg:max-w-2xl lg:flex-auto flex flex-col items-start gap-10">
                            {donationId && (
                                <>
                                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Do the request to get details of donation #{donationId}</h1>
                                    <p className="text-xl leading-8 text-gray-600">Aliquet nec orci mattis amet quisque
                                        ullamcorper neque, nibh sem. At arcu, sit dui mi, nibh dui, diam eget aliquam.
                                        Quisque id at vitae feugiat egestas ac. Diam nulla orci at in viverra
                                        scelerisque eget. Eleifend egestas fringilla sapien.</p>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}
