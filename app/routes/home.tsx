import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "My React components" },
    { name: "description", content: "My React components" },
  ];
}

export default function Home() {
  return <>my react components</>;
}
