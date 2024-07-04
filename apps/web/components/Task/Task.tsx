"use client";
import { useLoginStore } from "@/stores/useUserStore";
import { TaskDate } from "./TaskDate";
import { TaskSelection } from "./TaskSelector";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { taskByUserID } from "@/services/serverless/user";
import { task } from "@/app/type";

export function Task() {

  const {suiUserInfo, userInfo, loginByJwt} = useLoginStore();
  const [tasks, setTasks] = useState<task[]>([])
  const [taskByDate, setTaskByDate] = useState<{tasks: task[], date: string}[]>([])

  useEffect(() => {
    initial()
  }, [suiUserInfo])

  useEffect(() => {
    setTaskByDate([])
    taskByDatehandler()
  }, [tasks])

  async function initial() {
    if(suiUserInfo.jwt != "") {
        const t = await taskByUserID(jwtDecode(suiUserInfo.jwt).sub as string)
        //setTasks(t)
    }
  }

  function taskByDatehandler() {
    var ts: {tasks: task[], date: string}[] = []
    tasks.map((task) => {
      var e = false
      ts.map((_ts, index) => {
        if(task.task_start == _ts.date) {
          ts[index]?.tasks.push(task)
          e = true
        }
      })
      if(!e) {
        console.log(task)
        ts.push({date: task.task_start, tasks: [task]})
      }
    })
    setTaskByDate(ts)
  }

  return (
    <div className="flex justify-center p-4">
      {tasks.length > 0 ?
      <div>
        <div className="flex items-center justify-end">
          <TaskSelection />
        </div>
        {sortTaskGroupsByDate(taskByDate).map((d, index) => {
          return <TaskDate key={d.date} date={d.date} task={d.tasks}/>
        })}
      </div>
      :
      <div className="p-4 text-cBlue text-2xl">Join DAO and Search for Task!</div>
      }
    </div>
  );
}

function sortTaskGroupsByDate(taskGroups: {tasks: task[], date: string}[]): {tasks: task[], date: string}[] {
  return taskGroups.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateA.getTime() - dateB.getTime();
  });
}
