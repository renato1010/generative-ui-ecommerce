"use client";

import React from "react";
import { Toaster } from "@/components/ui/sonner";
import { StreamProvider } from "@/providers/Stream";
import { ThreadProvider } from "@/providers/Thread";
import { Thread } from "@/components/thread";

export default function DemoPage(): React.ReactNode {
  return (
    <React.Suspense fallback={<div>Loading (layout)...</div>}>
      <Toaster />
      <ThreadProvider>
        <StreamProvider>
          <Thread />
        </StreamProvider>
      </ThreadProvider>
    </React.Suspense>
  );
}
