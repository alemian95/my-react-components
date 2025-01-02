import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("/components/calendar", "./routes/components/calendar.tsx"),
    route("/components/datatable", "./routes/components/datatable.tsx"),
    route("/hooks/useboolean", "./routes/hooks/useboolean.tsx"),
    route("/hooks/useinterval", "./routes/hooks/useinterval.tsx"),
    route("/hooks/usetimeout", "./routes/hooks/usetimeout.tsx"),
    route("/hooks/usecounter", "./routes/hooks/usecounter.tsx"),
] satisfies RouteConfig;
