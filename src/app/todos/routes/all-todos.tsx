import React, { useEffect, useState } from "react";
import LoadingView from "../../../components/loading-view";
import AddTodo from "../../../components/sections/add-todo";
import TodoItem from "../../../components/todos/todo-item";
import "@radix-ui/themes/styles.css";
import { useGetTodosQuery } from "../../../service/api";
import { Empty } from "../../../components/common/empty-view";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { Todo } from "../../../entities/todos";
import TextInput from "../../../components/common/text-input";
import TodoError from "../../../components/todos/todo-error";

const AllTodos: React.FC = () => {
  const { data, isLoading, isError, refetch, isFetching } = useGetTodosQuery();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    if (data?.data) {

      const savedOrder = localStorage.getItem("todoOrder");
      let orderedTodos: Todo[] = [];

      if (savedOrder) {
        const order = JSON.parse(savedOrder);
        const ordered = order
          .map((id: string) => data.data.find((todo) => todo.id === id))
          .filter(Boolean) as Todo[];

        const unorderedTodos = data.data.filter(
          (todo) => !order.includes(todo.id)
        );

        orderedTodos = [...unorderedTodos.reverse(), ...ordered];
      } else {
        orderedTodos = data.data.slice().reverse();
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
    localStorage.setItem("todoOrder", JSON.stringify(todoOrder));
  };

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

    if (data?.data.length === 0) {
      return <Empty title="No todos found" desc="" />;
    }

    if (filteredTodos?.length === 0 && searchQuery.length !== 0) {
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
        <header className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <h2 className="font-semibold text-2xl sm:text-[32px]">All Todos</h2>
            {data?.data && (
              <div className="bg-brandBlue w-6 h-6 flex items-center justify-center p-1 rounded-[32px]">
                <p className="text-xs text-white">{data.data.length}</p>
              </div>
            )}
          </div>
          <AddTodo refetch={refetch} />
        </header>

        <div className="flex justify-center w-full">
          <TextInput
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search todos"
            className="max-w-[600px]"
          />
        </div>

        <main className="w-full flex justify-center h-[calc(100vh-200px)] overflow-y-scroll">
          {renderContent()}
        </main>
      </section>
    </DragDropContext>
  );
};

export default AllTodos;
