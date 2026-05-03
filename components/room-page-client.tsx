"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";

import { useCatalog, useRequests } from "@/hooks/use-roomswift-data";
import { MenuCard } from "@/components/menu-card";
import { ServiceCard } from "@/components/service-card";
import { RequestStatusList } from "@/components/request-status-list";
import { SupabaseBanner } from "@/components/supabase-banner";
import { FloatingStatusHUD } from "@/components/floating-status-hud";
import { Card } from "@/components/ui/card";
import { LoadingSkeleton } from "@/components/loading-skeleton";

// Atomic Components
import { RoomHeader } from "./room/room-header";
import { QuickConcierge } from "./room/quick-concierge";
import { MenuTabs } from "./room/menu-tabs";
import { RoomOperationalBoard } from "./room/room-operational-board";

const tabs = ["menu", "services", "status"] as const;

export function RoomPageClient({ roomNumber }: { roomNumber: string }) {
  const [activeTab, setActiveTab] = useState<typeof tabs[number]>("menu");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [language, setLanguage] = useState<"en" | "ur">("en");
  const [notes, setNotes] = useState<Record<string, string>>({});

  const {
    menuItems,
    serviceItems,
    loading: catalogLoading,
    error: catalogError
  } = useCatalog();

  const {
    requests,
    loading: requestsLoading,
    error: requestsError,
    createRequest,
    roomSummary: statusCounts,
    mutatingIds,
    isRealtimeEnabled
  } = useRequests(roomNumber);

  const categories = ["ALL", ...new Set(menuItems.map((item) => item.category))];

  const filteredItems = menuItems.filter(
    (item) => selectedCategory === "ALL" || item.category === selectedCategory
  );

  const handleRequest = async (input: {
    requestType: "food" | "service";
    itemId?: string | null;
    itemName: string;
  }) => {
    try {
      await createRequest({
        roomNumber,
        requestType: input.requestType,
        itemId: input.itemId,
        itemName: input.itemName,
        guestNote: input.itemId ? notes[input.itemId] : undefined
      });
      toast.success(`${input.itemName} requested!`);
      if (input.itemId) {
        setNotes((prev) => ({ ...prev, [input.itemId!]: "" }));
      }
    } catch (err) {
      toast.error("Failed to place request. Please try again.");
    }
  };

  const translations = {
    en: {
      available: "Ready to order",
      unavailable: "Out of stock",
      submitFood: "Order Now",
      submitService: "Request Service",
      notePlaceholder: "Add special instructions...",
      noRequests: "No active requests for this suite."
    },
    ur: {
      available: "دستیاب ہے",
      unavailable: "دستیاب نہیں ہے",
      submitFood: "آرڈر کریں",
      submitService: "درخواست کریں",
      notePlaceholder: "خصوصی ہدایات درج کریں...",
      noRequests: "اس کمرے کے لیے کوئی فعال درخواست نہیں ہے۔"
    }
  };

  const t = translations[language];
  const latestRequest = requests[0] ?? null;
  const sortedRequests = [...requests].sort(
    (a, b) => +new Date(b.created_at) - +new Date(a.created_at)
  );

  return (
    <main className="min-h-screen pb-32 sm:pb-8">
      {/* Real-time Status Overlay */}
      <FloatingStatusHUD
        latestRequest={latestRequest}
        activeTab={activeTab}
        onViewStatus={() => setActiveTab("status")}
      />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-12">
        <RoomHeader 
          roomNumber={roomNumber} 
          language={language} 
          onLanguageChange={setLanguage} 
        />

        <section className="grid gap-12 grid-cols-1 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-12">
            <QuickConcierge onRequest={handleRequest} />

            <section className="space-y-8">
              <MenuTabs 
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                tabs={[...tabs]}
                categories={categories}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />

              <SupabaseBanner
                isRealtimeEnabled={isRealtimeEnabled}
                error={catalogError || requestsError}
              />

              <div className="min-h-[400px]">
                {activeTab === "menu" && (
                  <div className="grid gap-6 sm:grid-cols-2">
                    {catalogLoading ? (
                      [1, 2].map(i => (
                        <Card key={i} className="glass-panel space-y-6 p-6 rounded-[2.5rem]">
                          <LoadingSkeleton className="h-56 w-full rounded-3xl" />
                          <div className="space-y-2">
                            <LoadingSkeleton className="h-8 w-2/3" />
                            <LoadingSkeleton className="h-4 w-full" />
                          </div>
                        </Card>
                      ))
                    ) : (
                      filteredItems.map((item, i) => (
                        <motion.div
                          key={item.id}
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: i * 0.05 }}
                        >
                          <MenuCard
                            item={item}
                            availabilityLabel={t.available}
                            unavailableLabel={t.unavailable}
                            actionLabel={t.submitFood}
                            notePlaceholder={t.notePlaceholder}
                            noteValue={notes[item.id] ?? ""}
                            onNoteChange={(note) =>
                              setNotes((current) => ({ ...current, [item.id]: note }))
                            }
                            onOrder={() =>
                              handleRequest({
                                requestType: "food",
                                itemId: item.id,
                                itemName: item.name
                              })
                            }
                            isLoading={mutatingIds.includes(item.name)}
                          />
                        </motion.div>
                      ))
                    )}
                  </div>
                )}

                {activeTab === "services" && (
                  <div className="grid gap-6 sm:grid-cols-2">
                    {catalogLoading ? (
                      [1, 2].map(i => (
                        <Card key={i} className="glass-panel space-y-4 p-8 rounded-[2.5rem]">
                          <LoadingSkeleton className="h-14 w-14 rounded-2xl" />
                          <LoadingSkeleton className="h-8 w-1/2" />
                          <LoadingSkeleton className="h-20 w-full rounded-2xl" />
                        </Card>
                      ))
                    ) : (
                      serviceItems.map((item, i) => (
                        <motion.div
                          key={item.id}
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: i * 0.05 }}
                        >
                          <ServiceCard
                            item={item}
                            actionLabel={t.submitService}
                            notePlaceholder={t.notePlaceholder}
                            noteValue={notes[item.id] ?? ""}
                            onNoteChange={(note) =>
                              setNotes((current) => ({ ...current, [item.id]: note }))
                            }
                            onRequest={() =>
                              handleRequest({
                                requestType: "service",
                                itemId: item.id,
                                itemName: item.name
                              })
                            }
                            isLoading={mutatingIds.includes(item.name)}
                          />
                        </motion.div>
                      ))
                    )}
                  </div>
                )}

                {activeTab === "status" && (
                  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <RequestStatusList requests={sortedRequests} emptyLabel={t.noRequests} />
                  </div>
                )}
              </div>
            </section>
          </div>

          <RoomOperationalBoard 
            statusCounts={statusCounts}
            requestsLoading={requestsLoading}
            latestRequest={latestRequest}
          />
        </section>
      </div>
    </main>
  );
}
