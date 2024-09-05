"use client";

import React from "react";
import GenericTable from "@/components/ui/generic-table";
import { ColumnType } from "@/types/generic-table.type";
import { TableActions } from "@/components/ui/table-actions";

const exampleData = [
  {
    order_id: "1",
    customer_name: "John Smith",
    order_date: "2024-03-05T12:00:00",
    status: "Pending",
    total_amount: "150",
    total_aount: "150",
    total_amont: "150",
    total_amoun: "150",
    total_amout: "150",
    total_amt: "150",
    total_ount: "150",
    total_aoun: "150",
    total_aounf: "150",
    total_aounwe: "150",
    total_aouna: "150",
    total_aasdoun: "150",
  },
  {
    order_id: "2",
    customer_name: "Alice Johnson",
    order_date: "2024-04-10T12:00:00",
    status: "Shipped",
    total_amount: "200",
    total_aount: "150",
    total_amont: "150",
    total_amoun: "150",
    total_amout: "150",
    total_amt: "150",
    total_ount: "150",
    total_aoun: "150",
    total_aounf: "150",
    total_aounwe: "150",
    total_aouna: "150",
    total_aasdoun: "150",
  },
  {
    order_id: "3",
    customer_name: "David Brown",
    order_date: "2024-01-22T12:00:00",
    status: "Delivered",
    total_amount: "75",
    total_aount: "150",
    total_amont: "150",
    total_amoun: "150",
    total_amout: "150",
    total_amt: "150",
    total_ount: "150",
    total_aoun: "150",
    total_aounf: "150",
    total_aounwe: "150",
    total_aouna: "150",
    total_aasdoun: "150",
  },
  {
    order_id: "4",
    customer_name: "Sophia Martinez",
    order_date: "2024-05-30T12:00:00",
    status: "Canceled",
    total_amount: "120",
    total_aount: "150",
    total_amont: "150",
    total_amoun: "150",
    total_amout: "150",
    total_amt: "150",
    total_ount: "150",
    total_aoun: "150",
    total_aounf: "150",
    total_aounwe: "150",
    total_aouna: "150",
    total_aasdoun: "150",
  },
  {
    order_id: "5",
    customer_name: "Michael Lee",
    order_date: "2024-02-15T12:00:00",
    status: "Pending",
    total_amount: "85",
    total_aount: "150",
    total_amont: "150",
    total_amoun: "150",
    total_amout: "150",
    total_amt: "150",
    total_ount: "150",
    total_aoun: "150",
    total_aounf: "150",
    total_aounwe: "150",
    total_aouna: "150",
    total_aasdoun: "150",
  },
  {
    order_id: "6",
    customer_name: "Emily Davis",
    order_date: "2024-03-08T12:00:00",
    status: "Shipped",
    total_amount: "250",
    total_aount: "150",
    total_amont: "150",
    total_amoun: "150",
    total_amout: "150",
    total_amt: "150",
    total_ount: "150",
    total_aoun: "150",
    total_aounf: "150",
    total_aounwe: "150",
    total_aouna: "150",
    total_aasdoun: "150",
  },
  {
    order_id: "7",
    customer_name: "Daniel Wilson",
    order_date: "2024-04-01T12:00:00",
    status: "Delivered",
    total_amount: "180",
    total_aount: "150",
    total_amont: "150",
    total_amoun: "150",
    total_amout: "150",
    total_amt: "150",
    total_ount: "150",
    total_aoun: "150",
    total_aounf: "150",
    total_aounwe: "150",
    total_aouna: "150",
    total_aasdoun: "150",
  },
  {
    order_id: "8",
    customer_name: "Laura Thompson",
    order_date: "2024-05-05T12:00:00",
    status: "Pending",
    total_amount: "95",
    total_aount: "150",
    total_amont: "150",
    total_amoun: "150",
    total_amout: "150",
    total_amt: "150",
    total_ount: "150",
    total_aoun: "150",
    total_aounf: "150",
    total_aounwe: "150",
    total_aouna: "150",
    total_aasdoun: "150",
  },
  {
    order_id: "9",
    customer_name: "Robert Miller",
    order_date: "2024-06-12T12:00:00",
    status: "Shipped",
    total_amount: "130",
    total_aount: "150",
    total_amont: "150",
    total_amoun: "150",
    total_amout: "150",
    total_amt: "150",
    total_ount: "150",
    total_aoun: "150",
    total_aounf: "150",
    total_aounwe: "150",
    total_aouna: "150",
    total_aasdoun: "150",
  },
  {
    order_id: "10",
    customer_name: "Linda Anderson",
    order_date: "2024-07-19T12:00:00",
    status: "Delivered",
    total_amount: "220",
    total_aount: "150",
    total_amont: "150",
    total_amoun: "150",
    total_amout: "150",
    total_amt: "150",
    total_ount: "150",
    total_aoun: "150",
    total_aounf: "150",
    total_aounwe: "150",
    total_aouna: "150",
    total_aasdoun: "150",
  },
  {
    order_id: "11",
    customer_name: "Emily Davis",
    order_date: "2024-03-08T12:00:00",
    status: "Shipped",
    total_amount: "250",
    total_aount: "150",
    total_amont: "150",
    total_amoun: "150",
    total_amout: "150",
    total_amt: "150",
    total_ount: "150",
    total_aoun: "150",
    total_aounf: "150",
    total_aounwe: "150",
    total_aouna: "150",
    total_aasdoun: "150",
  },
  {
    order_id: "12",
    customer_name: "Daniel Wilson",
    order_date: "2024-04-01T12:00:00",
    status: "Delivered",
    total_amount: "180",
    total_aount: "150",
    total_amont: "150",
    total_amoun: "150",
    total_amout: "150",
    total_amt: "150",
    total_ount: "150",
    total_aoun: "150",
    total_aounf: "150",
    total_aounwe: "150",
    total_aouna: "150",
    total_aasdoun: "150",
  },
  {
    order_id: "13",
    customer_name: "Laura Thompson",
    order_date: "2024-05-05T12:00:00",
    status: "Pending",
    total_amount: "95",
    total_aount: "150",
    total_amont: "150",
    total_amoun: "150",
    total_amout: "150",
    total_amt: "150",
    total_ount: "150",
    total_aoun: "150",
    total_aounf: "150",
    total_aounwe: "150",
    total_aouna: "150",
    total_aasdoun: "150",
  },
  {
    order_id: "14",
    customer_name: "Robert Miller",
    order_date: "2024-06-12T12:00:00",
    status: "Shipped",
    total_amount: "130",
    total_aount: "150",
    total_amont: "150",
    total_amoun: "150",
    total_amout: "150",
    total_amt: "150",
    total_ount: "150",
    total_aoun: "150",
    total_aounf: "150",
    total_aounwe: "150",
    total_aouna: "150",
    total_aasdoun: "150",
  },
  {
    order_id: "15",
    customer_name: "Linda Anderson",
    order_date: "2024-07-19T12:00:00",
    status: "Delivered",
    total_amount: "220",
    total_aount: "150",
    total_amont: "150",
    total_amoun: "150",
    total_amout: "150",
    total_amt: "150",
    total_ount: "150",
    total_aoun: "150",
    total_aounf: "150",
    total_aounwe: "150",
    total_aouna: "150",
    total_aasdoun: "150",
  },
];

type paramsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

export default function page({ searchParams }: paramsProps) {
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
            rendering: (row, types, enumsOptions) => (
              <TableActions
                row={row}
                types={types}
                enumsOptions={enumsOptions}
              />
            ),
          },
        ]}
        extraColumns={["Actions"]}
        data={exampleData}
        types={{
          order_id: ColumnType.Text,
          customer_name: ColumnType.Text,
          order_date: ColumnType.Date,
          status: ColumnType.Enum,
          total_amount: ColumnType.Number,
        }}
        enumsOptions={{
          status: ["Canceled", "Pending", "Shipped", "Delivered"],
        }}
      />
    </>
  );
}
