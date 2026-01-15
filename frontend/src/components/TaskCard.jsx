import api from "@/lib/axios";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  Circle,
  ClipboardClock,
  SquarePen,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";

const TaskCard = ({ task, index, handleTaskChanged }) => {
  const [isEditting, setIsEditting] = useState(false);
  const [newTaskName, setNewTaskName] = useState(task.name || "");

  const updateTaskName = async (taskId) => {
    try {
      setIsEditting(false);
      await api.put(`/tasks/${taskId}`, {
        name: newTaskName,
      });
      toast.success("Task update successful!");
      handleTaskChanged();
    } catch (error) {
      console.log(error);
      toast.error("Error updating task!");
    }
  };
  const deleteTask = async (taskId) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      toast.success("Task deleted successfully!");
      handleTaskChanged();
    } catch (error) {
      console.log(error);
      toast.error("Error deleting quest!");
    }
  };
  const toggleTaskCompleButton = async () => {
    try {
      if (task.status === "ACTIVE") {
        await api.put(`/tasks/${task._id}`, {
          status: "COMPLETE",
          completedAt: new Date().toISOString(),
        });
        toast.success(`Task ${task.name} is completed!`);
      } else {
        await api.put(`/tasks/${task._id}`, {
          status: "ACTIVE",
          completedAt: null,
        });
        toast.success(`Task ${task.name} is changed!`);
      }
      handleTaskChanged();
    } catch (error) {
      console.log(error);
      toast.error("An error occurred!");
    }
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter" && newTaskName.trim()) {
      updateTaskName(task._id);
    }
  };
  return (
    <Card
      className={cn(
        "p-4 bg-gradient-card border-0 shadow-custom-md hover:shadow-glow transition-all duration-200 animate-fade-in group",
        task.status === "COMPLETE" && "opacity-75"
      )}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "shrink-0 size-8 rounded-full transition-all duration-200",
            task.status === "COMPLETE"
              ? "text-success hover:text-success/80"
              : "text-muted-foreground hover:text-primary"
          )}
          onClick={toggleTaskCompleButton}
        >
          {task.status === "COMPLETE" ? (
            <CheckCircle2 className="size-5" />
          ) : (
            <Circle className="size-5" />
          )}
        </Button>
        <div className="flex-1 min-w-0 ">
          {isEditting ? (
            <Input
              placeholder="What needs to be done?"
              className="flex-1 h-10 text-base border-border/50 focus:border-primary/50 focus:ring-primary/20 max-w-80"
              type="text"
              value={newTaskName}
              onChange={(e) => setNewTaskName(e.target.value)}
              onKeyPress={handleKeyPress}
              onBlur={() => {
                setIsEditting(false);
                setNewTaskName(task.name || "");
              }}
            />
          ) : (
            <p
              className={cn(
                "text-base transition-all duration-200",
                task.status === "COMPLETE"
                  ? "line-through text-muted-foreground"
                  : "text-foreground"
              )}
            >
              {task.name}
            </p>
          )}{" "}
        </div>

        <div
          className={cn(
            isEditting ? "space-y-2" : "flex items-center gap-2 mt-1 "
          )}
        >
          <div className="flex gap-2">
            <Calendar className="size-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              {new Date(task.createdAt).toLocaleString()}
            </span>
          </div>
          {task.completedAt && (
            <>
              {!isEditting ? (
                <ArrowRight className="size-3 text-muted-foreground" />
              ) : (
                ""
              )}
              <div className="flex gap-2">
                <ClipboardClock className="size-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  {new Date(task.completedAt).toLocaleString()}
                </span>
              </div>
            </>
          )}
        </div>
        <div className="hidden gap-2 group-hover:inline-flex animate-slide-up">
          <Button
            variant="ghost"
            size="icon"
            className="transition-colors shrink-0 size-8 text-muted-foreground hover:text-info"
            onClick={() => {
              setIsEditting(true);
              setNewTaskName(task.name || "");
            }}
          >
            {" "}
            <SquarePen className="size-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="transition-colors shrink-0 size-8 text-muted-foreground hover:text-destructive"
            onClick={() => deleteTask(task._id)}
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default TaskCard;
