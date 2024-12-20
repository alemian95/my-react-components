import type { Route } from "../+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "My React components - React Event Calendar" },
    { name: "description", content: "My React components - React Event Calendar" },
  ];
}

export default function CalendarPage() {
  return <>Calendar with events</>;
}
