"use client";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const columns: ColumnDef<OrderColumnType>[] = [
  {
    accessorKey: "_id",
    header: "Order",
    cell: ({ row }) => {
      return (
        <Link
          href={`/orders/${row.original._id}`}
          className="hover:text-red-1"
        >
          {row.original._id}
        </Link>
      );
    },
  },
  {
    accessorKey: "customer",
    header: "Customer",
  },
  {
    accessorKey: "products",
    header: "Products",
  },
  {
    accessorKey: "totalAmount",
    header: "Total (đ)",
    cell: ({ row }) => {
      // Nhân giá trị totalAmount lên 100
      const totalAmount = row.original.totalAmount * 100;

      // Định dạng số với dấu chấm phân cách
      const formattedAmount = totalAmount.toLocaleString('vi-VN');

      return <span>{formattedAmount} đ</span>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
];