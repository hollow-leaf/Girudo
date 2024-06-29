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

  useEffect(() => {
    initial()
  }, [suiUserInfo])

  async function initial() {
    if(suiUserInfo.jwt != "") {
        const t = await taskByUserID(jwtDecode(suiUserInfo.jwt).sub as string)
        setTasks(t)
    }
  }

  return (
    <div className="flex justify-center p-4">
      <div>
        <div className="flex items-center justify-end">
          <TaskSelection />
        </div>
        <TaskDate date={tasks[0]? tasks[0].task_start : ""} task={tasks}/>
      </div>
    </div>
  );
}
