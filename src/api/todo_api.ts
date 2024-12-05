import { TodosCard, TodosReq } from "@/interface/Itodos.ts";
import { IResponse } from "@/interface/Iresponse.ts";

const BASE_URL = `http://127.0.0.1:7777/api/v1/todos`;

/**
 * Mock function that mimics fetching todos from a database.
 */
export const fetchTodos = async (): Promise<TodosCard[] | undefined> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  try {
    const response = await fetch(BASE_URL);
    const responseData: IResponse = await response.json();
    if (responseData.code === 200) {
      const data: TodosCard[] = responseData.data;
      if (data) {
        // sortData = data.sort((a, b) => b.id - a.id);
        return data;
      }
    } else {
      return [];
    }

    // let sortData: TodosCard[]
  } catch (err) {
    console.error(err);
  }
};

// export const addTodo = async (todo: Pick<Todo, "title">): Promise<Todo> => {
export const addTodo = async (payload: TodosReq): Promise<IResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  try {
    const response = await fetch(`${BASE_URL}/add-todo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData: IResponse = await response.json();
    return responseData;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const updateAllTodo = async (
  payload: TodosCard[]
): Promise<IResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  try {
    const response = await fetch(`${BASE_URL}/update-todo`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData: IResponse = await response.json();
    return responseData;
  } catch (error) {
    console.error("Failed to update todos:", error);
    throw error; // R
  }
};

export const deleteTodo = async (payload: {
  id: number;
}): Promise<IResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  try {
    const response = await fetch(`${BASE_URL}/delete-todo`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData: IResponse = await response.json();
    return responseData;
  } catch (error) {
    console.error("Failed to update todos:", error);
    throw error;
  }
};
