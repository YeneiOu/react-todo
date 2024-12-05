import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// component
import TodoList from "./TodoList";
import { TodosCard } from "@/interface/Itodos";

interface TodoTabsList {
  currentTodos: TodosCard[];
  handleUpdateCheckTodo: (id: number) => void;
  handleDeleteTodos: (id: number) => void;
  handleEditTodo: (id: number, newTitle: string) => void;
}

function TodoTabsAndShowList({
  currentTodos,
  handleUpdateCheckTodo,
  handleDeleteTodos,
  handleEditTodo,
}: TodoTabsList) {
  const tabList = [
    { value: "todo-list", label: "List Todos" },
    { value: "todo-done", label: "Done Task" },
  ];

  const filterTaskDefault = (todoItem: TodosCard[]): TodosCard[] => {
    console.log("todoItem", todoItem);
    const filterDoneTask = todoItem.filter((item) => item.complete);
    return filterDoneTask;
  };

  const doneTask = filterTaskDefault(currentTodos);
  return (
    <>
      <Tabs
        defaultValue={tabList[0]?.value}
        className="w-full max-w-xl mx-auto "
      >
        <TabsList className="w-full">
          {tabList.map((item) => (
            <TabsTrigger value={item.value} key={item.value} className="w-full">
              {item.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="todo-list" className="">
          <div className="mt-4">
            {currentTodos.length > 0 ? (
              <TodoList
                todos={currentTodos}
                updateCheckTodo={handleUpdateCheckTodo}
                deleteTodo={handleDeleteTodos}
                updateTitle={handleEditTodo}
              />
            ) : (
              <p className="text-center">No item found</p>
            )}
          </div>
        </TabsContent>
        <TabsContent value="todo-done">
          <div className="mt-4">
            <span>
              {doneTask.length > 0 ? (
                <TodoList
                  todos={doneTask}
                  updateCheckTodo={handleUpdateCheckTodo}
                  deleteTodo={handleDeleteTodos}
                  updateTitle={handleEditTodo}
                />
              ) : (
                <p className="text-center">No item found</p>
              )}
            </span>
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
}

export default TodoTabsAndShowList;
