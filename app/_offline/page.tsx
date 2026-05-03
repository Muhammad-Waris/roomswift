import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

export default function OfflinePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <p className="text-xs uppercase tracking-[0.28em] text-primary">Offline Mode</p>
      <h1 className="mt-4 font-display text-5xl text-white">RoomSwift is temporarily offline</h1>
      <p className="mt-4 max-w-lg text-sm text-slate-400">
        Your device appears to be offline. Once the network is back, refresh the page to
        resume guest requests and realtime staff updates.
      </p>
      <Link
        href="/"
        className={buttonVariants({ variant: "primary", className: "mt-6" })}
      >
        Return to Home
      </Link>
    </main>
  );
}
