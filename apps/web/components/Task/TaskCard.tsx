import Image from 'next/image'
import { TaskInfo } from "./ProfileTaskinfo"
import { useState } from 'react';
import { task } from '@/app/type';

export function TaskCard(props: {task: task}) {

    const [showBow, setShowBox] = useState<boolean>(false);

    return (
        <div onClick={() => {setShowBox(true)}} className="my-4 lg:w-[600px] glass cursor-pointer max-w-xl border-1 border-cBlue justify-between space-x-5 text-black p-4 flex rounded-md">
            <div className='flex flex-col justify-between'>
                <div className="md:text-2xl font-medium">{props.task.task_name}</div>
                <div className=''>
                    <div className="flex items-center">
                        <Image
                        className='p-1 mr-1'
                        src="/party.svg"
                        width={24}
                        height={24}
                        alt="Picture of the author"
                        />
                        <div className="text-sm md:text-lg">{props.task.dao_name}</div>
                    </div>
                    <div className="flex items-center">
                        <Image
                        className='p-1 mr-1'
                        src="/medal.svg"
                        width={24}
                        height={24}
                        alt="Picture of the author"
                        />
                        <div className="text-sm md:text-lg">{props.task.task_prize}</div>
                    </div>
                    <div className="flex">
                        <div className="text-xs font-medium bg-cBlue p-1 my-1 rounded-md text-white md:text-sm">{props.task.participant_status}</div>
                    </div>
                </div>
            </div>
            <div>
                <Image
                src="/task0.png"
                width={180}
                height={180}
                alt="Picture of the author"
                />
            </div>
            <TaskInfo showBow={showBow} close={() => {setShowBox(false)}} task={props.task} dao={{dao_id: props.task.dao_id, dao_description: props.task.dao_description, dao_name: props.task.dao_name}} />
        </div>
    )
}