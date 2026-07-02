"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import BankAccountForm from "@/app/(app)/deferment-notification/_components/BankAccountForm";
import type { Bank } from "@/lib/banks";

export default function NewCallDialog({ banks }: { banks: Bank[] }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Start New Call
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Start a Deferment Call</DialogTitle>
        </DialogHeader>
        <BankAccountForm banks={banks} onCallRecord={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
