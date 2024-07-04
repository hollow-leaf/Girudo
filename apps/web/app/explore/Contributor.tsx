
import Image from 'next/image'
import { Popover } from "flowbite-react";
import { useEffect, useState } from 'react';
import { getAvater } from '@/services/serverless/common';
import { UserInfo } from '@/type';
import { UserInfoCard } from '@/components/card/UserInfoCard';

export function Contributor(props: {contributor: UserInfo}) {

    const [preview, setPreview] = useState<string>("./girudo.png");
    const [showBox, setShowBox] = useState<boolean>(false)

    useEffect(() => {
        initialize()
    }, [props])

    async function initialize() {
        const a = await getAvater(props.contributor.user_id)
        if(a != undefined && a) setPreview(a)
    }

    return (   
        <div className="flex flex-col min-w-[100px] m-4 items-center cursor-pointer z-20">
            <Popover
                aria-labelledby="default-popover"
                arrow={false}
                trigger="hover"
                content={
                    <div className="p-2">{props.contributor.user_name}</div>
                }
                placement="top"
                theme={{base: "absolute z-20 glass outline-none border-0 rounded-lg shadow-sm"}}
                >
                <Image
                onClick={() => {setShowBox(true)}}
                className='w-[100px] h-[100px] lg:w-[200px] lg:h-[200px] my-1 mx-1 glass border-2 lg:border-4 border-cBlue rounded-full'
                src={preview}
                width={300}
                height={300}
                alt="Picture of the author"
                />
            </Popover>
            <div className='py-2 text-cBlue lg:text-2xl font-medium'>{props.contributor.user_name}</div>
            <UserInfoCard userInfo={{user_name: props.contributor.user_name, user_id: props.contributor.user_id, user_email: "", suiAddress: "", avater: preview}} showBox={showBox} close={() => {setShowBox(false)}}/>
        </div>
    )
}