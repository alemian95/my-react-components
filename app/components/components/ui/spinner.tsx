import { cn } from "~/lib/utils"

const Spinner = ({ className }: { className?: string }) => {
    return (
        <div className={cn('w-12 h-12 border-4 rounded-full border-muted/50 border-l-primary animate-spin', className)}></div>
    )
}

export { Spinner }