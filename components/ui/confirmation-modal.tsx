import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/modal";

export const ConfirmationModal = ({
  row,
  isOpen,
  onOpenChange,
  onOpen,
  message,
  onConfirm,
  onClose,
}: {
  row: { [key: PropertyKey]: any };
  isOpen: boolean;
  onOpenChange: () => void;
  onOpen: () => void;
  message: string;
  onConfirm: () => void;
  onClose: () => void;
}) => {
  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} onClose={onClose}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">Edit</ModalHeader>
              <ModalBody>{message}</ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  onPress={() => {
                    onConfirm();
                  }}
                >
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
