import { useEffect, useState, type Dispatch } from "react"

type CalendarEvent = {
    id?: string|number
    title: string
    description?: string
    from: Date
    to: Date
}

const days = [ "sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday" ]
const months = [ "january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december" ]

const useCalendar = () => {

    const today = useDate(new Date)
    const current = useDate(null)

    const [ events, setEvents ] = useState<CalendarEvent[]>([])

    const addEvent = (event: CalendarEvent) => {
        setEvents([ ...events, event ])
    }

    useEffect(() => {
        current.setDate(today.date)
    }, [ today ])

    return { today, current, events, addEvent }

}

const useDate = (initialDate: Date|null): UseDateProps => {

    const [ date, setDate ] = useState<Date|null>(initialDate)

    const [ dayLabel, setDayLabel ] = useState<string|null>(null)
    const [ day, setDay ] = useState<number|null>(null)
    const [ dayOfMonth, setDayOfMonth ] = useState<number|null>(null)
    // const [ week, setWeek ] = useState<number|null>(null)
    const [ month, setMonth ] = useState<number|null>(null)
    const [ year, setYear ] = useState<number|null>(null)

    const [ hours, setHours ] = useState<number|null>(null)
    const [ minutes, setMinutes ] = useState<number|null>(null)
    const [ seconds, setSeconds ] = useState<number|null>(null)

    const [ firstDayLabelOfCurrentMonth, setFirstDayLabelOfCurrentMonth ] = useState<string|null>(null)
    const [ firstDayOfCurrentMonth, setFirstDayOfCurrentMonth ] = useState<number|null>(null)
    const [ daysInCurrentMonth, setDaysInCurrentMonth ] = useState<number|null>(null)

    useEffect(() => {
        setDay(date?.getDay() ?? null)
        setDayLabel(date ? days[date.getDay()] : null)
        setDayOfMonth(date?.getDate() ?? null)
        setMonth(date?.getMonth() ?? null)
        setYear(date?.getFullYear() ?? null)
        setHours(date?.getHours() ?? null)
        setMinutes(date?.getMinutes() ?? null)
        setSeconds(date?.getSeconds() ?? null)
        setFirstDayOfCurrentMonth(date ? new Date(date.getFullYear(), date.getMonth(), 1).getDay() : null)
        setFirstDayLabelOfCurrentMonth(date ? days[new Date(date.getFullYear(), date.getMonth(), 1).getDay()] : null)
        setDaysInCurrentMonth(date ? new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate() : null)
    }, [ date ])

    return { dayLabel, day, dayOfMonth, month, year, hours, minutes, seconds, firstDayOfCurrentMonth, daysInCurrentMonth, firstDayLabelOfCurrentMonth, date, setDate }
}

type UseDateProps = {
    dayLabel: string|null,
    day: number|null,
    dayOfMonth: number|null,
    month: number|null,
    year: number|null,
    hours: number|null,
    minutes: number|null,
    seconds: number|null,
    firstDayOfCurrentMonth: number|null,
    daysInCurrentMonth: number|null,
    firstDayLabelOfCurrentMonth: string|null,
    date: Date|null,
    setDate: Dispatch<React.SetStateAction<Date | null>>
}

const Calendar = ({ events }: { events: CalendarEvent[] }) => {
    const state = useCalendar()

    useEffect(() => {
        events.forEach(state.addEvent)
    }, [events])

    return (
        <>
            <div className="font-xl font-bold capitalize">{state.current.month && months[state.current.month]} {state.current.year && state.current.year}</div>
            <div className="hidden xl:block">
                <div className="grid grid-cols-7">
                    {
                        days.map(d => {
                            return (
                                <div key={d} className="p-2 capitalize">{d}</div>
                            )
                        })
                    }
                </div>
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-7 w-full border">
                {
                    Array.from({ length: state.current.firstDayOfCurrentMonth! }, (_, index) => index).map((i) => {
                        console.log('diocane')
                        return (
                            <div key={i} className="hidden xl:block h-24"></div>
                        )
                    })
                }
                {
                    state.current.daysInCurrentMonth
                    &&
                    Array.from({ length: state.current.daysInCurrentMonth }, (_, index) => index).map((i) => {
                        if (state.current.year && state.current.month) {
                            return (
                                <CalendarDay 
                                    key={i}
                                    date={new Date(state.current.year, state.current.month, i+1)}
                                    events={[]}
                                />
                            )
                        } else {
                            return null
                        }
                    })
                }
            </div>
            <div className="font-mono whitespace-break-spaces text-sm">{JSON.stringify(state, null, 2)}</div>
        </>
    )
}

const CalendarDay = ({ date, events }: { date: Date, events?: CalendarEvent[] }) => {

    const state = useDate(date)

    return (
        <div className={`h-24 border p-2 flex flex-col gap-1`}>
            <div className="text-right"><span className={`${ state.day === 0 ? "text-destructive font-bold" : "font-semibold"}`}>{state.dayOfMonth}</span></div>
        </div>
    )
}

export { Calendar, useCalendar }
export type { CalendarEvent }
