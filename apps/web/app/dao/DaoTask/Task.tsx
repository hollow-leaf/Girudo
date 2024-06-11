import { TaskCreator } from './TaskCreator'
import { TaskDate } from './TaskDate'
import { TaskSelector } from './TaskSelector'

export function Task() {
    return (
        <div className="flex justify-center p-4 rounded-b-lg glass2">
            <div>
                <div className="flex items-center mb-2 space-x-4 md:justify-end">
                    <TaskSelector />
                    <TaskCreator />
                </div>
                <TaskDate />
                <TaskDate />
            </div>
        </div>
    )
}