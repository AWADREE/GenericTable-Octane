"use client";

import React, { useEffect } from "react";
import GenericTable from "@/components/ui/generic-table";
import { ColumnType } from "@/types/generic-table.type";
import { TableActions } from "@/components/ui/table-actions";
import { baseURL } from "@/api/baseURL";
import Endpoints from "@/api/Endpoints";
import { useMutation } from "@tanstack/react-query";
import AxiosInstance from "@/api/axiosInstance";
import useStore from "@/stores/useStore";

// const STATIC_DATA = [
//   {
//     order_id: "order_01",
//     customer_name: "customer_01",
//     order_date: "2024-08-19",
//     status: "shipped",
//     total_amount: 474.05,
//   },
//   {
//     order_id: "order_02",
//     customer_name: "customer_02",
//     order_date: "2024-08-11",
//     status: "pending",
//     total_amount: 90.13,
//   },
//   {
//     order_id: "order_03",
//     customer_name: "customer_03",
//     order_date: "2024-08-15",
//     status: "pending",
//     total_amount: 347.96,
//   },
//   {
//     order_id: "order_04",
//     customer_name: "customer_04",
//     order_date: "2024-09-07",
//     status: "pending",
//     total_amount: 295.18,
//   },
//   {
//     order_id: "order_05",
//     customer_name: "customer_05",
//     order_date: "2024-08-22",
//     status: "cancelled",
//     total_amount: 431.22,
//   },
//   {
//     order_id: "order_06",
//     customer_name: "customer_06",
//     order_date: "2024-08-16",
//     status: "shipped",
//     total_amount: 72.49,
//   },
//   {
//     order_id: "order_07",
//     customer_name: "customer_07",
//     order_date: "2024-08-10",
//     status: "cancelled",
//     total_amount: 315.03,
//   },
//   {
//     order_id: "order_08",
//     customer_name: "customer_08",
//     order_date: "2024-08-16",
//     status: "shipped",
//     total_amount: 477.38,
//   },
//   {
//     order_id: "order_09",
//     customer_name: "customer_09",
//     order_date: "2024-08-25",
//     status: "cancelled",
//     total_amount: 378.11,
//   },
//   {
//     order_id: "order_10",
//     customer_name: "customer_10",
//     order_date: "2024-08-31",
//     status: "pending",
//     total_amount: 85.98,
//   },
//   {
//     order_id: "order_11",
//     customer_name: "customer_11",
//     order_date: "2024-08-15",
//     status: "shipped",
//     total_amount: 492.19,
//   },
//   {
//     order_id: "order_12",
//     customer_name: "customer_12",
//     order_date: "2024-08-29",
//     status: "delivered",
//     total_amount: 258.09,
//   },
//   {
//     order_id: "order_13",
//     customer_name: "customer_13",
//     order_date: "2024-08-29",
//     status: "pending",
//     total_amount: 143.0,
//   },
//   {
//     order_id: "order_14",
//     customer_name: "customer_14",
//     order_date: "2024-09-04",
//     status: "cancelled",
//     total_amount: 371.24,
//   },
//   {
//     order_id: "order_15",
//     customer_name: "customer_15",
//     order_date: "2024-08-17",
//     status: "pending",
//     total_amount: 409.28,
//   },
//   {
//     order_id: "order_16",
//     customer_name: "customer_16",
//     order_date: "2024-08-12",
//     status: "shipped",
//     total_amount: 319.4,
//   },
//   {
//     order_id: "order_17",
//     customer_name: "customer_17",
//     order_date: "2024-09-03",
//     status: "delivered",
//     total_amount: 176.96,
//   },
//   {
//     order_id: "order_18",
//     customer_name: "customer_18",
//     order_date: "2024-08-14",
//     status: "shipped",
//     total_amount: 487.37,
//   },
//   {
//     order_id: "order_19",
//     customer_name: "customer_19",
//     order_date: "2024-08-13",
//     status: "delivered",
//     total_amount: 436.15,
//   },
//   {
//     order_id: "order_20",
//     customer_name: "customer_20",
//     order_date: "2024-09-04",
//     status: "delivered",
//     total_amount: 109.33,
//   },
// ];

export default function OrdersPage() {
  const orders = useStore((state) => state.orders);
  const setOrders = useStore((state) => state.setOrders);

  ////------------------useMutation hook to get all orders ------------------------------
  const {
    data: getOrdersResponse,
    isPending: getOrdersIsPending,
    isSuccess: getOrdersIsSuccess,
    isError: getOrdersIsError,
    error: getOrdersError,
    mutate: getOrdersMutate,
  } = useMutation({
    mutationFn: async () => {
      return AxiosInstance.get(`${baseURL}${Endpoints.getAllOrders}`);
    },
  });

  useEffect(() => {
    getOrdersMutate();
  }, []);

  useEffect(() => {
    if (getOrdersResponse) {
      console.log(getOrdersResponse?.data);
      setOrders(getOrdersResponse?.data);
    }
  }, [getOrdersResponse]);
  //-------------------------------------------------------------------------------------------

  return (
    <>
      <GenericTable
        specialFields={[
          {
            specialFieldName: "Actions",
            rendering: (row, types, identfier, enumsOptions) => (
              <TableActions
                row={row}
                types={types}
                enumsOptions={enumsOptions}
                identfier={identfier}
                endpoints={{
                  edit: `${baseURL}${Endpoints.updateOrder}`,
                  delete: `${baseURL}${Endpoints.deleteOrder}`,
                  getDetails: `${baseURL}${Endpoints.getOrderDetails}`,
                }}
                refresh={
                  // () => {}
                  getOrdersMutate
                }
              />
            ),
          },
        ]}
        extraColumns={["Actions"]}
        data={
          // STATIC_DATA
          orders ? orders : [{ order_id: "0" }]
        }
        types={{
          order_id: ColumnType.Text,
          customer_name: ColumnType.Text,
          order_date: ColumnType.Date,
          status: ColumnType.Enum,
          total_amount: ColumnType.Number,
        }}
        enumsOptions={{
          status: ["Canceled", "pending", "shipped", "delivered"],
        }}
        identfier="order_id"
        loadingState={
          // false
          getOrdersIsPending
        }
      />
    </>
  );
}
