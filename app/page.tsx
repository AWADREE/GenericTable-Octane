"use client";

import React, { useEffect } from "react";
import GenericTable from "@/components/ui/generic-table";
import { ColumnType } from "@/types/generic-table.type";
import { TableActions } from "@/components/ui/table-actions";
import { useMutation } from "@tanstack/react-query";
import AxiosInstance from "@/api/axiosInstance";
import { baseURL } from "@/api/baseURL";
import Endpoints from "@/api/Endpoints";

const exampleData = [
  {
    user_id: 1,
    username: "name",
    email: "name@email.com",
    role: "user",
    active: true,
  },
];

export default function page() {
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
    }
  }, [getUsersResponse]);
  //-------------------------------------------------------------------------------------------

  //-----------------------useMutation hook to update a user --------------------------------
  const {
    data: updateUserResponse,
    isPending: updateUserIsPending,
    isSuccess: updateUserIsSuccess,
    isError: updateUserIsError,
    error: updateUserError,
    mutate: updateUserMutate,
  } = useMutation({
    mutationFn: async (params: { id: string; updatedObject: any }) => {
      return AxiosInstance.put(
        `${baseURL}${Endpoints.updateUser}${params.id}`,
        params.updatedObject
      );
    },
  });

  const updateUser = (orderId: string, updatedObject: any) => {
    updateUserMutate({
      id: orderId,
      updatedObject: {},
    });
  };

  useEffect(() => {
    if (updateUserResponse) {
      console.log(updateUserResponse);
    }
  }, [updateUserResponse]);
  //-------------------------------------------------------------------------------------------
  //-----------------------useMutation hook to delete a user --------------------------------
  const {
    data: deleteUserResponse,
    isPending: deleteUserIsPending,
    isSuccess: deleteUserIsSuccess,
    isError: deleteUserIsError,
    error: deleteUserError,
    mutate: deleteUserMutate,
  } = useMutation({
    mutationFn: async (params: { id: string }) => {
      return AxiosInstance.delete(
        `${baseURL}${Endpoints.deleteUser}${params.id}`
      );
    },
  });

  const deleteOrder = (orderId: string) => {
    deleteUserMutate({
      id: orderId,
    });
  };

  useEffect(() => {
    if (deleteUserResponse) {
      console.log(deleteUserResponse);
    }
  }, [deleteUserResponse]);
  //-------------------------------------------------------------------------------------------
  //-----------------------useMutation hook to get a user details --------------------------------
  const {
    data: getUserDetailsResponse,
    isPending: getUserDetailsIsPending,
    isSuccess: getUserDetailsIsSuccess,
    isError: getUserDetailsIsError,
    error: getUserDetailsError,
    mutate: getUserDetailsMutate,
  } = useMutation({
    mutationFn: async (params: { id: string }) => {
      return AxiosInstance.get(
        `${baseURL}${Endpoints.getUserDetails}${params.id}`
      );
    },
  });

  const getUserDetails = (orderId: string) => {
    getUserDetailsMutate({
      id: orderId,
    });
  };

  useEffect(() => {
    if (getUserDetailsResponse) {
      console.log(getUserDetailsResponse);
    }
  }, [getUserDetailsResponse]);
  //-------------------------------------------------------------------------------------------

  return (
    <>
      <GenericTable
        specialFields={[
          // {
          //   specialFieldName: "account_name",
          //   rendering: (row) => (
          //     <p style={{ color: "red" }}> {row.account_name} </p>
          //   ),
          // },
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
        data={getUsersResponse?.data ? getUsersResponse.data : [{}]}
        types={{
          user_id: ColumnType.Text,
          username: ColumnType.Text,
          email: ColumnType.Text,
          role: ColumnType.Enum,
          active: ColumnType.Boolean, //TODO made a bool type
        }}
        enumsOptions={{
          role: ["admin", "user", "guest"],
        }}
      />
    </>
  );
}
