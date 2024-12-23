import { WebLayout } from "~/layouts/WebLayout";
import type { Route } from "../+types/home";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { useBoolean } from "~/hooks/useBoolean";
import { Button } from "~/components/ui/button";

export function meta({}: Route.MetaArgs) {
  return [
    { title: import.meta.env.VITE_APP_NAME },
    { name: "description", content: "My React components" },
  ];
}

export default function UseBooleanHook() {

  const state = useBoolean(false)

  return <WebLayout>
    <Card>
      <CardHeader>
        <CardTitle>useBoolean Hook</CardTitle>
        <CardDescription>Hook to easily manage boolean state</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center">
          {
            state.value
            ?
            <span className="bg-green-600 text-white px-3 py-1 rounded-full text-lg font-semibold">True</span>
            :
            <span className="bg-red-600 text-white px-3 py-1 rounded-full text-lg font-semibold">False</span>
          }
        </div>
        <div className="flex justify-center gap-6 mt-8">
          <Button onClick={() => state.toggle()}>Toggle</Button>
          <Button onClick={() => state.setTrue()}>Set True</Button>
          <Button onClick={() => state.setFalse()}>Set False</Button>
        </div>

        <div className="relative text-xs my-6 p-4 font-mono whitespace-break-spaces text-slate-200 bg-slate-800">
          {`import { useState } from "react"

export const useBoolean = (initialValue: boolean) => {

  const [ value, setValue ] = useState(initialValue)

  const toggle = () => {
    setValue(! value)
  }

  const setTrue = () => {
    setValue(true)
  }

  const setFalse = () => {
    setValue(false)
  }

  return {
    value,
    toggle,
    setTrue,
    setFalse,
    setValue
  }
}`}
        </div>

      </CardContent>
    </Card>
  </WebLayout>;
}
