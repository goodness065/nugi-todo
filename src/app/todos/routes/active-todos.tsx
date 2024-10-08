import { useEffect, useState } from "react";
import { Empty } from "../../../components/common/empty-view";
import LoadingView from "../../../components/loading-view";
import TodoItem from "../../../components/todos/todo-item";
import { useGetTodosQuery } from "../../../service/api";
import { Todo } from "../../../entities/todos";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import TextInput from "../../../components/common/text-input";
import TodoError from "../../../components/todos/todo-error";

const ActiveTodos = () => {
  const { data, isLoading, isError, refetch, isFetching } = useGetTodosQuery();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    if (data?.data) {
      const activeTodos = data.data.filter((todo) => !todo.isCompleted);
      const savedOrder = localStorage.getItem("activeTodoOrder");
      let orderedTodos: Todo[] = [];

      if (savedOrder) {
        const order = JSON.parse(savedOrder);
        const ordered = order
          .map((id: string) => activeTodos.find((todo) => todo.id === id))
          .filter(Boolean) as Todo[];

        const unorderedTodos = activeTodos.filter(
          (todo) => !order.includes(todo.id)
        );

        orderedTodos = [...unorderedTodos.reverse(), ...ordered];
      } else {

        orderedTodos = activeTodos.slice().reverse();
      }

      setTodos(orderedTodos);
    }
  }, [data]);

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    if (!destination || destination.index === source.index) {
      return;
    }

    const reorderedTodos = Array.from(todos);
    const [movedTodo] = reorderedTodos.splice(source.index, 1);
    reorderedTodos.splice(destination.index, 0, movedTodo);

    setTodos(reorderedTodos);

    const todoOrder = reorderedTodos.map((todo) => todo.id);
    localStorage.setItem("activeTodoOrder", JSON.stringify(todoOrder));
  };

  const activeTodos = data?.data.filter((todo) => !todo.isCompleted);

  const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderContent = () => {
    if (isLoading || isFetching) {
      return (
        <div className="w-full max-w-[600px] space-y-6">
          {[...Array(3)].map((_, index) => (
            <LoadingView key={index} />
          ))}
        </div>
      );
    }

    if (isError) {
      return <TodoError refetch={refetch} />;
    }

    if (activeTodos?.length === 0) {
      return <Empty title="No active todos found" desc="" />;
    }

    if (filteredTodos.length === 0 && searchQuery.length !== 0) {
      return <Empty title="No todos found" desc="" />;
    }

    return (
      <Droppable droppableId="todos">
        {(provided) => (
          <div
            className="w-full max-w-[600px] space-y-6"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {filteredTodos.map((item, index) => (
              <Draggable
                key={item.id}
                draggableId={item.id.toString()}
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <TodoItem
                      refetch={refetch}
                      checked={item.isCompleted}
                      title={item.title}
                      date={item.createdAt as string}
                      id={item.id}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    );
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <section className="space-y-6">
        <div className="flex flex-wrap items-center justify-between w-full gap-5">
          <div className="flex items-center gap-2">
            <h2 className="font-semibold text-2xl sm:text-[32px]">
              Active Todos{" "}
            </h2>{" "}
            {activeTodos && activeTodos?.length > 0 && (
              <div className="bg-brandBlue w-6 h-6 flex items-center justify-center p-1 rounded-[32px]">
                <p className="text-xs text-white">{activeTodos?.length}</p>
              </div>
            )}
          </div>
          <TextInput
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search todos"
            className="max-w-[300px]"
          />
        </div>

        <main className="w-full flex justify-center h-[calc(100vh-200px)] overflow-y-scroll">
          {renderContent()}
        </main>
      </section>
    </DragDropContext>
  );
};

export default ActiveTodos;
