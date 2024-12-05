import TodoCard from "./TodoCard";
import { TodosCard } from "@/interface/Itodos.ts";

interface TodoListProps {
  todos: TodosCard[];
  deleteTodo: (id: number) => void;
  updateTitle: (id: number, newTitle: string) => void;
  updateCheckTodo: (id: number) => void;
  canDelete?: boolean;
}

function TodoList({
  todos,
  updateCheckTodo,
  updateTitle,
  deleteTodo,
  canDelete
}: TodoListProps) {
  return (
    <>
      <div className="todo-list w-full max-w-xl mx-auto">
        <ul className="mb-4">
          {todos.map((todo) => (
            <TodoCard
              todo={todo}
              key={todo.id}
              onCheck={updateCheckTodo}
              onDelete={deleteTodo}
              onUpdate={updateTitle}
              canDelete={canDelete}
            />
          ))}
        </ul>
      </div>
    </>
  );
}

export default TodoList;
