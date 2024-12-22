import { MoveLeft, MoveRight } from "lucide-react"
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

    const clearEvents = () => {
        setEvents([])
    }

    const nextMonth = () => {
        current.setDate(new Date(current.year, current.month + 1, current.dayOfMonth))
    }

    const prevMonth = () => {
        current.setDate(new Date(current.year, current.month - 1, current.dayOfMonth))
    }

    useEffect(() => {
        current.setDate(today.date)
    }, [])

    return { today, current, events, addEvent, clearEvents, nextMonth, prevMonth }

}

const useDate = (initialDate: Date|null): UseDateProps => {

    const [ date, setDate ] = useState<Date|null>(initialDate)

    const [ dayLabel, setDayLabel ] = useState<string>("")
    const [ day, setDay ] = useState<number>(0)
    const [ dayOfMonth, setDayOfMonth ] = useState<number>(0)
    // const [ week, setWeek ] = useState<number|null>(null)
    const [ month, setMonth ] = useState<number>(0)
    const [ year, setYear ] = useState<number>(0)

    const [ hours, setHours ] = useState<number>(0)
    const [ minutes, setMinutes ] = useState<number>(0)
    const [ seconds, setSeconds ] = useState<number>(0)

    const [ firstDayLabelOfCurrentMonth, setFirstDayLabelOfCurrentMonth ] = useState<string>("")
    const [ firstDayOfCurrentMonth, setFirstDayOfCurrentMonth ] = useState<number>(0)
    const [ daysInCurrentMonth, setDaysInCurrentMonth ] = useState<number>(0)

    const isDayEqual = (otherDate: UseDateProps) => {
        return dayOfMonth === otherDate.dayOfMonth && month === otherDate.month && year === otherDate.year
    }

    useEffect(() => {
        if (! date) {
            return
        }
        setDay(date.getDay())
        setDayLabel(days[date.getDay()])
        setDayOfMonth(date.getDate())
        setMonth(date.getMonth())
        setYear(date.getFullYear())
        setHours(date.getHours())
        setMinutes(date.getMinutes())
        setSeconds(date.getSeconds())
        setFirstDayOfCurrentMonth(new Date(date.getFullYear(), date.getMonth(), 1).getDay())
        setFirstDayLabelOfCurrentMonth(days[new Date(date.getFullYear(), date.getMonth(), 1).getDay()])
        setDaysInCurrentMonth(new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate())
    }, [ date ])

    return { dayLabel, day, dayOfMonth, month, year, hours, minutes, seconds, firstDayOfCurrentMonth, daysInCurrentMonth, firstDayLabelOfCurrentMonth, date, setDate, isDayEqual }
}

type UseDateProps = {
    dayLabel: string,
    day: number,
    dayOfMonth: number,
    month: number,
    year: number,
    hours: number,
    minutes: number,
    seconds: number,
    firstDayOfCurrentMonth: number,
    daysInCurrentMonth: number,
    firstDayLabelOfCurrentMonth: string,
    date: Date|null,
    setDate: Dispatch<React.SetStateAction<Date | null>>
    isDayEqual: (otherDate: UseDateProps) => boolean
}

const Calendar = ({ events }: { events: CalendarEvent[] }) => {
    const state = useCalendar()

    useEffect(() => {
        events.forEach(state.addEvent)
    }, [events])

    return (
        <>
            <div className="flex justify-between">
                <div className="font-xl font-bold capitalize">{state.current.month && months[state.current.month]} {state.current.year && state.current.year}</div>
                <div className="flex items-center gap-4">
                    <MoveLeft className="cursor-pointer" onClick={state.prevMonth} />
                    <MoveRight className="cursor-pointer" onClick={state.nextMonth} />
                </div>
            </div>
            <div className="hidden xl:block">
                <div className="grid grid-cols-7">
                    {
                        days.map(d => {
                            return (
                                <div key={d} className="p-2 capitalize font-semibold">{d}</div>
                            )
                        })
                    }
                </div>
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-7 w-full">
                {
                    Array.from({ length: state.current.firstDayOfCurrentMonth! }, (_, index) => index).map((i) => {
                        return (
                            <div key={i} className="hidden xl:block h-24 xl:h-auto xl:aspect-video"></div>
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
                                    key={`${state.current.month}_${i}`}
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
        </>
    )
}

const CalendarDay = ({ date }: { date: Date, events?: CalendarEvent[] }) => {

    const state = useDate(date)
    const today = useDate(new Date)

    return (
        <div className={`h-24 xl:h-auto xl:aspect-video p-2 flex flex-col gap-1 ${state.isDayEqual(today) ? "bg-sky-200" : (state.day === 0 ? "bg-rose-200" : "bg-slate-50")} hover:bg-emerald-200`}>
            <div className="text-right"><span className={`cursor-pointer ${ state.day === 0 ? "text-destructive font-bold" : "font-semibold"}`}>{state.dayOfMonth}</span></div>
        </div>
    )
}

export { Calendar, useCalendar }
export type { CalendarEvent }
