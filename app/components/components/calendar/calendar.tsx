import { RefreshCcw, SkipBack, SkipForward } from "lucide-react";
import React, { useEffect, useState, type Dispatch } from "react";

type CalendarEvent = {
    id?: string | number;
    title: string;
    description?: string;
    from: Date;
    to: Date;
};

const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];
const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

const useCalendar = () => {
    const today = useDate(new Date());
    const current = useDate(new Date(today.year, today.month));

    const [events, setEvents] = useState<CalendarEvent[]>([]);

    const addEvent = (event: CalendarEvent) =>
        setEvents((prev) => [...prev, event]);

    const clearEvents = () => setEvents([]);

    const backToToday = () => {
        current.setDate(new Date(today.year, today.month, 1))
    }

    const nextMonth = () => {
        current.setDate(new Date(current.year, current.month + 1, 1))
    };

    const prevMonth = () => {
        current.setDate(new Date(current.year, current.month - 1, 1))
    };

    return {
        today,
        current,
        events,
        setEvents,
        addEvent,
        clearEvents,
        nextMonth,
        prevMonth,
        backToToday
    };
};

const useDate = (initialDate: Date): UseDateProps => {
    const [date, setDate] = useState<Date>(initialDate);

    const dayLabel = days[date.getDay()];
    const day = date.getDay();
    const dayOfMonth = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const firstDayOfCurrentMonth = new Date(year, month, 1).getDay();
    const daysInCurrentMonth = new Date(year, month + 1, 0).getDate();

    const isDayEqual = (otherDate: Date) =>
        dayOfMonth === otherDate.getDate() &&
        month === otherDate.getMonth() &&
        year === otherDate.getFullYear();

    return {
        dayLabel,
        day,
        dayOfMonth,
        month,
        year,
        firstDayOfCurrentMonth,
        daysInCurrentMonth,
        date,
        setDate,
        isDayEqual,
    };
};

type UseDateProps = {
    dayLabel: string;
    day: number;
    dayOfMonth: number;
    month: number;
    year: number;
    firstDayOfCurrentMonth: number;
    daysInCurrentMonth: number;
    date: Date;
    setDate: Dispatch<React.SetStateAction<Date>>;
    isDayEqual: (otherDate: Date) => boolean;
};

const Calendar = ({ events }: { events: CalendarEvent[] }) => {
    const state = useCalendar();

    useEffect(() => {
        state.setEvents(events);
    }, [events]);

    return (
        <div>
            <div className="flex justify-between">
                <div className="font-xl font-bold capitalize">
                    {months[state.current.month]} {state.current.year}
                </div>
                <div className="flex items-center gap-4">
                    <RefreshCcw
                        className="cursor-pointer"
                        onClick={state.backToToday}
                    />
                    <SkipBack
                        className="cursor-pointer"
                        onClick={state.prevMonth}
                    />
                    <SkipForward
                        className="cursor-pointer"
                        onClick={state.nextMonth}
                    />
                </div>
            </div>
            <div className="grid grid-cols-7">
                {days.map((d) => (
                    <div key={d} className="p-2 capitalize font-semibold">
                        {d}
                    </div>
                ))}
                {Array.from({
                    length: state.current.firstDayOfCurrentMonth,
                }).map((_, i) => (
                    <div
                        key={i}
                        className="hidden xl:block h-24 xl:aspect-video"
                    ></div>
                ))}
                {Array.from({ length: state.current.daysInCurrentMonth }).map(
                    (_, i) => {
                        const date = new Date(
                            state.current.year,
                            state.current.month,
                            i + 1
                        );
                        const dayEvents = state.events.filter((e) =>
                            isEventInDay(date, e)
                        );
                        return (
                            <CalendarDay
                                key={date.toISOString()}
                                date={date}
                                events={dayEvents}
                            />
                        );
                    }
                )}
            </div>
        </div>
    );
};

const CalendarDay = ({
    date,
    events,
}: {
    date: Date;
    events?: CalendarEvent[];
}) => {
    const state = useDate(date);
    const today = useDate(new Date());

    return (
        <div
            className={`h-24 xl:h-auto xl:aspect-video flex flex-col gap-1 ${
                state.isDayEqual(today.date)
                    ? "bg-sky-200"
                    : state.day === 0
                    ? "bg-rose-200"
                    : "bg-slate-50"
            } hover:bg-emerald-200`}
        >
            <div className="text-right p-2">
                <span
                    className={`cursor-pointer ${
                        state.day === 0
                            ? "text-destructive font-bold"
                            : "font-semibold"
                    }`}
                >
                    {state.dayOfMonth}
                </span>
            </div>
            <div className="flex flex-col gap-1">
                {events?.slice(0, 2).map((e, i) => (
                    <CalendarEvent key={i} event={e} />
                ))}
            </div>
        </div>
    );
};

export interface CalendarEventProps extends React.HTMLAttributes<HTMLDivElement> { event: CalendarEvent }

const CalendarEvent = React.forwardRef<HTMLDivElement, CalendarEventProps>(
    ({ event, ...props }, ref) => (
        <div
            ref={ref}
            {...props}
            className="cursor-pointer w-full p-1 h-[1.2rem] text-xs overflow-hidden bg-orange-500 text-slate-50"
        >
            {event.title}
        </div>
    )
);
CalendarEvent.displayName = "CalendarEvent";

const isEventInDay = (date: Date, event: CalendarEvent) => {
    const isSameDay = (d1: Date, d2: Date) =>
        d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate();

    return (
        isSameDay(date, event.from) ||
        isSameDay(date, event.to) ||
        (date >= event.from && date <= event.to)
    );
};

export { Calendar, useCalendar };
export type { CalendarEvent, UseDateProps };
