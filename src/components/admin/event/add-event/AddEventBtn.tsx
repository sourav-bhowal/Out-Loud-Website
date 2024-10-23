"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import AddEventDialog from "./EventDialog";



// Add upcoming event
export default function AddEventBtn() {
  // Show dialog state
  const [showDialog, setShowDialog] = useState(false);
  return (
    <div>
      <Button onClick={() => setShowDialog(true)} variant={"outline"}>
        Add Event
      </Button>
      <AddEventDialog open={showDialog} onOpenChange={setShowDialog} />
    </div>
  );
}
