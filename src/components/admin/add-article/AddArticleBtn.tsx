"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import AddArticleDialog from "./AddArticle";


// Add upcoming event
export default function AddArticleBtn() {
  // Show dialog state
  const [showDialog, setShowDialog] = useState(false);
  return (
    <div>
      <Button onClick={() => setShowDialog(true)} variant={"outline"}>
        Add Article
      </Button>
      <AddArticleDialog open={showDialog} onOpenChange={setShowDialog} />
    </div>
  );
}
