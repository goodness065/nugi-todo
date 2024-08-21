import Button from '../common/button'

const TodoError = ({refetch}: {refetch: () => void}) => {
  return (
    <div className="w-full flex justify-center h-[calc(100vh-200px)] items-center">
    <div className="flex flex-col items-center gap-3">
      <p className="text-base font-medium text-textblack">
        Error loading todos
      </p>
      <Button
        intent="secondary"
        title="Retry"
        onClick={refetch}
      />
    </div>
  </div>
  )
}

export default TodoError