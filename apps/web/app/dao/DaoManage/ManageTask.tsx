import { Button } from "@/app/components/common/button";
import { task } from "@/app/type";

export function ManageTask(props: {tasks : task[]}) {
    return (
        <div className="w-[400px] lg:w-[700px] my-4 relative overflow-x-auto rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right">
                <thead className="bg-white/50 text-xs text-gray-700 uppercase">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Task name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Start
                        </th>
                        <th scope="col" className="px-6 py-3">
                            End
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Status
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Management
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Dispatch
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.tasks.map((task) => {
                            return (
                                <tr className="border-b bg-white/40">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        {task.task_name}
                                    </th>
                                    <td className="px-6 py-4">
                                        {task.task_start}
                                    </td>
                                    <td className="px-6 py-4">
                                        {task.task_end}
                                    </td>
                                    <td className="px-6 py-4">
                                        {task.task_status}
                                    </td>
                                    <td className="px-6 py-4">
                                        <Button name="Management" handler={() => {}}/>
                                    </td>
                                    <td className="px-6 py-4">
                                        <Button name="Dispatch" handler={() => {}}/>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>

    )
}