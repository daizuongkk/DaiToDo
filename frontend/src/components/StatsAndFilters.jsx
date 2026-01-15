import React from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Filter } from "lucide-react";

const StatsAndFilters = ({
  completedTaskCount = 0,
  activeTaskCount = 0,
  filter = "all",
  setFilter,
}) => {
  return (
    <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
      <div className="flex gap-3">
        <Badge
          variant="secondary"
          className="bg-gradient-card text-accent-foreground border-info/20"
        >
          {activeTaskCount} active
        </Badge>
        <Badge
          variant="secondary"
          className="bg-gradient-card text-success border-success/20"
        >
          {completedTaskCount} success
        </Badge>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row">
        <Button
          key="all"
          variant={filter === "all" ? "gradient" : "ghost"}
          size="sm"
          className="capitalize"
          onClick={() => setFilter("all")}
        >
          <Filter className="size-4" />
          All
        </Button>
        <Button
          key="active"
          variant={filter === "active" ? "gradient" : "ghost"}
          size="sm"
          className="capitalize"
          onClick={() => setFilter("active")}
        >
          <Filter className="size-4" />
          Active
        </Button>
        <Button
          key="complete"
          variant={filter === "complete" ? "gradient" : "ghost"}
          size="sm"
          className="capitalize"
          onClick={() => setFilter("complete")}
        >
          <Filter className="size-4" />
          Complete
        </Button>
      </div>
    </div>
  );
};

export default StatsAndFilters;
