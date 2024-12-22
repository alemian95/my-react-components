import { useEffect, useState, type Dispatch } from "react"

type CalendarEvent = {
    id?: string|number
    title: string
    description?: string
    from: Date
    to: Date
}

const days = [ "sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday" ]

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

const Calendar = () => {
    // const { today, current, events, addEvent } = useCalendar()
    const state = useCalendar()

    useEffect(() => {
        state.addEvent({
            title: "Christmas lunch with relatives 🎅🎄",
            from: new Date(Date.parse("2024-12-25 12:00")),
            to: new Date(Date.parse("2024-12-25 14:00")),
        })
    }, [])

    return (
        <>
            <div className="grid grid-cols-7">
                {
                    days.map(d => <div className="p-2 capitalize">{d}</div>)
                }
            </div>
            <div className="grid grid-cols-7 w-full border">
                {
                    Array.from({ length: state.current.firstDayOfCurrentMonth! }, (_, index) => index).map((i) => {
                        return (
                            <div className="h-16"></div>
                        )
                    })
                }
                {
                    state.current.daysInCurrentMonth
                    &&
                    Array.from({ length: state.current.daysInCurrentMonth }, (_, index) => index).map((i) => {
                        if (state.current.year && state.current.month) {
                            return (
                                <CalendarDay date={new Date(state.current.year, state.current.month, i+1)} />
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

const CalendarDay = ({ date }: { date: Date }) => {

    const state = useDate(date)

    return (
        <div className="h-16 border">{state.dayOfMonth}</div>
    )
}

export { Calendar, useCalendar }
export type { CalendarEvent }
