import Image from 'next/image'
import { UserInfo } from "@/type";
import { ModalXs } from "../Modal/ModalXS";
import { useEffect, useState } from "react";
import { Popover } from "flowbite-react";
import { DAO } from '@/app/type';
import { daoByUserID } from '@/services/serverless/user';
import { DaoCard } from '@/app/dao/DaoCard';
import { Nft } from '../Nft/Nft';

export function UserInfoCard(props: {userInfo: UserInfo, showBox: any, close: any}) {

    const [isLoading, setIsloading] = useState<boolean>(false)
    const [daos, setDaos] = useState<DAO[]>([])
  
    useEffect(() => {
      initial()
    }, [])
  
    async function initial() {
        const _dao = await daoByUserID(props.userInfo.user_id)
        if(_dao.length > 0) {
          setDaos(_dao)
        }
    }
    return (
        <ModalXs showBox={props.showBox} closed={props.close} isLoading={isLoading}>
            <div className='w-[300px] h-[600px] lg:w-[550px] lg:h-[700px] flex flex-col items-center'>
                <Popover
                    aria-labelledby="default-popover"
                    arrow={false}
                    trigger="hover"
                    content={
                        <div className="p-2">{props.userInfo.user_name}</div>
                    }
                    placement="top"
                    theme={{base: "absolute z-20 glass outline-none border-0 rounded-lg shadow-sm"}}
                    >
                    <Image
                    className='w-[150px] h-[150px] lg:w-[200px] lg:h-[200px] mx-1 glass border-2 lg:border-4 border-cBlue rounded-full'
                    src={props.userInfo.avater}
                    width={300}
                    height={300}
                    alt="Picture of the author"
                    />
                </Popover>
                <div className='w-full text-center py-3 text-cBlue text-4xl font-medium'>{props.userInfo.user_name}</div>
                <div>
                    <div className='w-full text-center mt-2 py-2 text-cBlue text-2xl font-medium'>DAO</div>
                    <div className="w-[300px] lg:w-[500px] flex flex-nowrap lg:justify-center lg:flex-wrap overflow-auto rounded-lg p-2 lg:mx-8 text-black z-10">
                        {
                            daos.map((dao) => {
                                return <DaoCard key={dao.dao_id} dao={dao} daoSelector={() => {}}/>
                            })
                        }
                    </div>
                    <div className='w-full text-center mt-2 py-2 text-cBlue text-2xl font-medium'>POAP</div>
                    <div className="p-2 w-[300px] lg:w-[500px] flex flex-nowrap lg:justify-center lg:flex-wrap overflow-auto rounded-lg lg:mx-8 text-black z-10">
                        <Nft />
                        <Nft />
                        <Nft />
                        <Nft />
                        <Nft />
                        <Nft />
                        <Nft />
                        <Nft />
                        <Nft />
                        <Nft />
                        <Nft />
                        <Nft />
                    </div>
                </div>
            </div>
        </ModalXs>
    )
}