import { Metadata } from "next";
import EventSection from "@/components/events/EventsSection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EventSectionUpcoming from "@/components/events/EventsSectionUpcoming";

// METADATA
export const metadata: Metadata = {
  title: "Events",
};

// HOME PAGE
export default async function EventPage() {
  return (
    <main>
      <h2 className="text-2xl uppercase font-semibold tracking-wide">Events</h2>
      <Tabs>
        <TabsList className="rounded-sm mt-3">
          <TabsTrigger
            value="upcoming-events"
            className="flex-1 text-center rounded-[10px]"
          >
            Upcoming Events
          </TabsTrigger>
          <TabsTrigger
            value="past-events"
            className="flex-1 text-center rounded-[10px]"
          >
            Past Events
          </TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming-events">
          <EventSectionUpcoming />
        </TabsContent>
        <TabsContent value="past-events">
          <EventSection />
        </TabsContent>
      </Tabs>
    </main>
  );
}
