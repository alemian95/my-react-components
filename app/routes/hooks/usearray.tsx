import { WebLayout } from "~/layouts/WebLayout";
import type { Route } from "../+types/home";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "~/components/ui/card";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: import.meta.env.VITE_APP_NAME },
        { name: "description", content: "My React components" },
    ];
}

export default function UseArrayPage() {

    return (
        <WebLayout>
            <Card>
                <CardHeader>
                    <CardTitle>useArray Hook</CardTitle>
                    <CardDescription>
                        Hook that initializes and manages arrays
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    
                </CardContent>
            </Card>
        </WebLayout>
    );
}
