"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import dayjs from "dayjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
// icon
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { TodosReq } from "@/interface/Itodos.ts";

const formSchema = z.object({
  todoInput: z.string().min(2, {
    message: "Todo input must be at least 2 characters.",
  }),
});

interface TodoInputProps {
  setFuncTodos: (newTodo: TodosReq) => void;
}

function TodoInput({ setFuncTodos }: TodoInputProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      todoInput: "",
    },
  });

  // const randomId = () => {
  //     return Math.floor(Math.random() * 10000);
  // }

  const onSubmit = () => {
    const newTodoInput: TodosReq = {
      created_at: dayjs().format(),
      title: form.getValues().todoInput,
      complete: false,
    };
    setFuncTodos(newTodoInput);
    form.reset();
  };

  return (
    <div className="todo-input w-full max-w-xl mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 ">
          <FormField
            control={form.control}
            name="todoInput"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Todo Input</FormLabel>
                <FormControl>
                  <div className="flex items-center space-x-2">
                    <Input
                      type="text"
                      placeholder="Do Something..."
                      {...field}
                    />
                    <Button>
                      <PlusCircleIcon className="mr-2 w-5 h-5 object-cover" />
                      Add
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}

export default TodoInput;
