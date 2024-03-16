"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Svg } from "./svg"
import { wagmiContractConfig } from "@/config/wagmiConfig"
import { useHackathon } from "@/hooks/useHackathon"
import { useContractWrite, useWaitForTransaction } from 'wagmi';
import ModalCreatedEvent from "@/components/modal-created-event";
import { useState} from "react";
import {Address} from "@/types/address";

const formSchema = z.object({
    title: z.string().min(2, {
        message: "Title must be at least 2 characters.",
    }),
})

export function CreateEventForm() {
    const [isOpen, setOpen] = useState(false)
    const { data, isLoading, writeAsync } = useContractWrite({
        ...wagmiContractConfig,
        functionName: 'createEvent',
    });

    const hash = data as Address;

    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransaction({
        hash: hash,
    })

    const { hackathonId } = useHackathon()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const res = await writeAsync({
            args: [
                BigInt(hackathonId),
                values.title,
                `cid:${values.title}`
            ],
        })
        console.log({res})
        if( !!res?.hash){
            setOpen(true);
        }
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormDescription>
                                    This is your public event name.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button disabled={isLoading} size="lg" className="gap-2" type="submit">
                        {isConfirming ? (
                            <>
                                <Svg.Refresh className="h-5 w-5 flex-none animate-spin" aria-hidden="true" />
                                Confirming
                            </>) : (
                            <>
                                <Svg.Plus className="h-5 w-5 flex-none" aria-hidden="true" />
                                Create new event
                            </>
                        )}
                    </Button>
                </form>
            </Form>
            <ModalCreatedEvent isSuccess={!isConfirming || isConfirmed} isOpen={isOpen} setOpen={setOpen} />
        </>
    )
}
