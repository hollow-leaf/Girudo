"use client";
import { TaskDate } from "./TaskDate";
import { TaskSelection } from "./TaskSelector";

export function Task() {
  return (
    <div className="flex justify-center p-4">
      <div>
        <div className="flex items-center justify-end">
          <TaskSelection />
        </div>
        <TaskDate />
        <TaskDate />
      </div>
    </div>
  );
}
