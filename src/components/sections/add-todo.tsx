import { Flex } from "@radix-ui/themes";
import Button from "../common/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import Modal from "../common/modal";
import { useAddTodoMutation } from "../../service/api";

const schema = z.object({
  title: z.string().min(1),
});

type FormFields = z.infer<typeof schema>;

const AddTodo = ({ refetch }: { refetch: any }) => {
  const [addTodo, { isLoading }] = useAddTodoMutation();
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    console.log(data);
    try {
      await addTodo(data);
      refetch();
      reset();
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
        title="Add"
        description="Add a task to you todo list"
        trigger={<Button title="+ Add" className="w-[100px]" />}
      >
        <form className="tutorial gap-2" onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("title")}
            type="text"
            name="title"
            placeholder="Enter title"
            className="w-full h-12 outline-none p-1 border border-gray-400 rounded-md"
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

export default AddTodo;
