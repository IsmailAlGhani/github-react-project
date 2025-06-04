import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HomePage } from "@/pages/home-page";
import { OfflinePage } from "@/pages/offline-page";
import { Workbox } from "workbox-window";

function App() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    // Register service worker
    if ("serviceWorker" in navigator) {
      const wb = new Workbox("/sw.js");

      wb.addEventListener("installed", (event) => {
        if (event && "isUpdate" in event && event.isUpdate === true) {
          window.location.reload();
        }
      });

      wb.addEventListener("waiting", () => {
        wb.messageSkipWaiting();
      });

      wb.addEventListener("controlling", () => {
        window.location.reload();
      });

      wb.register().catch((error) => {
        console.error("Service worker registration failed:", error);
      });
    }

    // Handle online/offline status
    const handleOnline = () => {
      setIsOnline(true);
      window.location.reload();
    };
    const handleOffline = () => setIsOnline(false);

    // Set initial online status
    setIsOnline(navigator.onLine);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <BrowserRouter>
      {!isOnline ? (
        <OfflinePage />
      ) : (
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/offline" element={<OfflinePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
