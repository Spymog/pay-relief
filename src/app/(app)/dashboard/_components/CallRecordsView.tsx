"use client";

import { useState } from "react";
import CallRecordsList from "./CallRecordsList";
import CallDetailPanel from "./CallDetailPanel";

export default function CallRecordsView() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <div className="grid items-start gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
      <CallRecordsList selectedId={selectedId} onSelect={setSelectedId} />
      <CallDetailPanel recordId={selectedId} />
    </div>
  );
}
