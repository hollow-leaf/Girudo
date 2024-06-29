import React from 'react';
import Image from 'next/image'

export function TaskCard(props: {task: {task_name: string, task_prize: string, participant_status: string, dao_name: string}}) {
    return (
        <div className="my-4 lg:w-[600px] glass cursor-pointer max-w-xl border-1 border-cBlue justify-between space-x-5 text-black p-4 flex rounded-md">
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
        </div>
    )
}