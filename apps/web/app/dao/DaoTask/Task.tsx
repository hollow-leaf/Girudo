"use client";
import { useLoginStore } from "@/stores/useUserStore";
import { TaskDate } from "./TaskDate";
import { TaskSelector } from "./TaskSelector";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { taskByUserID } from "@/services/serverless/user";
import { DAO, task } from "@/app/type";
import { TaskSelection } from "@/components/Task/TaskSelector";
import { daoTask } from "@/services/serverless/dao";
import { TaskCreator } from "./TaskCreator";

export function Task(props: {dao: DAO}) {

  const {suiUserInfo, userInfo, loginByJwt} = useLoginStore();
  const [tasks, setTasks] = useState<task[]>([])
  const [taskByDate, setTaskByDate] = useState<{tasks: task[], date: string}[]>([])

  useEffect(() => {
    initial()
  }, [props.dao])

  useEffect(() => {
    setTaskByDate([])
    taskByDatehandler()
  }, [tasks])

  async function initial() {
    if(props.dao.dao_id != "") {
        const t = await daoTask(props.dao.dao_id)
        setTasks(t)
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
      <div>
        <div className="flex items-center justify-end">
            <TaskCreator dao={props.dao}/>
            <TaskSelector />
        </div>
        {sortTaskGroupsByDate(taskByDate).map((d, index) => {
          return <TaskDate date={d.date} task={d.tasks}/>
        })}
      </div>
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
