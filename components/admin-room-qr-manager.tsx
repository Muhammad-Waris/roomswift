"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import QRCode from "qrcode";
import { Copy, Plus, Printer, QrCode } from "lucide-react";
import { toast } from "sonner";

import { QRCard } from "@/components/qr-card";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function AdminRoomQrManager({
  roomNumbers
}: {
  roomNumbers: string[];
}) {
  const [roomInput, setRoomInput] = useState("");
  const [selectedRoom, setSelectedRoom] = useState(roomNumbers[0] ?? "101");
  const [codes, setCodes] = useState<Record<string, string>>({});

  const baseUrl =
    typeof window !== "undefined" ? window.location.origin : "http://localhost:3000";

  const uniqueRooms = useMemo(
    () => Array.from(new Set(roomNumbers.filter(Boolean))).sort(),
    [roomNumbers]
  );

  useEffect(() => {
    if (!selectedRoom && uniqueRooms[0]) {
      setSelectedRoom(uniqueRooms[0]);
    }
  }, [selectedRoom, uniqueRooms]);

  useEffect(() => {
    async function generate() {
      const nextEntries = await Promise.all(
        uniqueRooms.map(async (room) => {
          const url = `${baseUrl}/room/${room}`;
          const dataUrl = await QRCode.toDataURL(url, {
            width: 512,
            margin: 1,
            color: { dark: "#08111d", light: "#ffffff" }
          });
          return [room, dataUrl] as const;
        })
      );

      setCodes(Object.fromEntries(nextEntries));
    }

    if (uniqueRooms.length) {
      void generate();
    }
  }, [baseUrl, uniqueRooms]);

  async function handleCopy(room: string) {
    const url = `${baseUrl}/room/${room}`;
    await navigator.clipboard.writeText(url);
    toast.success(`Room ${room} link copied`);
  }

  async function handleAddRoom() {
    const cleaned = roomInput.trim();
    if (!cleaned) {
      return;
    }

    setSelectedRoom(cleaned);
    if (codes[cleaned]) {
      setRoomInput("");
      toast.success(`Room ${cleaned} is ready`);
      return;
    }

    const url = `${baseUrl}/room/${cleaned}`;
    const dataUrl = await QRCode.toDataURL(url, {
      width: 512,
      margin: 1,
      color: { dark: "#08111d", light: "#ffffff" }
    });
    setCodes((current) => ({ ...current, [cleaned]: dataUrl }));
    setRoomInput("");
    toast.success(`Unique QR created for room ${cleaned}`);
  }

  const renderedRooms = useMemo(() => {
    const codeRooms = Object.keys(codes);
    return Array.from(new Set([...uniqueRooms, ...codeRooms])).sort();
  }, [codes, uniqueRooms]);

  return (
    <Card className="p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-primary">
            Room QR Management
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-white">
            Generate a unique QR for any room
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-300">
            Each QR points to a unique room route like `/room/101`. The guest page reads
            the room number directly from the URL, so every sticker maps cleanly to its
            own service experience.
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <input
            value={roomInput}
            onChange={(event) => setRoomInput(event.target.value)}
            placeholder="Enter room number"
            className="h-11 rounded-full border border-white/10 bg-slate-950/50 px-4 text-sm text-white outline-none placeholder:text-slate-500 focus:border-primary"
          />
          <Button onClick={handleAddRoom}>
            <Plus className="mr-2 h-4 w-4" />
            Create QR
          </Button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[2rem] border border-white/10 bg-slate-950/35 p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Room registry</h3>
            <div className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary">
              {renderedRooms.length} rooms
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {renderedRooms.map((room) => (
              <button
                key={room}
                onClick={() => setSelectedRoom(room)}
                className={
                  selectedRoom === room
                    ? "rounded-full bg-primary px-4 py-2 text-sm text-primary-foreground"
                    : "rounded-full bg-white/5 px-4 py-2 text-sm text-slate-300 hover:bg-white/10"
                }
              >
                Room {room}
              </button>
            ))}
          </div>

          {selectedRoom ? (
            <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
                    Active room route
                  </p>
                  <p className="mt-2 break-all text-sm text-white">
                    {baseUrl}/room/{selectedRoom}
                  </p>
                </div>
                <QrCode className="h-5 w-5 text-primary" />
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                <Button variant="secondary" onClick={() => handleCopy(selectedRoom)}>
                  <Copy className="mr-2 h-4 w-4" />
                  Copy Link
                </Button>
                <Link
                  href={`/room/${selectedRoom}`}
                  className={buttonVariants({ variant: "primary" })}
                >
                  Open Room
                </Link>
                <Button variant="ghost" onClick={() => window.print()}>
                  <Printer className="mr-2 h-4 w-4" />
                  Print
                </Button>
              </div>
            </div>
          ) : null}
        </div>

        {selectedRoom && codes[selectedRoom] ? (
          <QRCard
            roomNumber={selectedRoom}
            qrDataUrl={codes[selectedRoom]}
            roomUrl={`${baseUrl}/room/${selectedRoom}`}
            onCopy={() => handleCopy(selectedRoom)}
          />
        ) : (
          <div className="flex items-center justify-center rounded-[2rem] border border-dashed border-white/10 bg-white/5 p-10 text-sm text-slate-400">
            Create or select a room number to generate its unique QR code.
          </div>
        )}
      </div>
    </Card>
  );
}
