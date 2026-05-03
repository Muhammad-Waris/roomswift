import Link from "next/link";

import { Card } from "@/components/ui/card";

export function ManagerTeamLinks() {
  return (
    <section className="grid gap-4 lg:grid-cols-3">
      <Card className="p-5">
        <p className="text-xs uppercase tracking-[0.24em] text-primary">Kitchen Team</p>
        <h3 className="mt-2 text-xl font-semibold text-white">Food order operations</h3>
        <p className="mt-2 text-sm text-slate-400">
          Monitor kitchen throughput, prep flow, and active dining requests.
        </p>
        <Link href="/kitchen" className="mt-4 inline-flex text-sm font-semibold text-primary">
          Open kitchen dashboard
        </Link>
      </Card>
      <Card className="p-5">
        <p className="text-xs uppercase tracking-[0.24em] text-primary">Valet Team</p>
        <h3 className="mt-2 text-xl font-semibold text-white">Service fulfillment</h3>
        <p className="mt-2 text-sm text-slate-400">
          Track water, towels, cleaning, and in-room service fulfillment from one queue.
        </p>
        <Link href="/valet" className="mt-4 inline-flex text-sm font-semibold text-primary">
          Open valet dashboard
        </Link>
      </Card>
      <Card className="p-5">
        <p className="text-xs uppercase tracking-[0.24em] text-primary">Guest Experience</p>
        <h3 className="mt-2 text-xl font-semibold text-white">Room-side preview</h3>
        <p className="mt-2 text-sm text-slate-400">
          Jump directly to a live guest room route and validate the QR ordering journey.
        </p>
        <Link href="/room/101" className="mt-4 inline-flex text-sm font-semibold text-primary">
          Open room 101
        </Link>
      </Card>
    </section>
  );
}
