import { AlertTriangle, DatabaseZap } from "lucide-react";

import { Card } from "@/components/ui/card";

export function SupabaseBanner({
  isRealtimeEnabled,
  error
}: {
  isRealtimeEnabled: boolean;
  error?: string | null;
}) {
  if (!error && isRealtimeEnabled) {
    return null;
  }

  return (
    <Card className="border-amber-400/20 bg-amber-500/10 p-4">
      <div className="flex items-start gap-3">
        <div className="rounded-2xl bg-amber-500/15 p-2 text-amber-200">
          {error ? <AlertTriangle className="h-5 w-5" /> : <DatabaseZap className="h-5 w-5" />}
        </div>
        <div>
          <p className="font-semibold text-amber-100">
            {error ? "Connection issue detected" : "Demo mode active"}
          </p>
          <p className="mt-1 text-sm text-amber-50/85">
            {error
              ? error
              : "Supabase env vars are missing, so RoomSwift is using local fallback data for the expo preview."}
          </p>
        </div>
      </div>
    </Card>
  );
}
