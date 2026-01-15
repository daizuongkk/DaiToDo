import AddTask from "@/components/AddTask";
import DateTimeFilter from "@/components/DateTimeFilter";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import StatsAndFilters from "@/components/StatsAndFilters";
import TaskList from "@/components/TaskList";
import TaskListPagination from "@/components/TaskListPagination";
import api from "@/lib/axios";
import { visibleTaskLimit } from "@/lib/datas";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const HomePage = () => {
  const [taskBuffer, setTaskBuffer] = useState([]);
  const [activeTaskCount, setActiveTaskCount] = useState(0);
  const [completeTaskCount, setCompleteTaskCount] = useState(0);
  const [filter, setFilter] = useState("all");

  const [dateFilter, setDateFilter] = useState("today");

  const [page, setPage] = useState(1);
  useEffect(() => {
    // eslInteger-disable-next-line react-hooks/immutability
    fetchTasks();
  }, [dateFilter]);

  const filteredTask = taskBuffer.filter((task) => {
    switch (filter) {
      case "active":
        return task.status === "ACTIVE";
      case "complete":
        return task.status === "COMPLETE";
      default:
        return true;
    }
  });

  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks?filter=" + dateFilter);
      setActiveTaskCount(res.data.activeCount);
      setCompleteTaskCount(res.data.completeCount);
      setTaskBuffer(res.data.tasks);
      console.log(res);
    } catch (error) {
      console.error("An error occurred when querying task ", error);
      toast.error("An error occurred when retrieving task data");
    }
  };

  const visibleTask = filteredTask.slice(
    (page - 1) * visibleTaskLimit,
    page * visibleTaskLimit
  );

  const totalPages = Math.ceil(filteredTask.length / visibleTaskLimit);

  const handleNext = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };
  const handleTaskChanged = () => {
    fetchTasks();
  };
  return (
    <>
      <div className="relative w-full min-h-screen">
        {/* Dark Horizon Glow */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(125% 125% at 50% 10%, #000000 40%, #0d1a36 100%)",
          }}
        />
        <div className="container relative z-10 pt-8 mx-auto">
          <div className="w-full max-w-2xl p-6 mx-auto space-y-6">
            {" "}
            <Header />
            <AddTask handleNewTaskAdded={handleTaskChanged} />
            <StatsAndFilters
              filter={filter}
              setFilter={setFilter}
              activeTaskCount={activeTaskCount}
              completedTaskCount={completeTaskCount}
            />
            <TaskList
              listTasks={visibleTask}
              handleTaskChanged={handleTaskChanged}
              filter={filter}
            />
            <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
              {" "}
              <TaskListPagination
                handleNext={handleNext}
                handlePrev={handlePrev}
                handlePageChange={handlePageChange}
                page={page}
                totalPages={totalPages}
              />
              <DateTimeFilter
                dateFilter={dateFilter}
                setDateFilter={setDateFilter}
              />
            </div>
            <Footer
              activeTasksCount={activeTaskCount}
              completedTasksCount={completeTaskCount}
            />
          </div>
        </div>
        {/* Your Content/Components */}
      </div>
    </>
  );
};

export default HomePage;
