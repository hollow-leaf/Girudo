import Image from 'next/image'
import { DAO, member, task } from '../type';
import { useEffect, useState } from 'react';
import { ModalXs } from '@/components/Modal/ModalXS';
import { Popover } from 'flowbite-react';
import { daoMember } from '@/services/serverless/dao';
import { Member } from '../dao/DaoMember/Member';
import { useLoginStore } from '@/stores/useUserStore';
import { jwtDecode } from 'jwt-decode';
import { DaoJoinButton } from './DaoJoinButton';

export function DaoInfoCard(props: {daoInfo: DAO, daoAvater: string, showBox: any, close: any}) {
    
    const [isLoading, setIsloading] = useState<boolean>(false)
    const [members, setMembers] = useState<member[]>([])
    const [tasks, setTasks] = useState<task[]>([])
    const {suiUserInfo, userInfo, loginByJwt} = useLoginStore();
    const [joinShow, setJoinShow] = useState<boolean>(true)

    useEffect(() => {
      initial()
    }, [])
  
    useEffect(() => {
        if(suiUserInfo.jwt != "") {
            const i = jwtDecode(suiUserInfo.jwt).sub as string
            members.map(member => {
                if(member.user_id == i) {
                    setJoinShow(false)
                }
            })
        }
      }, [suiUserInfo, members])

    async function initial() {
        const r = await daoMember(props.daoInfo.dao_id)
        setMembers(r)
    }

    return (
        <ModalXs showBox={props.showBox} closed={props.close} isLoading={isLoading}>
            <div className='w-[300px] h-[600px] lg:w-[550px] lg:h-[700px] flex flex-col items-center'>
                <Popover
                    aria-labelledby="default-popover"
                    arrow={false}
                    trigger="hover"
                    content={
                        <div className="p-2">{props.daoInfo.dao_name}</div>
                    }
                    placement="top"
                    theme={{base: "absolute z-20 glass outline-none border-0 rounded-lg shadow-sm"}}
                    >
                    <Image
                    className='w-[150px] h-[150px] lg:w-[200px] lg:h-[200px] mx-1 glass border-2 lg:border-4 border-cBlue rounded-full'
                    src={props.daoAvater}
                    width={300}
                    height={300}
                    alt="Picture of the author"
                    />
                </Popover>
                <div className='w-full text-center py-3 text-cBlue text-4xl font-medium'>{props.daoInfo.dao_name}</div>
                <div className='w-full text-center mt-2 py-4 text-cBlue text-2xl font-medium'>Intro</div>
                <div className='w-full text-center mt-2 py-2 text-cBlue text-xl'>{props.daoInfo.dao_description}</div>
                <div>
                    <div className='w-full text-center mt-2 py-4 text-cBlue text-2xl font-medium'>Member</div>
                    <div className="w-[280px] lg:w-[500px] flex flex-nowrap lg:justify-center lg:flex-wrap overflow-y-auto rounded-lg p-2 lg:mx-8 text-black z-10">
                    {members.map((member) => {
                        return <Member key={member.user_name} member={member}/>
                    })}
                    </div>
                </div>
                <div>
                    {joinShow && <DaoJoinButton daoId={props.daoInfo.dao_id} loadingControl={setIsloading}/>}
                </div>
            </div>
        </ModalXs>
    )
}