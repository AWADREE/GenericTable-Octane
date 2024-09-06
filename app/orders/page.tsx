"use client";

import React, { useEffect } from "react";
import GenericTable from "@/components/ui/generic-table";
import { ColumnType } from "@/types/generic-table.type";
import { TableActions } from "@/components/ui/table-actions";
import { baseURL } from "@/api/baseURL";
import Endpoints from "@/api/Endpoints";
import { useMutation } from "@tanstack/react-query";
import AxiosInstance from "@/api/axiosInstance";

export default function page() {
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
                refresh={getOrdersMutate}
              />
            ),
          },
        ]}
        extraColumns={["Actions"]}
        data={
          getOrdersResponse?.data ? getOrdersResponse.data : [{ order_id: "0" }]
        }
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
        identfier="order_id"
      />
    </>
  );
}
