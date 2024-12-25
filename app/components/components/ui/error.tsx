import { cn } from "~/lib/utils"

const ErrorBanner = ({ message }: { message: string }) => {
    return (
        <div className="p-2 w-full rounded bg-destructive text-destructive-foreground font-semibold">{message}</div>
    )
}

export { ErrorBanner }