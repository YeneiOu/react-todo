"use client";

import { useEffect, useState } from "react";
import { IResponse } from "@/interface/Iresponse";
import { TodosCard, TodosReq } from "@/interface/Itodos";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addTodo, deleteTodo, fetchTodos, updateAllTodo } from "@/api/todo_api";

// Components
import TextH2 from "@/components/ui/typographyH2";
import TodoInput from "@/components/todos/TodoInput";
import TodoPagination from "@/components/todos/TodoPagination";
import { useToast } from "@/hooks/use-toast";
import { ProgressBar } from "react-loader-spinner";
import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import TodoList from "@/components/todos/TodoList";

function TodoPage() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [todosInitial, setTodosInitial] = useState<TodosCard[] | undefined>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Fetch todos
  const {
    data: todos,
    isLoading,
    error,
  } = useQuery({
    queryFn: fetchTodos,
    queryKey: ["todos"],
    staleTime: 60000, // Cache for 1 minute
  });

  // Add todo mutation
  const { mutate: handleAddTodo } = useMutation({
    mutationFn: addTodo,
    onSuccess: (response) => {
      handleResponse(response, "Success", "Added successfully");
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (error) => handleError(error),
  });

  // Update all todos mutation
  const { mutate: handleUpdateAllTodo } = useMutation({
    mutationFn: updateAllTodo,
    onSuccess: (response) => {
      handleResponse(response, "Update success", "Todos updated");
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (error) => handleError(error),
  });

  // Delete todo mutation
  const { mutate: handleDeleteTodo } = useMutation({
    mutationFn: deleteTodo,
    onSuccess: (response) => {
      handleResponse(response, "Delete success", "Todo deleted");
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (error) => handleError(error),
  });

  // Helper functions
  const handleResponse = (
    response: IResponse,
    successTitle: string,
    successMessage: string
  ) => {
    if (response.code === 200) {
      toast({
        title: successTitle,
        description: response.message || successMessage,
        action: <ToastAction altText="Enter">Enter</ToastAction>,
      });
    } else {
      toast({
        variant: "destructive",
        title: response.message,
        description: "There was a problem with your request.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  };

  const handleError = (error: Error) => {
    console.error("Error:", error);
    // Optional: Add toast error message here
  };

  // Handle updates
  const handleUpdateTodo = (newTodo: TodosReq) => {
    try {
      handleAddTodo(newTodo);
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleUpdateAllTodos = () => {
    handleUpdateAllTodo(todosInitial ?? []);
  };

  const handleUpdateCheckTodo = (id: number) => {
    const updatedTodos = todosInitial?.map((todo) =>
      todo.id === id ? { ...todo, complete: !todo.complete } : todo
    );
    setTodosInitial(updatedTodos);
  };

  const handleDeleteTodos = (id: number) => {
    handleDeleteTodo({ id });
  };

  const handleEditTodo = (id: number, newTitle: string) => {
    setTodosInitial((prevTodos) =>
      prevTodos?.map((todo) =>
        todo.id === id ? { ...todo, title: newTitle } : todo
      )
    );
  };

  const todosList = todosInitial ?? [];
  const indexOfLastTodo = currentPage * itemsPerPage;
  const indexOfFirstTodo = indexOfLastTodo - itemsPerPage;
  const currentTodos = todosList.slice(indexOfFirstTodo, indexOfLastTodo);
  const totalPages = Math.ceil(todosList.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const hasChanges = () => {
    return JSON.stringify(todosInitial) !== JSON.stringify(todos);
  };

  useEffect(() => {
    setTodosInitial(todos);
  }, [todos]);

  if (error) {
    throw error;
  }

  return (
    <div className="bg-card text-card-foreground max-h-screen h-screen w-full flex justify-center items-center">
      {isLoading ? (
        <ProgressBar
          visible={true}
          height="80"
          width="80"
          barColor="#22c55e"
          borderColor="#22c55e"
          ariaLabel="progress-bar-loading"
        />
      ) : (
        <div className="container w-full max-w-4xl mx-auto p-4">
          <div className="text-center">
            <TextH2 text="Todo App" />
          </div>
          <div className="flex flex-col items-center justify-center gap-4 w-full max-w-2xl mx-auto my-2">
            <TodoInput setFuncTodos={handleUpdateTodo} />
            <div className="update-all-todos todo-list w-full max-w-xl mx-auto my-4">
              <Button
                variant="default"
                onClick={handleUpdateAllTodos}
                disabled={!hasChanges()}
              >
                Update Todo
              </Button>
            </div>
          </div>

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
          
          {totalPages > 0 && (
            <TodoPagination
              handlePageChange={handlePageChange}
              totalPages={totalPages}
              currentPage={currentPage}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default TodoPage;
