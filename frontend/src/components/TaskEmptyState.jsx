import { Circle } from "lucide-react";
import React from "react";
import { Card } from "./ui/card";

const TaskEmptyState = ({ filter }) => {
  return (
    <Card className="p-8 text-center border-0 bg-gradient-card shadow-custom-md">
      <div>
        <Circle className="mx-auto size-12 text-muted-foreground" />
        <h3 className="font-medium text-muted-foreground">
          {filter === "active"
            ? "There are no tasks in progress"
            : filter === "complete"
            ? "No tasks have been completed"
            : "No tasks yet"}
        </h3>
      </div>
    </Card>
  );
};

export default TaskEmptyState;
