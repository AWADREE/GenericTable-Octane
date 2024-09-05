import AxiosInstance from "@/api/axiosInstance";
import { baseURL } from "@/api/baseURL";
import Endpoints from "@/api/Endpoints";
import { ColumnType, Types } from "@/types/generic-table.type";
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import { Button } from "@nextui-org/button";
import { Checkbox } from "@nextui-org/checkbox";
import { Input } from "@nextui-org/input";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/modal";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export const EditModal = ({
  row,
  isOpen,
  onOpenChange,
  onOpen,
  types,
  enumsOptions,
  identfier,
  refresh,
}: {
  row: { [key: PropertyKey]: any };
  isOpen: boolean;
  onOpenChange: () => void;
  onOpen: () => void;
  types: Types;
  identfier: string;
  refresh: () => void;
  enumsOptions?: { [key: PropertyKey]: string[] };
}) => {
  const [editableRowDetails, setEditableRowDetails] = useState<{
    [key: PropertyKey]: any;
  }>();

  const handleChange = (key: string, value: any) => {
    if (!editableRowDetails) return;

    setEditableRowDetails((prev: { [key: PropertyKey]: any }) => ({
      ...prev,
      [key]: value,
    }));
  };

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

  const updateUser = (id: string, updatedObject: any) => {
    updateUserMutate({
      id,
      updatedObject,
    });
  };

  useEffect(() => {
    if (updateUserResponse) {
      console.log(updateUserResponse);
      refresh();
    }
  }, [updateUserResponse]);
  //-------------------------------------------------------------------------------------------

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Edit</ModalHeader>
              <ModalBody className="max-h-96 overflow-y-auto">
                {Object.entries(row ?? {}).map(([key, value]) => {
                  let renderedField;

                  switch (types[key]) {
                    case ColumnType.Number:
                      renderedField = (
                        <Input
                          labelPlacement={"outside"}
                          label={key}
                          type="number"
                          defaultValue={value}
                          onChange={(e) => handleChange(key, e.target.value)}
                        />
                      );
                      break;
                    case ColumnType.Date:
                      renderedField = (
                        <Input
                          labelPlacement={"outside"}
                          label={key}
                          type="date"
                          defaultValue={new Date(value)
                            .toISOString()
                            .slice(0, 10)}
                          onChange={(e) => handleChange(key, e.target.value)}
                        />
                      );
                      break;
                    case ColumnType.Enum:
                      renderedField = (
                        <Autocomplete
                          labelPlacement={"outside"}
                          label={key}
                          defaultInputValue={value}
                          onChange={(e) => handleChange(key, e.target.value)}
                        >
                          {enumsOptions![key]?.map((option: string) => {
                            return (
                              <AutocompleteItem key={option} value={option}>
                                {option}
                              </AutocompleteItem>
                            );
                          })}
                        </Autocomplete>
                      );
                      break;
                    case ColumnType.Boolean:
                      renderedField = (
                        <div className="flex items-center justify-between">
                          <span className="mr-2">{key}</span>
                          <Checkbox
                            defaultSelected={value}
                            onChange={(e) => handleChange(key, e.target.value)}
                          />
                        </div>
                      );
                      break;
                    default:
                      renderedField = (
                        <Input
                          labelPlacement={"outside"}
                          label={key}
                          defaultValue={value}
                          onChange={(e) => handleChange(key, e.target.value)}
                        />
                      );
                      break;
                  }

                  return (
                    <div
                      key={key}
                      style={{ display: "flex", flexDirection: "row" }}
                    >
                      {renderedField}
                    </div>
                  );
                })}
              </ModalBody>
              <ModalFooter>
                <Button
                  color="primary"
                  onPress={() => {
                    updateUser(row[identfier], editableRowDetails);
                    onClose();
                  }}
                >
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
