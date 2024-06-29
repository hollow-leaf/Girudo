import { task } from "@/app/type";
import { serverlessHost } from "./common";

export async function newTask(dao_id: string, sub: string, task_name: string, task_start: string, task_end: string, task_description: string, task_prize: string): Promise<boolean> {
    const task_id = Math.floor(Math.random() * (10 ** 12))

    const response = await fetch(serverlessHost + "/task/new", {
        method: 'POST',
        body: JSON.stringify({
            "task_id": task_id,
            "dao_id": dao_id,
            "task_name": task_name,
            "task_start": task_start,
            "task_end": task_end,
            "task_description": task_description,
            "task_status": "register",
            "task_prize": task_prize
        })
    });
    if(response.status == 200) {
        const r = await registerTask(task_id, sub, "Approve", "Creator")
        return true
    } else {
        return false
    }
}

export async function registerTask(task_id: number, sub: string, participant_status: "Pending" | "Approve" | "Reject" | "checkIn", participant_role: "Creator" | "Admiin" | "VIP" | "Participant"): Promise<boolean> {
    const response = await fetch(serverlessHost + "/task/register", {
        method: 'POST',
        body: JSON.stringify({
            "sub": sub,
            "participant_status": participant_status,
            "participant_role": participant_role,
            "task_id": task_id
        })
    });
    if(response.status == 200) {
        return true
    } else {
        return false
    }
}

export async function registerApprove(task_id: number, sub: string): Promise<boolean> {
    const response = await fetch(serverlessHost + "/task/approve", {
        method: 'POST',
        body: JSON.stringify({
            "sub": sub,
            "task_id": task_id
        })
    });
    if(response.status == 200) {
        return true
    } else {
        return false
    }
}

export async function taskCheckIn(task_id: number, sub: string): Promise<boolean> {
    const response = await fetch(serverlessHost + "/task/checkIn", {
        method: 'POST',
        body: JSON.stringify({
            "sub": sub,
            "task_id": task_id
        })
    });
    if(response.status == 200) {
        return true
    } else {
        return false
    }
}

export async function taskBytaskId(task_id: number): Promise<task | null> {
    console.log(task_id)
    const response = await fetch(serverlessHost + "/task/info", {
        method: 'POST',
        body: JSON.stringify({
            "task_id": task_id
        })
    });
    if(response.status == 200) {
        const r = await response.json()
        console.log(r)
        return r[0]
    } else {
        return null
    }
}

export async function allTask(): Promise<task[]> {
    const response = await fetch(serverlessHost + "/task/all", {
        method: 'POST',
    });
    if(response.status == 200) {
        const r = await response.json()
        return r
    } else {
        return []
    }
}