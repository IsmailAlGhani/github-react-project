import { Loader2 } from "lucide-react"

interface LoadingSpinnerProps {
  message?: string
}

export function LoadingSpinner({ message = "Loading..." }: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-slate-500 dark:text-slate-400">
      <Loader2 className="w-8 h-8 animate-spin mb-2" />
      <p className="text-sm">{message}</p>
    </div>
  )
}
