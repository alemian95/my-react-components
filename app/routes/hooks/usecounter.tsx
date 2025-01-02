import { WebLayout } from "~/layouts/WebLayout";
import type { Route } from "../+types/home";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { useBoolean } from "~/hooks/useBoolean";
import { Button } from "~/components/ui/button";
import { useCounter } from "~/hooks/useCounter";

export function meta({}: Route.MetaArgs) {
  return [
    { title: import.meta.env.VITE_APP_NAME },
    { name: "description", content: "My React components" },
  ];
}

export default function UseCounterHook() {

  const state = useCounter({
    initialValue: 0,
    minValue: -8,
    maxValue: 8,
    onMinValue: () => alert("Min value"),
    onMaxValue: () => alert("Max value")
  })

  return <WebLayout>
    <Card>
      <CardHeader>
        <CardTitle>useCounter Hook</CardTitle>
        <CardDescription>Hook to easily manage counter state</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center font-semibold text-xl">
          {
            state.value
          }
        </div>
        <div className="flex justify-center gap-6 mt-8">
          <Button onClick={() => state.subtract(5)}>Subtract 5</Button>
          <Button onClick={() => state.decrement()}>Decrement</Button>
          <Button onClick={() => state.reset()}>Reset</Button>
          <Button onClick={() => state.increment()}>Increment</Button>
          <Button onClick={() => state.add(5)}>Add 5</Button>
        </div>

      </CardContent>
    </Card>
  </WebLayout>;
}
