import { Flex } from "@radix-ui/themes";
import Button from "../common/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect, useState } from "react";
import { EditIcon } from "../icons/edit.icon";
import Modal from "../common/modal";
import { useUpdateTodoMutation } from "../../service/api";
import { toast } from "sonner";

const schema = z.object({
  title: z.string().min(1),
});

type FormFields = z.infer<typeof schema>;

interface IEditTodo {
  title: string;
  id: string;
  refetch: () => void;
}

const EditTodo = ({ title, id, refetch }: IEditTodo) => {
  const [updateTodo, { isLoading }] = useUpdateTodoMutation();
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormFields>({
    defaultValues: {
      title: title,
    },
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    reset({
      title: title,
    });
  }, [title, reset]);

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      await updateTodo({ title: data.title, id: id });
      refetch();
      setOpen(false);
    } catch (error) {
      // @ts-ignore
      toast.error(error?.message ?? "an error occured");
    }
  };

  return (
    <div>
      <Modal
        isOpen={open}
        onOpenChange={setOpen}
        title="Edit todo"
        description=""
        trigger={
          <button>
            <EditIcon />
          </button>
        }
      >
        <form className="gap-2 tutorial" onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("title")}
            className="w-full h-12 p-1 border border-gray-400 rounded-md outline-none"
            type="text"
            placeholder="Enter title"
          />
          {errors.title && (
            <div className="text-red-500">{errors.title.message}</div>
          )}

          <Flex gap="3" mt="4" justify="end">
            <Button
              onClick={() => setOpen(false)}
              title="Cancel"
              intent="secondary"
            />
            <Button type="submit" title="Submit" isLoading={isLoading} />
          </Flex>
        </form>
      </Modal>
    </div>
  );
};

export default EditTodo;
