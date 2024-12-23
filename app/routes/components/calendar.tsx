import { WebLayout } from "~/layouts/WebLayout";
import type { Route } from "../+types/home";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { Calendar, useCalendar, type CalendarEvent } from "~/components/components/calendar/calendar";
import { useEffect } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: `${import.meta.env.VITE_APP_NAME} - React Event Calendar` },
    {
      name: "description",
      content: "My React components - React Event Calendar",
    },
  ];
}

const events: CalendarEvent[] = [
  {
    title: "Christmas lunch with relatives 🎅🎄",
    from: new Date(Date.parse("2024-12-25 12:00")),
    to: new Date(Date.parse("2024-12-25 14:00")),
  },
  {
    title: "Day off work",
    from: new Date(Date.parse("2024-12-23")),
    to: new Date(Date.parse("2025-01-06")),
  }
]

export default function CalendarPage() {
  return (
    <WebLayout>
      <Card>
        <CardHeader>
          <CardTitle>Event Calendar</CardTitle>
          <CardDescription>Interactive calendar with advanced functionalities for events</CardDescription>
        </CardHeader>
        <CardContent>
          <Calendar events={events} />
        </CardContent>
      </Card>
    </WebLayout>
  );
}
