import { TaskCard } from "./TaskCard";

export function TaskDate(props: {date: string, task: {task_name: string, task_prize: string, participant_status: string, dao_name: string}[]}) {
    return (
        <div className="flex px-4">
            <div className="p-1 justify-center">
                <span className="flex w-5 h-5 me-3 bg-cBlue rounded-full"></span>
                <div className="ml-2 flex w-0.5 bg-cBlue h-full"></div>
            </div>
            <div>
                <div className="text-lg md:text-2xl font-medium text-black">{props.date}</div>
                {
                    props.task.map((task) => {
                        return <TaskCard task={task}/>
                    })
                }
            </div>
        </div>
    )
}