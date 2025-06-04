"use client"

import { AlertCircle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface ErrorMessageProps {
  error: unknown
  onRetry?: () => void
}

export function ErrorMessage({ error, onRetry }: ErrorMessageProps) {
  const getErrorMessage = (error: unknown): string => {
    if (error instanceof Error) {
      return error.message
    }
    if (typeof error === "string") {
      return error
    }
    return "An unexpected error occurred"
  }

  const errorMessage = getErrorMessage(error)

  return (
    <Alert variant="destructive" className="my-4">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription className="flex items-center justify-between">
        <span>{errorMessage}</span>
        {onRetry && (
          <Button variant="outline" size="sm" onClick={onRetry} className="ml-2">
            <RefreshCw className="w-4 h-4 mr-1" />
            Retry
          </Button>
        )}
      </AlertDescription>
    </Alert>
  )
}
