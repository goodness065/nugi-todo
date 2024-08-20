import TodoItem from "../components/todo-item"

const ActiveTodos = () => {
  return (
    <section className="space-y-6">
<div className="flex items-center gap-2">
          <h2 className="font-semibold text-2xl sm:text-[32px]">Active todos </h2>{" "}
          <div className="bg-brandBlue w-6 h-6 flex justify-center p-1 items-center rounded-[32px]">
            <p className="text-white text-xs">14</p>
          </div>
        </div>

    <div className="w-full flex justify-center h-[calc(100vh-200px)] overflow-y-scroll ">
      <div className="w-full max-w-[600px] space-y-6 ">
        <TodoItem checked />
        <TodoItem checked={false} />
        <TodoItem checked />
        <TodoItem checked />
        <TodoItem checked />
        <TodoItem checked={false} /> <TodoItem checked={false} />{" "}
        <TodoItem checked={false} /> <TodoItem checked={false} />{" "}
        <TodoItem checked={false} />
      </div>
    </div>
  </section>
  )
}

export default ActiveTodos