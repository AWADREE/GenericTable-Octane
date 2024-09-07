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

export default function UsersPage() {
  const users = useStore((state) => state.users);
  const setUsers = useStore((state) => state.setUsers);

  // const STATIC_Data: any[] = [
  //   {
  //     user_id: "user_01",
  //     username: "user_01_name",
  //     email: "user_01@example.com",
  //     role: "admin",
  //     active: true,
  //   },
  //   {
  //     user_id: "user_02",
  //     username: "user_02_name",
  //     email: "user_02@example.com",
  //     role: "guest",
  //     active: false,
  //   },
  //   {
  //     user_id: "user_03",
  //     username: "user_03_name",
  //     email: "user_03@example.com",
  //     role: "admin",
  //     active: false,
  //   },
  //   {
  //     user_id: "user_04",
  //     username: "user_04_name",
  //     email: "user_04@example.com",
  //     role: "user",
  //     active: true,
  //   },
  //   {
  //     user_id: "user_05",
  //     username: "user_05_name",
  //     email: "user_05@example.com",
  //     role: "user",
  //     active: true,
  //   },
  //   {
  //     user_id: "user_06",
  //     username: "user_06_name",
  //     email: "user_06@example.com",
  //     role: "user",
  //     active: true,
  //   },
  //   {
  //     user_id: "user_07",
  //     username: "user_07_name",
  //     email: "user_07@example.com",
  //     role: "user",
  //     active: false,
  //   },
  //   {
  //     user_id: "user_08",
  //     username: "user_08_name",
  //     email: "user_08@example.com",
  //     role: "admin",
  //     active: true,
  //   },
  //   {
  //     user_id: "user_09",
  //     username: "user_09_name",
  //     email: "user_09@example.com",
  //     role: "guest",
  //     active: false,
  //   },
  //   {
  //     user_id: "user_10",
  //     username: "user_10_name",
  //     email: "user_10@example.com",
  //     role: "user",
  //     active: false,
  //   },
  //   {
  //     user_id: "user_11",
  //     username: "user_11_name",
  //     email: "user_11@example.com",
  //     role: "user",
  //     active: false,
  //   },
  //   {
  //     user_id: "user_12",
  //     username: "user_12_name",
  //     email: "user_12@example.com",
  //     role: "user",
  //     active: true,
  //   },
  //   {
  //     user_id: "user_13",
  //     username: "user_13_name",
  //     email: "user_13@example.com",
  //     role: "admin",
  //     active: false,
  //   },
  //   {
  //     user_id: "user_14",
  //     username: "user_14_name",
  //     email: "user_14@example.com",
  //     role: "user",
  //     active: true,
  //   },
  //   {
  //     user_id: "user_15",
  //     username: "user_15_name",
  //     email: "user_15@example.com",
  //     role: "user",
  //     active: false,
  //   },
  //   {
  //     user_id: "user_16",
  //     username: "user_16_name",
  //     email: "user_16@example.com",
  //     role: "guest",
  //     active: false,
  //   },
  //   {
  //     user_id: "user_17",
  //     username: "user_17_name",
  //     email: "user_17@example.com",
  //     role: "guest",
  //     active: true,
  //   },
  //   {
  //     user_id: "user_18",
  //     username: "user_18_name",
  //     email: "user_18@example.com",
  //     role: "user",
  //     active: false,
  //   },
  //   {
  //     user_id: "user_19",
  //     username: "user_19_name",
  //     email: "user_19@example.com",
  //     role: "admin",
  //     active: false,
  //   },
  //   {
  //     user_id: "user_20",
  //     username: "user_20_name",
  //     email: "user_20@example.com",
  //     role: "user",
  //     active: false,
  //   },
  // ];

  //------------------useMutation hook to get all users ------------------------------
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
                refresh={
                  // () => {}
                  getUsersMutate
                }
              />
            ),
          },
        ]}
        extraColumns={["Actions"]}
        data={
          // STATIC_Data
          users ? users : [{ user_id: "0" }]
        }
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
        loadingState={
          // false
          getUsersIsPending
        }
      />
    </>
  );
}
