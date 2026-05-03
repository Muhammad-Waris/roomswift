import Link from "next/link";
import { ChefHat, ConciergeBell, ExternalLink } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Card } from "@/components/ui/card";

export default function StaffPortal() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <section className="grid-overlay mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="text-xs uppercase tracking-[0.28em] text-primary">Team Operations</p>
          <h1 className="mt-4 font-display text-5xl text-white">Staff Portal</h1>
          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            Select your operations department to access the live request queue and fulfillment dashboard.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Link href="/kitchen" className="group">
            <Card className="glass-panel relative flex h-full flex-col overflow-hidden rounded-[2.5rem] p-8 transition hover:border-primary/40">
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition group-hover:scale-110">
                <ChefHat className="h-7 w-7" />
              </div>
              <h2 className="text-3xl font-semibold text-white">Kitchen Dashboard</h2>
              <p className="mt-4 mb-8 flex-1 text-slate-300">
                Handle food preparation, track order status, and coordinate with the service team in realtime.
              </p>
              <div className="flex items-center gap-2 font-medium text-primary">
                Open Queue <ExternalLink className="h-4 w-4" />
              </div>
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/5 blur-3xl transition group-hover:bg-primary/10" />
            </Card>
          </Link>

          <Link href="/valet" className="group">
            <Card className="glass-panel relative flex h-full flex-col overflow-hidden rounded-[2.5rem] p-8 transition hover:border-primary/40">
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition group-hover:scale-110">
                <ConciergeBell className="h-7 w-7" />
              </div>
              <h2 className="text-3xl font-semibold text-white">Valet & Services</h2>
              <p className="mt-4 mb-8 flex-1 text-slate-300">
                Manage housekeeping, maintenance, and guest service requests through a unified operational view.
              </p>
              <div className="flex items-center gap-2 font-medium text-primary">
                Open Queue <ExternalLink className="h-4 w-4" />
              </div>
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/5 blur-3xl transition group-hover:bg-primary/10" />
            </Card>
          </Link>
        </div>
      </section>
    </main>
  );
}
