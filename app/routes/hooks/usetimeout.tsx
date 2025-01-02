import { WebLayout } from "~/layouts/WebLayout";
import type { Route } from "../+types/home";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "~/components/ui/card";
import { useTimeout } from "~/hooks/useTimeout";
import { Button } from "~/components/ui/button";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: import.meta.env.VITE_APP_NAME },
        { name: "description", content: "My React components" },
    ];
}

export default function UseTimeoutPage() {

    const timeout = 5000

    const { clear, reset, remaining } = useTimeout(() => {
        alert("Activated")
    }, timeout)

    return (
        <WebLayout>
            <Card>
                <CardHeader>
                    <CardTitle>useTimeout Hook</CardTitle>
                    <CardDescription>
                        Hook that executes a callback after a specified delay
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div>Time to activation: <span className="font-semibold">{remaining > 0 ? `${(remaining/1000).toFixed(1)} seconds` : "Activated"}</span></div>
                    <div className="flex items-center gap-4">
                        <Button onClick={reset}>Reset</Button>
                        <Button onClick={clear}>Clear</Button>
                    </div>
                </CardContent>
            </Card>
        </WebLayout>
    );
}
