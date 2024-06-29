import { DAO, member, task } from '@/app/type'
import { getAvater } from '@/services/serverless/common';
import { daoMember, daoTask } from '@/services/serverless/dao';
import Image from 'next/image'
import { useEffect, useState } from 'react';
import { ManageTask } from './ManageTask';
import { ManageMember } from './ManageMember';
import { Loading } from '@/app/components/common/loading';

export function DapManage(props: {dao: DAO}) {
    
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [tasks, setTasks] = useState<task[]>([])
    const [members, setmembers] = useState<member[]>([])

    useEffect(() => {
        setIsLoading(true)
        initial()
        
      }, [props.dao])
    
      useEffect(() => {
      }, [tasks])
    
      async function initial() {
        if(props.dao.dao_id != "") {
            const t = await daoTask(props.dao.dao_id)
            setTasks(t)
        }
        const r = await daoMember(props.dao.dao_id)
        setmembers(r)
        setIsLoading(false)
      }

    return (
            <div className="flex rounded-b-lg p-2 lg:p-8 w-full justify-center lg:justify-start glass2">
                <div className="lg:flex">
                    <div className='overflow-hidden'>
                        {tasks.length > 0 && <div className='lg:text-3xl font-medium text-cBlue'>Task Management</div>}
                        {tasks.length > 0 && <ManageTask tasks={tasks}/>}
                        {members.length > 0 && <div className='lg:text-3xl font-medium text-cBlue'>Member Management</div>}
                        {members.length > 0 && <ManageMember members={members}/>}
                    </div>
                </div>
            </div>
    )
}

