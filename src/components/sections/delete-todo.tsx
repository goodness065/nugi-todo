import { Theme, AlertDialog, Flex } from "@radix-ui/themes";
import { DeleteIcon } from "../icons/delete.icon";
import { useState } from "react";
import { useDeleteTodoMutation } from "../../service/api";
import Button from "../common/button";

const DeleteTodo = ({ id, refetch }: { id: string; refetch: any }) => {
  const [open, setOpen] = useState(false);
  const [deleteTodo, { isLoading }] = useDeleteTodoMutation();

  const handleDeleteTodo = async () => {
    try {
      await deleteTodo(id);
      refetch();
      setOpen(false);
    } catch (error) {
      // @ts-ignore
      toast.error(error?.message ?? "an error occured");
    }
  };

  return (
    <Theme className="!min-h-full">
      {" "}
      <AlertDialog.Root open={open} onOpenChange={setOpen}>
        <AlertDialog.Trigger>
          <button>
            <DeleteIcon />
          </button>
        </AlertDialog.Trigger>
        <AlertDialog.Content maxWidth="450px">
          <AlertDialog.Title>Delete todo</AlertDialog.Title>
          <AlertDialog.Description size="2">
            Are you sure you waht to delete this tasks?
          </AlertDialog.Description>

          <Flex gap="3" mt="4" justify="end">
            <Button
              onClick={() => setOpen(false)}
              title="Cancel"
              intent="secondary"
            />
            <Button
              onClick={() => handleDeleteTodo()}
              title="Delete"
              className="!bg-red-700 !border-red-700"
              isLoading={isLoading}
            />
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </Theme>
  );
};

export default DeleteTodo;
