import Image from "next/image";
import { useState } from "react";
import { MessageSquarePlus, MessageSquareX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { MenuItem } from "@/types";
import { cn } from "@/lib/utils";

interface MenuCardProps {
  item: MenuItem;
  availabilityLabel: string;
  unavailableLabel: string;
  actionLabel: string;
  notePlaceholder: string;
  noteValue: string;
  isLoading?: boolean;
  onNoteChange: (note: string) => void;
  onOrder: () => void;
}

export function MenuCard({
  item,
  availabilityLabel,
  unavailableLabel,
  actionLabel,
  notePlaceholder,
  noteValue,
  isLoading,
  onNoteChange,
  onOrder
}: MenuCardProps) {
  const [showNote, setShowNote] = useState(false);

  return (
    <Card className="glass-panel group overflow-hidden rounded-[2.5rem] transition-all hover:border-primary/30">
      <div className="relative h-56 overflow-hidden">
        <Image 
          src={item.image_url} 
          alt={item.name} 
          fill 
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-80" />
        
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <div className="capitalize rounded-full bg-slate-950/50 backdrop-blur-md px-3 py-1 text-[10px] font-bold tracking-widest text-primary border border-white/5">
            {item.category}
          </div>
        </div>

        <div className="absolute bottom-4 left-6 right-6">
          <div className="flex items-center gap-2">
            <div
              className={cn(
                "h-2 w-2 rounded-full",
                item.available ? "bg-emerald-500 animate-pulse" : "bg-rose-500"
              )}
            />
            <span className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em]">
              {item.available ? availabilityLabel : unavailableLabel}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-4 p-8">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-white tracking-tight">{item.name}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-400 line-clamp-2">{item.description}</p>
          </div>
          <span className="text-xl font-bold text-primary">
            {formatCurrency(item.price)}
          </span>
        </div>

        <AnimatePresence>
          {showNote && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <textarea
                autoFocus
                value={noteValue}
                onChange={(event) => onNoteChange(event.target.value)}
                placeholder={notePlaceholder}
                className="mt-2 h-24 w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 transition-colors focus:border-primary/30 resize-none"
              />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex gap-2">
          <button
            onClick={() => setShowNote(!showNote)}
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-2xl border transition-all",
              showNote 
                ? "bg-primary/10 border-primary/30 text-primary" 
                : "bg-white/5 border-white/5 text-slate-400 hover:text-white hover:bg-white/10"
            )}
            title="Special Instructions"
          >
            {showNote ? <MessageSquareX className="h-5 w-5" /> : <MessageSquarePlus className="h-5 w-5" />}
          </button>

          <Button 
            className="h-12 flex-1 button-glow rounded-2xl text-sm font-bold uppercase tracking-wider" 
            onClick={onOrder} 
            disabled={!item.available || isLoading}
            variant={item.available ? "primary" : "secondary"}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Processing...
              </div>
            ) : actionLabel}
          </Button>
        </div>
      </div>
    </Card>
  );
}
