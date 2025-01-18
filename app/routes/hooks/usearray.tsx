import { WebLayout } from "~/layouts/WebLayout";
import type { Route } from "../+types/home";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "~/components/ui/card";
import { useArray } from "~/hooks/useArray";
import { Button } from "~/components/ui/button";
import { useState } from "react";
import { Input } from "~/components/ui/input";
import { Link } from "react-router";
import { GitHubIcon } from "~/components/icons/github";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: import.meta.env.VITE_APP_NAME },
        { name: "description", content: "My React components" },
    ];
}

export default function UseArrayPage() {

    const state = useArray<number>()

    const [ value, setValue ] = useState(0)
    const [ index, setIndex ] = useState(0)

    return (
        <WebLayout>
            <Card>
                <CardHeader>
                    <CardTitle className="flex justify-between items-center"><span>useArray Hook</span><Link to={"https://github.com/alemian95/my-react-components/blob/master/app/hooks/useArray.ts"} target="_blank"><GitHubIcon className="w-6" /></Link></CardTitle>
                    <CardDescription>
                        Hook that initializes and manages arrays
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="max-w-sm mx-auto flex gap-4 items-center mb-6">
                        <Input type="number" placeholder="Value" value={value} onChange={(e) => setValue(parseInt(e.currentTarget.value))} />
                        <Input type="number" placeholder="Index" value={index} onChange={(e) => setIndex(parseInt(e.currentTarget.value))} />
                        <Button onClick={() => state.append(value)}>Add</Button>
                        <Button onClick={() => state.set(index,value)}>Set</Button>
                    </div>
                    <div className="max-w-sm mx-auto font-mono text-slate-600 whitespace-break-spaces">
                        {
                            state.array.map((item: number, index: number) => {
                                return (
                                    <div className="flex items-center gap-2">
                                        <span className="text-right">[{index}]</span>
                                        <span className="text-center"> =&gt; </span>
                                        <span className="text-left">[{item}]</span>
                                    </div>
                                )
                            })
                        }
                    </div>
                </CardContent>
            </Card>
        </WebLayout>
    );
}
