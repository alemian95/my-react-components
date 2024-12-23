import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("/components/calendar", "./routes/components/calendar.tsx"),
    route("/hooks/useboolean", "./routes/hooks/useboolean.tsx"),
] satisfies RouteConfig;
