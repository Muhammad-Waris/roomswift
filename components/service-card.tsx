import { useState } from "react";
import * as Icons from "lucide-react";
import { MessageSquarePlus, MessageSquareX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ServiceItem } from "@/types";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  item: ServiceItem;
  actionLabel: string;
  notePlaceholder: string;
  noteValue: string;
  sendingLabel: string;
  addInstructionsLabel: string;
  isLoading?: boolean;
  onNoteChange: (note: string) => void;
  onRequest: () => void;
}

export function ServiceCard({
  item,
  actionLabel,
  notePlaceholder,
  noteValue,
  sendingLabel,
  addInstructionsLabel,
  isLoading,
  onNoteChange,
  onRequest
}: ServiceCardProps) {
  const [showNote, setShowNote] = useState(false);
  
  const Icon =
    (Icons[item.icon_name as keyof typeof Icons] as Icons.LucideIcon) ??
    Icons.ConciergeBell;

  return (
    <Card className="glass-panel group relative overflow-hidden rounded-[2.5rem] p-8 transition-all hover:border-primary/30">
      <div className="flex items-start justify-between">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform group-hover:scale-110 group-hover:rotate-3 shadow-inner">
          <Icon className="h-8 w-8" />
        </div>
        
        <div className={cn(
          "h-2 w-2 rounded-full mt-2",
          item.available ? "bg-emerald-500 animate-pulse" : "bg-rose-500"
        )} />
      </div>

      <h3 className="text-2xl font-bold text-white tracking-tight">{item.name}</h3>
      <p className="mt-3 text-sm leading-relaxed text-slate-400">{item.description}</p>
      
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
              className="mt-6 h-24 w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 transition-colors focus:border-primary/30 resize-none"
            />
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="mt-8 flex gap-3">
        <button
          onClick={() => setShowNote(!showNote)}
          className={cn(
            "flex h-14 w-14 items-center justify-center rounded-2xl border transition-all",
            showNote 
              ? "bg-primary/10 border-primary/30 text-primary" 
              : "bg-white/5 border-white/5 text-slate-400 hover:text-white hover:bg-white/10"
          )}
          title={addInstructionsLabel}
        >
          {showNote ? <MessageSquareX className="h-6 w-6" /> : <MessageSquarePlus className="h-6 w-6" />}
        </button>

        <Button 
          className="h-14 flex-1 button-glow rounded-2xl text-sm font-bold uppercase tracking-wider" 
          onClick={onRequest} 
          disabled={!item.available || isLoading}
          variant={item.available ? "primary" : "secondary"}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              {sendingLabel}
            </div>
          ) : actionLabel}
        </Button>
      </div>

      <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-primary/5 blur-2xl opacity-0 transition-opacity group-hover:opacity-100" />
    </Card>
  );
}
