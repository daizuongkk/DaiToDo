import React from "react";

const Footer = ({ activeTasksCount = 0, completedTasksCount = 0 }) => {
  return (
    <>
      {completedTasksCount + activeTasksCount > 0 && (
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            {" "}
            {completedTasksCount > 0 && (
              <>
                🔥Great you've completed {completedTasksCount} tasks{" "}
                {activeTasksCount > 0 &&
                  ` There's only ${activeTasksCount} left to do. Try your best!`}
              </>
            )}
            {completedTasksCount === 0 && activeTasksCount > 0 && (
              <>Let's start doing {activeTasksCount} tasks!</>
            )}
          </p>
        </div>
      )}
    </>
  );
};

export default Footer;
