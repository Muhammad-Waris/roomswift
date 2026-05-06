"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

import { useCatalog, useRequests } from "@/hooks/use-roomswift-data";
import { useHotItems } from "@/hooks/use-hot-items";
import { MenuCard } from "@/components/menu-card";
import { RequestStatusList } from "@/components/request-status-list";
import { SupabaseBanner } from "@/components/supabase-banner";
import { FloatingStatusHUD } from "@/components/floating-status-hud";
import { Card } from "@/components/ui/card";
import { LoadingSkeleton } from "@/components/loading-skeleton";
import { HotSellers } from "@/components/hot-sellers";
import {
  translateItemName,
  translateMenuItem
} from "@/lib/localized-content";
import { ServiceMode } from "@/types";

// Atomic Components
import { RoomHeader } from "./room/room-header";
import { QuickConcierge } from "./room/quick-concierge";
import { MenuTabs } from "./room/menu-tabs";
import { RoomOperationalBoard } from "./room/room-operational-board";
import { GuestServicesSection } from "./room/guest-services-section";

const tabs = ["menu", "services", "status"] as const;

export function RoomPageClient({
  roomNumber,
  tableId,
  mode = "hotel"
}: {
  roomNumber?: string;
  tableId?: string;
  mode?: ServiceMode;
}) {
  const { t } = useTranslation();
  const isRestaurantMode = mode === "restaurant";
  const [activeTab, setActiveTab] = useState<typeof tabs[number]>(
    isRestaurantMode ? "menu" : "services"
  );
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [notes, setNotes] = useState<Record<string, string>>({});
  const locationRoomId = roomNumber ?? "101";
  const locationTableId = tableId ?? "T01";

  const {
    menuItems,
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
  } = useRequests(
    isRestaurantMode
      ? { mode, tableId: locationTableId }
      : { mode, roomId: locationRoomId }
  );

  const { hotItems, loading: hotItemsLoading } = useHotItems({
    requests,
    mode,
    preferLocal: !isRealtimeEnabled,
    limit: 5
  });

  const visibleTabs = isRestaurantMode ? ["menu", "status"] : [...tabs];

  useEffect(() => {
    if (isRestaurantMode && activeTab === "services") {
      setActiveTab("menu");
    }
  }, [activeTab, isRestaurantMode]);

  const categories = ["ALL", ...new Set(menuItems.map((item) => item.category))];

  const filteredItems = menuItems.filter(
    (item) => selectedCategory === "ALL" || item.category === selectedCategory
  );

  const handleRequest = async (input: {
    requestType: "food" | "service";
    itemId?: string | null;
    itemName: string;
    guestNote?: string;
  }) => {
    if (isRestaurantMode && input.requestType === "service") {
      return;
    }

    try {
      await createRequest({
        mode,
        roomNumber: isRestaurantMode ? undefined : locationRoomId,
        roomId: isRestaurantMode ? undefined : locationRoomId,
        tableId: isRestaurantMode ? locationTableId : undefined,
        requestType: input.requestType,
        itemId: input.itemId,
        itemName: input.itemName,
        guestNote: input.guestNote ?? (input.itemId ? notes[input.itemId] : undefined)
      });
      toast.success(
        t("guest.requestSuccess", {
          itemName: translateItemName(t, {
            item_id: input.itemId ?? null,
            item_name: input.itemName
          })
        })
      );
      if (input.itemId) {
        setNotes((prev) => ({ ...prev, [input.itemId!]: "" }));
      }
    } catch (err) {
      toast.error(t("guest.requestError"));
    }
  };
  const latestRequest = requests[0] ?? null;
  const sortedRequests = [...requests].sort(
    (a, b) => +new Date(b.created_at) - +new Date(a.created_at)
  );

  return (
    <main className="min-h-screen pb-24 sm:pb-10">
      {/* Real-time Status Overlay */}
      <FloatingStatusHUD
        latestRequest={latestRequest}
        activeTab={activeTab}
        onViewStatus={() => setActiveTab("status")}
      />

      <div className="mx-auto max-w-6xl space-y-8 px-4 py-6 sm:px-6 lg:px-8">
        <RoomHeader 
          roomNumber={locationRoomId}
          tableId={locationTableId}
          mode={mode}
        />

        <section className="space-y-8">
          {!isRestaurantMode ? <QuickConcierge onRequest={handleRequest} /> : null}

          <section className="space-y-6">
            <MenuTabs 
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              tabs={visibleTabs}
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />

            <SupabaseBanner
              isRealtimeEnabled={isRealtimeEnabled}
              error={catalogError || requestsError}
            />

            <div className="min-h-[320px]">
              {activeTab === "menu" && (
                <div className="space-y-6">
                  <HotSellers
                    hotItems={hotItems}
                    menuItems={menuItems}
                    loading={hotItemsLoading}
                    mutatingIds={mutatingIds}
                    onOrder={(item) =>
                      handleRequest({
                        requestType: "food",
                        itemId: item.id,
                        itemName: item.name
                      })
                    }
                  />

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {catalogLoading ? (
                      [1, 2, 3].map((i) => (
                        <Card key={i} className="glass-panel space-y-5 rounded-[2rem] p-5">
                          <LoadingSkeleton className="h-48 w-full rounded-3xl" />
                          <div className="space-y-2">
                            <LoadingSkeleton className="h-7 w-2/3" />
                            <LoadingSkeleton className="h-4 w-full" />
                          </div>
                        </Card>
                      ))
                    ) : (
                      filteredItems.map((item, i) => (
                        <motion.div
                          key={item.id}
                          initial={{ y: 16, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: i * 0.04 }}
                        >
                          <MenuCard
                            item={translateMenuItem(t, item)}
                            availabilityLabel={t("guest.available")}
                            unavailableLabel={t("guest.unavailable")}
                            actionLabel={t("guest.submitFood")}
                            notePlaceholder={t("guest.notePlaceholder")}
                            processingLabel={t("guest.processing")}
                            specialInstructionsLabel={t("guest.specialInstructions")}
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
                </div>
              )}

              {activeTab === "services" && !isRestaurantMode && (
                <GuestServicesSection mutatingIds={mutatingIds} onRequest={handleRequest} />
              )}

              {activeTab === "status" && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <RequestStatusList
                    requests={sortedRequests}
                    emptyLabel={t("guest.noRequests")}
                  />
                </div>
              )}
            </div>
          </section>

          <RoomOperationalBoard 
            statusCounts={statusCounts}
            requestsLoading={requestsLoading}
            latestRequest={latestRequest}
            mode={mode}
          />
        </section>
      </div>
    </main>
  );
}
