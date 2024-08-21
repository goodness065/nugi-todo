import { Theme, Dialog } from "@radix-ui/themes";
import { Cross1Icon } from "@radix-ui/react-icons";
import { ReactNode } from "react";

interface IModal {
  title: string;
  description?: string;
  trigger: ReactNode;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
  isSubmitting?: boolean;
}

const Modal = ({
  title,
  description,
  trigger,
  isOpen,
  onOpenChange,
  children,
}: IModal) => {
  return (
    <Theme className="!min-h-full">
      <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
        <Dialog.Trigger>{trigger}</Dialog.Trigger>
        <Dialog.Content maxWidth="450px">
          <div className="flex items-center justify-between">
            <Dialog.Title>{title}</Dialog.Title>
            <Dialog.Close className="text-gray-400 hover:text-gray-500">
              <Cross1Icon />
            </Dialog.Close>
          </div>
          {description && (
            <Dialog.Description size="2" mb="4">
              {description}
            </Dialog.Description>
          )}
          {children}
        </Dialog.Content>
      </Dialog.Root>
    </Theme>
  );
};

export default Modal;
