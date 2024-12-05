import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input.tsx";
// icon
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { ArchiveBoxXMarkIcon } from "@heroicons/react/24/solid";
import { CheckIcon } from "@heroicons/react/24/solid";
import { TodosCard } from "@/interface/Itodos.ts";
import { useState } from "react";

interface TodoCardProps {
  todo: TodosCard;
  onCheck: (id: number) => void;
  onDelete: (id: number) => void;
  onUpdate: (id: number, newTitle: string) => void;
  canDelete?: boolean;
}

function TodoCard({
  todo,
  onCheck,
  onDelete,
  onUpdate,
  canDelete,
}: TodoCardProps) {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editValue, setEditValue] = useState<string>(todo.title);

  const handleChange = () => {
    onCheck(todo?.id);
  };
  const handleDelete = () => {
    onDelete(todo?.id);
  };
  const handleUpdate = () => {
    if (isEdit) {
      onUpdate(todo?.id, editValue);
    }
    setIsEdit(!isEdit);
  };

  return (
    <>
      <li className="todo-card w-full bg-secondary rounded-lg mb-3">
        <div className="flex items-center justify-between  p-4">
          <div className="items-center flex space-x-2 ">
            {!canDelete && (
              <Checkbox
                checked={todo.complete}
                onCheckedChange={handleChange}
              />
            )}
            <div className="grid gap-1.5 leading-none">
              {isEdit ? (
                <Input
                  type="text"
                  placeholder="edit..."
                  onChange={(e) => setEditValue(e.target.value)}
                />
              ) : (
                <p
                  className={`${
                    todo.complete && "line-through text-info-foreground/50"
                  } text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70`}
                >
                  {todo.title}
                </p>
              )}
            </div>
          </div>
          {/* edit and delete*/}
          <div className="flex items-center space-x-2">
            <Button
              variant={`${isEdit ? "success" : "info"}`}
              size="icon"
              onClick={handleUpdate}
              disabled={todo.complete}
            >
              {isEdit ? (
                <CheckIcon className="h-4 w-4" />
              ) : (
                <PencilSquareIcon className="h-4 w-4" />
              )}
            </Button>

            <Button
              variant="destructive"
              size="icon"
              onClick={handleDelete}
              disabled={isEdit}
            >
              <ArchiveBoxXMarkIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </li>
    </>
  );
}

export default TodoCard;
