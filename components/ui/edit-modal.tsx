import { ColumnType, Types } from "@/types/generic-table.type";
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/modal";
import { useState } from "react";

export const EditModal = ({
  row,
  isOpen,
  onOpenChange,
  onOpen,
  types,
  enumsOptions,
}: {
  row: { [key: PropertyKey]: any };
  isOpen: boolean;
  onOpenChange: () => void;
  onOpen: () => void;
  types: Types;
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
                <Button color="primary" onPress={onClose}>
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
