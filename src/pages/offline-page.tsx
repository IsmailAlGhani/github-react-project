import { WifiOff } from "lucide-react";
import { Button } from "../components/ui/button";

export function OfflinePage() {
  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
      <div className="text-center space-y-6 p-8">
        <WifiOff className="w-16 h-16 mx-auto text-slate-600 dark:text-slate-400" />
        <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-200">
          You're Offline
        </h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto">
          It seems you're not connected to the internet. Please check your
          connection and try again.
        </p>
        <Button onClick={handleRetry} variant="default" className="mt-4">
          Try Again
        </Button>
      </div>
    </div>
  );
}
