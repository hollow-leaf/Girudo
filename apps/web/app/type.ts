export type member = {
    user_name: string
    user_id: string
    dao_id: string
    member_role: string
}

export type DAO = {
    dao_id: string
    dao_name: string
    dao_description: string
}

export type task = {
    dao_description: string
    dao_id: string
    dao_name: string
    participant_role: string
    participant_status: string
    task_description: string
    task_start: string
    task_end: string
    task_id: number
    task_name: string
    task_prize: string
    task_status: string
}