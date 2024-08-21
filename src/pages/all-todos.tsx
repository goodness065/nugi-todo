import React from 'react';
import LoadingView from '../components/loading-view';
import AddTodo from '../components/sections/add-todo';
import TodoItem from '../components/todo-item';
import '@radix-ui/themes/styles.css';
import { useGetTodosQuery } from '../service/api';
import { Empty } from '../components/common/empty-view';
import Button from '../components/common/button';

const AllTodos: React.FC = () => {
  const { data, isLoading, isError, refetch, isFetching } = useGetTodosQuery();

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
            <p className="text-base font-medium text-textblack">Error loading todos</p>
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

    if (data?.data.length === 0) {
      return <Empty title="No todos found" desc="" />;
    }

    return (
      <div className="w-full max-w-[600px] space-y-6">
        {data?.data.map((item) => (
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
      <header className="flex justify-between items-center w-full">
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

      <main className="w-full flex justify-center h-[calc(100vh-200px)] overflow-y-scroll">
        {renderContent()}
      </main>
    </section>
  );
};

export default AllTodos;
