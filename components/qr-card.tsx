import Image from "next/image";
import Link from "next/link";
import { Copy, Printer } from "lucide-react";

import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function QRCard({
  roomNumber,
  qrDataUrl,
  roomUrl,
  onCopy
}: {
  roomNumber: string;
  qrDataUrl: string;
  roomUrl: string;
  onCopy: () => void;
}) {
  return (
    <Card className="p-5 print:break-inside-avoid">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-slate-400">
            Room Sticker
          </p>
          <h3 className="font-display text-3xl text-white">Room {roomNumber}</h3>
        </div>
        <div className="rounded-full border border-dashed border-white/10 px-3 py-1 text-xs text-primary">
          Scan to order
        </div>
      </div>
      <div className="mx-auto flex h-64 w-64 items-center justify-center rounded-[2rem] bg-white p-5">
        <Image src={qrDataUrl} alt={`QR for room ${roomNumber}`} width={220} height={220} />
      </div>
      <p className="mt-4 break-all text-sm text-slate-300">{roomUrl}</p>
      <div className="mt-4 flex gap-2 print:hidden">
        <Button variant="secondary" className="flex-1" onClick={onCopy}>
          <Copy className="mr-2 h-4 w-4" />
          Copy Link
        </Button>
        <Link
          href={roomUrl}
          className={buttonVariants({ variant: "primary", className: "flex-1" })}
        >
          Scan to test
        </Link>
      </div>
      <div className="mt-2 flex gap-2 print:hidden">
        <Button variant="ghost" className="flex-1" onClick={() => window.print()}>
          <Printer className="mr-2 h-4 w-4" />
          Print
        </Button>
      </div>
    </Card>
  );
}
