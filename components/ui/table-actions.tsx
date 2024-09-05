import { Types } from "@/types/generic-table.type";
import { Button } from "@nextui-org/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { useDisclosure } from "@nextui-org/modal";
import { ConfirmationModal } from "./confirmation-modal";
import { EditModal } from "./edit-modal";
import { useMutation } from "@tanstack/react-query";
import AxiosInstance from "@/api/axiosInstance";
import { baseURL } from "@/api/baseURL";
import Endpoints from "@/api/Endpoints";
import { useEffect } from "react";

export const TableActions = ({
  row,
  types,
  enumsOptions,
  identfier,
  refresh,
}: {
  row: { [key: PropertyKey]: any };
  types: Types;
  enumsOptions?: { [key: PropertyKey]: string[] };
  identfier: string;
  refresh: () => void;
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onOpenChange: onOpenChangeDelete,
    onClose: onCloseDelete,
  } = useDisclosure();

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

  const deleteOrder = (id: string) => {
    deleteUserMutate({
      id,
    });
  };

  useEffect(() => {
    if (deleteUserResponse) {
      console.log(deleteUserResponse);
      refresh();
    }
  }, [deleteUserResponse]);
  //-------------------------------------------------------------------------------------------

  return (
    <>
      <Dropdown>
        <DropdownTrigger>
          <Button size={"sm"} variant="ghost" className="font-bold">
            . . .
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions">
          <DropdownItem
            onClick={() => {
              getUserDetails(row[identfier]);
              onOpen();
            }}
            key="edit"
          >
            Edit
          </DropdownItem>
          <DropdownItem
            key="delete"
            className="text-danger"
            color="danger"
            onClick={() => onOpenDelete()}
          >
            Delete
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      <EditModal
        row={getUserDetailsResponse?.data}
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
        types={types}
        identfier={identfier}
        enumsOptions={enumsOptions}
        refresh={refresh}
      />

      <ConfirmationModal
        row={row}
        isOpen={isOpenDelete}
        onOpen={onOpenDelete}
        onOpenChange={onOpenChangeDelete}
        onClose={onCloseDelete}
        message="Are you sure you want to delete this record?"
        onConfirm={() => {
          deleteOrder(row[identfier]);
          console.log(row);
          console.log("record is deleted successfully!");
          onCloseDelete();
        }}
      />
    </>
  );
};
