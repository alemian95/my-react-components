import { WebLayout } from "~/layouts/WebLayout";
import type { Route } from "../+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: `${import.meta.env.VITE_APP_NAME } - React Event Calendar` },
    { name: "description", content: "My React components - React Event Calendar" },
  ];
}

export default function CalendarPage() {
  return <WebLayout>Calendar with events</WebLayout>;
}
