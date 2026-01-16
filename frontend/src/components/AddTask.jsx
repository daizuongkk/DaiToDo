import api from "@/lib/axios";
import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";

const AddTask = ({ handleNewTaskAdded }) => {
  const [newTask, setNewTask] = useState("");
  const addTask = async () => {
    if (newTask.trim()) {
      try {
        await api.post("/tasks", {
          name: newTask,
        });
        handleNewTaskAdded();
        toast.success(`The task ${newTask} has been added`);
      } catch (error) {
        console.log(error);
        toast.error("An error occurred while adding a task.");
      }
      setNewTask("");
    } else toast.error("Please enter a task name.");
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && newTask.trim()) {
      addTask();
    }
  };
  return (
    <Card className="p-6 border-0 gradient-card shadow-custom-lg">
      <div className="flex flex-col gap-3 sm:flex-row">
        <Input
          type={"text"}
          placeholder="What needs to be done?"
          className="h-12 text-base bg-slate-900 sm:flex-1 border-border/50 focus:border-primary/50 focus:ring-primary/20"
          value={newTask}
          onChange={(even) => setNewTask(even.target.value)}
          onKeyPress={handleKeyPress}
        />

        <Button
          variant="gradient"
          size="xl"
          className="px-6"
          onClick={addTask}
          disabled={!newTask.trim()}
        >
          {" "}
          <Plus />
          ADD
        </Button>
      </div>
    </Card>
  );
};

export default AddTask;
