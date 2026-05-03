"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { toast } from "sonner";

import { Navbar } from "@/components/navbar";
import { QRCard } from "@/components/qr-card";
import { demoRooms } from "@/lib/demo-data";

export function QRDemoClient() {
  const [codes, setCodes] = useState<Record<string, string>>({});
  const baseUrl =
    typeof window !== "undefined" ? window.location.origin : "http://localhost:3000";

  useEffect(() => {
    async function generate() {
      const entries = await Promise.all(
        demoRooms.map(async (room) => {
          const url = `${baseUrl}/room/${room}`;
          const dataUrl = await QRCode.toDataURL(url, {
            width: 512,
            margin: 1,
            color: { dark: "#08111d", light: "#ffffff" }
          });
          return [room, dataUrl] as const;
        })
      );

      setCodes(Object.fromEntries(entries));
    }

    generate();
  }, [baseUrl]);

  async function handleCopy(room: string) {
    const url = `${baseUrl}/room/${room}`;
    await navigator.clipboard.writeText(url);
    toast.success(`Room ${room} link copied`);
  }

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
          <p className="text-xs uppercase tracking-[0.28em] text-primary">Demo QR Center</p>
          <h1 className="mt-3 font-display text-5xl text-white">Room QR Showcase</h1>
          <p className="mt-3 max-w-2xl text-sm text-slate-300">
            Print these room stickers for your university expo table. Each QR opens the
            guest web app instantly without login or app installation.
          </p>
          <div className="mt-5 rounded-[1.5rem] border border-dashed border-white/10 bg-slate-950/40 p-4 text-sm text-slate-300">
            Suggested demo setup: print Room 101 and Room 102, place them on your expo
            booth, and use the "Scan to test" button to quickly validate the flow before
            presenting.
          </div>
        </section>

        <section className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {demoRooms.map((room) =>
            codes[room] ? (
              <QRCard
                key={room}
                roomNumber={room}
                qrDataUrl={codes[room]}
                roomUrl={`${baseUrl}/room/${room}`}
                onCopy={() => handleCopy(room)}
              />
            ) : null
          )}
        </section>
      </div>
    </main>
  );
}
