import { WebLayout } from "~/layouts/WebLayout";
import type { Route } from "../+types/home";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";

export function meta({}: Route.MetaArgs) {
  return [
    { title: `${import.meta.env.VITE_APP_NAME} - React Event Calendar` },
    {
      name: "description",
      content: "My React components - React Event Calendar",
    },
  ];
}

export default function CalendarPage() {
  return (
    <WebLayout>
      <Card>
        <CardHeader>
          <CardTitle>Event Calendar</CardTitle>
          <CardDescription>Interactive calendar with advanced functionalities for events</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
      </Card>
    </WebLayout>
  );
}
