import Button from "../components/common/button";
import { Empty } from "../components/common/empty-view";
import LoadingView from "../components/loading-view";
import TodoItem from "../components/todo-item"
import { useGetTodosQuery } from "../service/api";

const ActiveTodos = () => {
  const { data, isLoading, isError, refetch, isFetching } = useGetTodosQuery();
  const activeTodos = data?.data.filter(todo => !todo.isCompleted);

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

    if (activeTodos?.length === 0) {
      return <Empty title="No active todos found" desc="" />;
    }

    return (
      <div className="w-full max-w-[600px] space-y-6">
        {activeTodos?.map((item) => (
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
          <h2 className="font-semibold text-2xl sm:text-[32px]">Active todos </h2>{" "}
          {activeTodos && (
            <div className="bg-brandBlue w-6 h-6 flex items-center justify-center p-1 rounded-[32px]">
              <p className="text-xs text-white">{activeTodos.length}</p>
            </div>
          )}
        </div>

        <main className="w-full flex justify-center h-[calc(100vh-200px)] overflow-y-scroll">
        {renderContent()}
      </main>
  </section>
  )
}

export default ActiveTodos