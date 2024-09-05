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

export const TableActions = ({
  row,
  types,
  enumsOptions,
}: {
  row: { [key: PropertyKey]: any };
  types: Types;
  enumsOptions?: { [key: PropertyKey]: string[] };
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onOpenChange: onOpenChangeDelete,
    onClose: onCloseDelete,
  } = useDisclosure();

  return (
    <>
      <Dropdown>
        <DropdownTrigger>
          <Button size={"sm"} variant="ghost" className="font-bold">
            . . .
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions">
          <DropdownItem onClick={() => onOpen()} key="edit">
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
        row={row}
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
