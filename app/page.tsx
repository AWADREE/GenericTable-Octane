"use client";

import React from "react";
import GenericTable from "@/components/ui/generic-table";
import { ColumnType } from "@/types/generic-table.type";

const exampleData = [
  {
    order_id: "1",
    customer_name: "John Smith",
    order_date: "2024-03-05T12:00:00",
    status: "Pending",
    total_amount: "150",
  },
  {
    order_id: "2",
    customer_name: "Alice Johnson",
    order_date: "2024-04-10T12:00:00",
    status: "Shipped",
    total_amount: "200",
  },
  {
    order_id: "3",
    customer_name: "David Brown",
    order_date: "2024-01-22T12:00:00",
    status: "Delivered",
    total_amount: "75",
  },
  {
    order_id: "4",
    customer_name: "Sophia Martinez",
    order_date: "2024-05-30T12:00:00",
    status: "Canceled",
    total_amount: "120",
  },
  {
    order_id: "5",
    customer_name: "Michael Lee",
    order_date: "2024-02-15T12:00:00",
    status: "Pending",
    total_amount: "85",
  },
  {
    order_id: "6",
    customer_name: "Emily Davis",
    order_date: "2024-03-08T12:00:00",
    status: "Shipped",
    total_amount: "250",
  },
  {
    order_id: "7",
    customer_name: "Daniel Wilson",
    order_date: "2024-04-01T12:00:00",
    status: "Delivered",
    total_amount: "180",
  },
  {
    order_id: "8",
    customer_name: "Laura Thompson",
    order_date: "2024-05-05T12:00:00",
    status: "Pending",
    total_amount: "95",
  },
  {
    order_id: "9",
    customer_name: "Robert Miller",
    order_date: "2024-06-12T12:00:00",
    status: "Shipped",
    total_amount: "130",
  },
  {
    order_id: "10",
    customer_name: "Linda Anderson",
    order_date: "2024-07-19T12:00:00",
    status: "Delivered",
    total_amount: "220",
  },
  {
    order_id: "11",
    customer_name: "Emily Davis",
    order_date: "2024-03-08T12:00:00",
    status: "Shipped",
    total_amount: "250",
  },
  {
    order_id: "12",
    customer_name: "Daniel Wilson",
    order_date: "2024-04-01T12:00:00",
    status: "Delivered",
    total_amount: "180",
  },
  {
    order_id: "13",
    customer_name: "Laura Thompson",
    order_date: "2024-05-05T12:00:00",
    status: "Pending",
    total_amount: "95",
  },
  {
    order_id: "14",
    customer_name: "Robert Miller",
    order_date: "2024-06-12T12:00:00",
    status: "Shipped",
    total_amount: "130",
  },
  {
    order_id: "15",
    customer_name: "Linda Anderson",
    order_date: "2024-07-19T12:00:00",
    status: "Delivered",
    total_amount: "220",
  },
];

export default function page() {
  return (
    <>
      <GenericTable
        specialFields={[
          {
            specialFieldName: "account_name",
            rendering: (row) => (
              <p style={{ color: "red" }}> {row.account_name} </p>
            ),
          },
          {
            specialFieldName: "Actions",
            rendering: (row) => (
              <p style={{ color: "red" }}>{row.account_name}</p>
            ),
          },
        ]}
        extraColumns={["Actions"]}
        data={exampleData}
        types={{
          order_id: ColumnType.Text,
          customer_name: ColumnType.Text,
          order_date: ColumnType.Date,
          status: ColumnType.Text,
          total_amount: ColumnType.Number,
        }}
      />
    </>
  );
}
