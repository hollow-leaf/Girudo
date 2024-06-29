
import Image from 'next/image'
import { Popover } from "flowbite-react";
import { DAO } from '../type';
import { useEffect, useState } from 'react';
import { getAvater } from '@/services/serverless/common';

export function DaoCard(props: {dao: DAO, daoSelector: any}) {

    const [preview, setPreview] = useState<string>("./girudo.png");

    useEffect(() => {
        initialize()
    }, [props])

    async function initialize() {
        const a = await getAvater(props.dao.dao_id)
        if(a != undefined && a) setPreview(a)
    }

    return (   
        <div className="flex min-w-[100px] mx-1 items-center cursor-pointer z-20">
            <Popover
                aria-labelledby="default-popover"
                arrow={false}
                trigger="hover"
                content={
                    <div className="p-2">{props.dao.dao_name}</div>
                }
                placement="right"
                theme={{base: "absolute z-20 glass outline-none border-0 rounded-lg shadow-sm"}}
                >
                <Image
                onClick={() => {props.daoSelector(props.dao)}}
                className='my-1 mx-1 glass border-2 border-cBlue rounded-full'
                src={preview}
                width={100}
                height={100}
                alt="Picture of the author"
                />
            </Popover>
        </div>
    )
}