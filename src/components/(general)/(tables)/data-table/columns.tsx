"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { startTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Team, User } from "@/payload-types";
import { HandleDeleteInBulkById, HandleDeleteUserById } from "./actions";

const idCollumn: ColumnDef<User> = {
  accessorKey: "id",
  header: "ID",
  cell: ({ row }) => {
    return (
      <Tooltip>
        <TooltipTrigger>
          {(row.getValue("id") as string).slice(0, 8)}...
        </TooltipTrigger>
        <TooltipContent>
          <p>{row.getValue("id")}</p>
        </TooltipContent>
      </Tooltip>
    );
  },
};
const emailCollumn: ColumnDef<User> = {
  accessorKey: "email",
  header: ({ column }) => {
    return (
      <Button
        variant="ghost"
        size={"sm"}
        onClick={() => {
          column.toggleSorting(column.getIsSorted() === "asc");
        }}
      >
        Email
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    );
  },
};
const teamCollumn: ColumnDef<User> = {
  accessorKey: "team",
  header: "Teams",
  cell: ({ row }) => {
    return <p>{(row.getValue("team") as Team[]).map((team) => team.name)}</p>;
  },
};
const actionCollumn: ColumnDef<User> = {
  id: "actions",
  header: ({ table }) => {
    const ids = table.getSelectedRowModel().rows.map((row) => row.original.id);

    function handleDeleteInBulkById() {
      startTransition(async () => {
        const response = await HandleDeleteInBulkById(ids);
        if (!response.success) {
          toast(response.error);
        } else {
          toast("Usuários deletados com sucesso!");
        }
      });
    }

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={handleDeleteInBulkById}>
            Bulk Delete
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Bulk Disable</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
  cell: ({ row }) => {
    const user = row.original;

    function handleDeleteUserById() {
      startTransition(async () => {
        const response = await HandleDeleteUserById(user.id);
        if (!response.success) {
          toast(response.error);
        } else {
          toast("Usuário deletados com sucesso!");
        }
      });
    }

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem>View details</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => navigator.clipboard.writeText(user.id)}
          >
            Copy ID
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Disable</DropdownMenuItem>
          <DropdownMenuItem onClick={handleDeleteUserById}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
};

export const columns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  idCollumn,
  emailCollumn,
  teamCollumn,
  actionCollumn,
];
