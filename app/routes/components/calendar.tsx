import { WebLayout } from "~/layouts/WebLayout";
import type { Route } from "../+types/home";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "~/components/ui/card";
import {
    Calendar,
    type CalendarEvent,
} from "~/components/components/calendar/calendar";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { useForm } from "react-hook-form";
import { Plus } from "lucide-react";
import { useState } from "react";

export function meta({}: Route.MetaArgs) {
    return [
        { title: `${import.meta.env.VITE_APP_NAME} - React Event Calendar` },
        {
            name: "description",
            content: "My React components - React Event Calendar",
        },
    ];
}

const initialEvents: CalendarEvent[] = [
    {
        title: "Christmas lunch with relatives 🎅🎄",
        from: new Date(Date.parse("2024-12-25 12:00")),
        to: new Date(Date.parse("2024-12-25 14:00")),
    },
    {
        title: "Day off work",
        from: new Date(Date.parse("2024-12-23")),
        to: new Date(Date.parse("2025-01-06")),
    },
];

export default function CalendarPage() {
    const formSchema = z.object({
        event: z.string(),
        dateFrom: z.string(),
        dateTo: z.string(),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            event: "",
            dateFrom: "",
            dateTo: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        setEvents([...events, {
            title: values.event,
            from: new Date(values.dateFrom),
            to: new Date(values.dateTo)
        }])
        form.reset()
    }

    const [ events, setEvents ] = useState<CalendarEvent[]>(initialEvents)

    return (
        <WebLayout>
            <Card className="border-none shadow-lg">
                <CardHeader>
                    <CardTitle>Event Calendar</CardTitle>
                    <CardDescription>
                        Interactive calendar with advanced functionalities for
                        events
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-8">
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-end"
                        >
                            <FormField
                                control={form.control}
                                name="event"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nuovo evento</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="dateFrom"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nuovo evento</FormLabel>
                                        <FormControl>
                                            <Input type="date" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="dateTo"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nuovo evento</FormLabel>
                                        <FormControl>
                                            <Input type="date" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit">Add Event <Plus /></Button>
                        </form>
                    </Form>

                    <div className="text-xs text-muted whitespace-break-spaces font-mono">{JSON.stringify(form.getValues(), null, 2)}</div>

                    <Calendar events={events} />
                </CardContent>
            </Card>
        </WebLayout>
    );
}
