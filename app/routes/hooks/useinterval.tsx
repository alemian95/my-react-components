import { WebLayout } from "~/layouts/WebLayout";
import type { Route } from "../+types/home";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "~/components/ui/card";
import { useInterval } from "~/hooks/useInterval";
import { useState } from "react";
import { Slider } from "~/components/ui/slider";
import { Link } from "react-router";
import { GitHubIcon } from "~/components/icons/github";

export function meta({}: Route.MetaArgs) {
    return [
        { title: import.meta.env.VITE_APP_NAME },
        { name: "description", content: "My React components" },
    ];
}

export default function UseIntervalHook() {

    const [ date, setDate ] = useState(new Date)
    const [ delay, setDelay ] = useState<number|null>(1000)

    const state = useInterval(() => {
        setDate(new Date)
    }, delay);

    return (
        <WebLayout>
            <Card>
                <CardHeader>
                    <CardTitle className="flex justify-between items-center"><span>useInterval Hook</span><Link to={"https://github.com/alemian95/my-react-components/blob/master/app/hooks/useInterval.ts"} target="_blank"><GitHubIcon className="w-6" /></Link></CardTitle>
                    <CardDescription>
                        Hook that repeatedly calls a callback function at a specified interval
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div>{date.toISOString()}</div>
                    <Slider value={[delay || 0]} min={0} max={5000} step={1} onValueChange={(e) => setDelay(e[0].valueOf() > 0 ? e[0].valueOf() : null)} />
                    <div>Delay: {delay || 0 > 0 ? `${delay} ms` : "stopped"}</div>
                </CardContent>
            </Card>
        </WebLayout>
    );
}
