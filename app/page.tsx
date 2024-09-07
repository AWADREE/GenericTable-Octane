"use client";

import React, { useEffect } from "react";
import GenericTable from "@/components/ui/generic-table";
import { ColumnType } from "@/types/generic-table.type";
import { TableActions } from "@/components/ui/table-actions";
import { useMutation } from "@tanstack/react-query";
import AxiosInstance from "@/api/axiosInstance";
import { baseURL } from "@/api/baseURL";
import Endpoints from "@/api/Endpoints";
import useStore from "@/stores/useStore";

export default function page() {
  const users = useStore((state) => state.users);
  const setUsers = useStore((state) => state.setUsers);

  ////------------------useMutation hook to get all users ------------------------------
  const {
    data: getUsersResponse,
    isPending: getUsersIsPending,
    isSuccess: getUsersIsSuccess,
    isError: getUsersIsError,
    error: getUsersError,
    mutate: getUsersMutate,
  } = useMutation({
    mutationFn: async () => {
      return AxiosInstance.get(`${baseURL}${Endpoints.getAllUsers}`);
    },
  });

  useEffect(() => {
    getUsersMutate();
  }, []);

  useEffect(() => {
    if (getUsersResponse) {
      console.log(getUsersResponse?.data);
      setUsers(getUsersResponse?.data);
    }
  }, [getUsersResponse]);
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
                  edit: `${baseURL}${Endpoints.updateUser}`,
                  delete: `${baseURL}${Endpoints.deleteUser}`,
                  getDetails: `${baseURL}${Endpoints.getUserDetails}`,
                }}
                refresh={getUsersMutate}
              />
            ),
          },
        ]}
        extraColumns={["Actions"]}
        data={users ? users : [{ user_id: "0" }]}
        types={{
          user_id: ColumnType.Text,
          username: ColumnType.Text,
          email: ColumnType.Text,
          role: ColumnType.Enum,
          active: ColumnType.Boolean,
        }}
        enumsOptions={{
          role: ["admin", "user", "guest"],
        }}
        identfier="user_id"
      />
    </>
  );
}
