import { WebLayout } from "~/layouts/WebLayout";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: import.meta.env.VITE_APP_NAME },
    { name: "description", content: "My React components" },
  ];
}

export default function Home() {
  return <WebLayout>my react components</WebLayout>;
}
