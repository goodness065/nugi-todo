import "@radix-ui/themes/styles.css";
import { Theme, Checkbox } from "@radix-ui/themes";
import EditTodo from "../sections/edit-todo";
import DeleteTodo from "../sections/delete-todo";
import { useEffect, useState } from "react";
import { useUpdateTodoMutation } from "../../service/api";
import { toast } from "sonner";
import { formatDateTime } from "../../utils/date-formatter";

interface ITodoItem {
  checked: boolean;
  title: string;
  date: string;
  id: string;
  refetch: () => void;
}

const TodoItem = ({ checked, title, id, date, refetch }: ITodoItem) => {
  const [isChecked, setIsChecked] = useState<boolean>(checked);
  const [updateTodo, { data, isError, error }] = useUpdateTodoMutation();
  
  useEffect(() => {
    setIsChecked(checked)
  }, [checked]);

  const onSubmit = async (checked: boolean) => {
    console.log(data);
    setIsChecked(checked);
    try {
      await updateTodo({ isCompleted: checked, id: id });
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isError) {
      // @ts-ignore
      toast.error(error?.message ?? "an error occured");
      setIsChecked(checked);
    }
  }, [isError, error]);

  return (
    <div className="rounded-[20px] space-y-3 bg-white p-4">
      <div className="flex justify-between w-full">
        <p
          className={`text-base sm:text-lg text-textblack font-medium ${isChecked ? "line-through" : ""}`}
        >
          {title}
        </p>
        <Theme className="!min-h-full">
          <Checkbox
            checked={isChecked}
            onCheckedChange={(checked) => onSubmit(checked as boolean)}
            size="3"
            variant="surface"
          />
        </Theme>
      </div>
      <div className="flex items-center justify-between w-full pt-3 border-t border-stroke">
        <p className="text-sm text-subtext">
          created at: {formatDateTime(date)}
        </p>
        <div className="flex items-center gap-3">
          <EditTodo title={title} id={id} refetch={refetch} />{" "}
          <DeleteTodo id={id} refetch={refetch} />
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
