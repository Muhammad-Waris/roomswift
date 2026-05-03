"use client";

import { useEffect, useState } from "react";
import { Download } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setDeferredPrompt(event as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  if (!deferredPrompt || dismissed) {
    return null;
  }

  return (
    <Card className="fixed bottom-4 left-4 right-4 z-40 p-4 sm:left-auto sm:right-6 sm:w-[360px]">
      <div className="flex items-start gap-3">
        <div className="rounded-2xl bg-primary/15 p-2 text-primary">
          <Download className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <p className="font-semibold text-white">Install RoomSwift</p>
          <p className="mt-1 text-sm text-slate-300">
            Save the demo to your home screen for a smoother expo walkthrough.
          </p>
          <div className="mt-3 flex gap-2">
            <Button
              className="flex-1"
              onClick={async () => {
                await deferredPrompt.prompt();
                await deferredPrompt.userChoice;
                setDeferredPrompt(null);
              }}
            >
              Install
            </Button>
            <Button variant="ghost" className="flex-1" onClick={() => setDismissed(true)}>
              Not now
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
