"use client";

import { useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { Team } from "@/payload-types";
import { CreateUserForm } from "./create-user-form";
import type { IformSchema } from "./create-user-form/zod";

export function CreateUserModalClient({
  data,
  handler,
}: {
  data: { teams: Team[] };
  handler: { handleCreateUser: (data: IformSchema) => Promise<void> };
}) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className={buttonVariants({})}>Criar</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">Criar User</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <CreateUserForm
          data={data}
          handler={handler}
          onSuccess={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
