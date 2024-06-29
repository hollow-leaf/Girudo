"use client"
import { taskBytaskId, taskCheckIn } from "@/services/serverless/task";
import { useLoginStore } from "@/stores/useUserStore";
import queryString from "query-string";
import { useEffect, useState } from "react";
import { TaskInfo } from "./taskInfo";
import { DAO, task } from "../type";


export default function Page(): JSX.Element {

    const {suiUserInfo, userInfo, loginByJwt} = useLoginStore();

    const [params, setParams] = useState<queryString.ParsedQuery<string>>()
    const [taskId, setTaskId] = useState<number>(0)
    const [userId, setUserId] = useState<string>("")
    const [dao, setDao] = useState<DAO>()
    const [task, setTask] = useState<task>()
    const [showBow, setShowBow] = useState<boolean>(false)

    useEffect(() => {
        const res = queryString.parse(window.location.hash);
        setParams(res);
      }, []);
    
    useEffect(() => {
    if (params && params.task_id && params.user_id) {
        setTaskId(params.task_id as unknown as number)
        setUserId(params.user_id as string)
    }
    }, [params]);

    useEffect(() => {
        console.log(taskId)
        if(taskId != 0) taskInfoHandler()
    }, [taskId]);

    async function checkInHandler(task_id: number, sub: string) {
        const r = await taskCheckIn(task_id, sub)
        if(r) {
            alert("Check in successful")
            setShowBow(false)
        } else {
            alert("You have not role to check in")
        }
    }

    async function taskInfoHandler() {
        const r = await taskBytaskId(taskId)
        if(r) {
            setTask(r)
            setShowBow(true)
        }
    }

    return (
        <div>
            {task && <TaskInfo showBow={showBow}  close={() => {setShowBow(false)}} checkInHandler={() => {checkInHandler(taskId, userId)}} task={task} dao={{dao_description: task.dao_description, dao_id: task.dao_id, dao_name: task.dao_name}}/>}
        </div>
    )
}

//            <TaskInfo checkInHandler={checkInHandler(taskId, userId)} />
