"use client";

import { ColumnDef } from "@tanstack/react-table";
import Delete from "../customui/Delete";
import Link from "next/link";

export const columns: ColumnDef<BannerType>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <Link
        href={`/banners/${row.original._id}`}
        className="hover:text-red-1"
      >
        {row.original.title}
      </Link>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <Delete item="banner" id={row.original._id} />,
  },
];