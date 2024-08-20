import "@radix-ui/themes/styles.css";
import { Theme, Checkbox } from "@radix-ui/themes";
import { EditIcon } from "./icons/edit.icon";
import { DeleteIcon } from "./icons/delete.icon";
import EditTodo from "./sections/edit-todo";
import DeleteTodo from "./sections/delete-todo";

interface ITodoItem {
  checked: boolean;
}

const TodoItem = ({ checked }: ITodoItem) => {
  return (
    <div className="rounded-[20px] space-y-3 bg-white p-4">
      <div className="w-full flex justify-between">
        <p
          className={`text-base sm:text-lg text-textblack font-medium ${checked ? "line-through" : ""}`}
        >
          Clean the house
        </p>
        <Theme className="!min-h-full">
          <Checkbox checked={checked} size="3" variant="surface" />
        </Theme>
      </div>
      <div className="border-t border-stroke pt-3 w-full flex justify-between items-center">
        <p className="text-sm text-subtext">created at: 11/12/55 10:pm</p>
        <div className="flex items-center gap-3">
          <EditTodo /> <DeleteTodo />
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
