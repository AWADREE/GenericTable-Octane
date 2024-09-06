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
  endpoints,
}: {
  row: { [key: PropertyKey]: any };
  types: Types;
  enumsOptions?: { [key: PropertyKey]: string[] };
  identfier: string;
  refresh: () => void;
  endpoints?: {
    edit?: string;
    delete?: string;
    getDetails?: string;
  };
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
    data: getObjectDetailsResponse,
    isPending: getObjectDetailsIsPending,
    isSuccess: getObjectDetailsIsSuccess,
    isError: getObjectDetailsIsError,
    error: getObjectDetailsError,
    mutate: getObjectDetailsMutate,
  } = useMutation({
    mutationFn: async (params: { id: string }) => {
      return AxiosInstance.get(`${endpoints?.getDetails}${params.id}`);
    },
  });

  const getUserDetails = (orderId: string) => {
    getObjectDetailsMutate({
      id: orderId,
    });
  };

  useEffect(() => {
    if (getObjectDetailsResponse) {
      console.log(getObjectDetailsResponse);
    }
  }, [getObjectDetailsResponse]);
  //-------------------------------------------------------------------------------------------

  //-----------------------useMutation hook to delete an object --------------------------------
  const {
    data: deleteObjectResponse,
    isPending: deleteObjectIsPending,
    isSuccess: deleteObjectIsSuccess,
    isError: deleteObjectIsError,
    error: deleteObjectError,
    mutate: deleteObjectMutate,
  } = useMutation({
    mutationFn: async (params: { id: string }) => {
      return AxiosInstance.delete(`${endpoints?.delete}${params.id}`);
    },
  });

  const deleteOrder = (id: string) => {
    deleteObjectMutate({
      id,
    });
  };

  useEffect(() => {
    if (deleteObjectResponse) {
      console.log(deleteObjectResponse);
      refresh();
    }
  }, [deleteObjectResponse]);
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
        row={getObjectDetailsResponse?.data}
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
        types={types}
        identfier={identfier}
        enumsOptions={enumsOptions}
        editEndpoint={endpoints?.edit}
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
