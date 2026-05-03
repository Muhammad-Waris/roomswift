import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <p className="text-xs uppercase tracking-[0.28em] text-primary">404</p>
      <h1 className="mt-4 font-display text-6xl text-white">Room not found</h1>
      <p className="mt-4 max-w-md text-sm text-slate-400">
        The requested RoomSwift page could not be found. Use the demo room below to keep
        the presentation moving.
      </p>
      <Link
        href="/room/101"
        className={buttonVariants({ variant: "primary", className: "mt-6" })}
      >
        Open Demo Room 101
      </Link>
    </main>
  );
}
