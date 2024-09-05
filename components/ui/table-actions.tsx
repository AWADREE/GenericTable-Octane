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
}: {
  row: { [key: PropertyKey]: any };
  types: Types;
  enumsOptions?: { [key: PropertyKey]: string[] };
  identfier: string;
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
        enumsOptions={enumsOptions}
      />

      <ConfirmationModal
        row={row}
        isOpen={isOpenDelete}
        onOpen={onOpenDelete}
        onOpenChange={onOpenChangeDelete}
        onClose={onCloseDelete}
        message="Are you sure you want to delete this record?"
        onConfirm={() => {
          //TODO
          console.log(row);
          console.log("record is deleted successfully!");
          onCloseDelete();
        }}
      />
    </>
  );
};
