import Image from 'next/image'
import { member } from "../../type";
import { useEffect, useState } from 'react';
import { getAvater } from '@/services/serverless/common';

export function Member(props: {member: member}) {

    const [preview, setPreview] = useState<string>("./girudo.png");

    useEffect(() => {
        initialize()
    }, [props])

    async function initialize() {
        const a = await getAvater(props.member.user_id)
        if(a != undefined && a) setPreview(a)
    }

    return (
        <div>
            <div className="m-2 md:m-4">
                <Image
                className='max-w-[90px] max-h-[90px] md:max-w-[140px] md:max-h-[140px] rounded-full'
                src={preview}
                width={140}
                height={140}
                alt="Picture of the author"
                />
            </div>
            <div className="text-center text-black text-lg md:text-2xl">{props.member.user_name}</div>
            <div className="text-center text-black/60 text-sm md:text-lg">{props.member.member_role}</div>
        </div>
    )
}