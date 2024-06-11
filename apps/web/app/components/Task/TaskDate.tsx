import { TaskCard } from "./TaskCard";

export function TaskDate() {
    return (
        <div className="flex px-4">
            <div className="p-1 justify-center">
                <span className="flex w-5 h-5 me-3 bg-cBlue rounded-full"></span>
                <div className="ml-2 flex w-0.5 bg-cBlue h-full"></div>
            </div>
            <div>
                <div className="text-lg md:text-2xl font-medium text-black">6月28日</div>
                <TaskCard />
                <TaskCard />
                <TaskCard />
            </div>
        </div>
    )
}