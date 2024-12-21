import { useState } from "react"

type CalendarEvent = {
    id?: string|number
    title: string
    description?: string
    from: Date
    to: Date
}

const useCalendar = () => {

    const [ today, setToday ] = useState<Date>(new Date)

    const [ current, setCurrent ] = useState<Date>(new Date)

    const [ events, setEvents ] = useState<CalendarEvent[]>([])

    const addEvent = (event: CalendarEvent) => {
        setEvents([ ...events, event ])
    }

    return { today, current, events, addEvent }

}

const Calendar = () => {
    useCalendar()

    return (
        <></>
    )
}

export { Calendar, useCalendar }
export type { CalendarEvent }
