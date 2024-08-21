import React from "react";
import TodoItem from "../components/todo-item";
import { Empty } from "../components/common/empty-view";
import { useGetTodosQuery } from "../service/api";
import LoadingView from "../components/loading-view";
import Button from "../components/common/button";

const CompletedTodos = () => {
  const { data, isLoading, isError, refetch, isFetching } = useGetTodosQuery();
  const completeTodos = data?.data.filter((todo) => todo.isCompleted);

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
      return (
        <div className="w-full flex justify-center h-[calc(100vh-200px)] items-center">
          <div className="flex flex-col items-center gap-3">
            <p className="text-base font-medium text-textblack">
              Error loading todos
            </p>
            <Button
              intent="secondary"
              isLoading={isLoading || isFetching}
              title="Retry"
              onClick={refetch}
            />
          </div>
        </div>
      );
    }

    if (completeTodos?.length === 0) {
      return <Empty title="No completed todos found" desc="" />;
    }

    return (
      <div className="w-full max-w-[600px] space-y-6">
        {completeTodos?.map((item) => (
          <TodoItem
            key={item.id}
            refetch={refetch}
            checked={item.isCompleted}
            title={item.title}
            date={item.createdAt as string}
            id={item.id}
          />
        ))}
      </div>
    );
  };
  return (
    <section className="space-y-6">
      <div className="flex items-center gap-2">
        <h2 className="font-semibold text-2xl sm:text-[32px]">
          Completed todos{" "}
        </h2>{" "}
        {completeTodos && (
          <div className="bg-brandBlue w-6 h-6 flex items-center justify-center p-1 rounded-[32px]">
            <p className="text-xs text-white">{completeTodos.length}</p>
          </div>
        )}
      </div>
      <main className="w-full flex justify-center h-[calc(100vh-200px)] overflow-y-scroll">
        {renderContent()}
      </main>
    </section>
  );
};

export default CompletedTodos;
