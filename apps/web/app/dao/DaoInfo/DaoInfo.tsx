import { DAO } from '@/app/type'
import { getAvater } from '@/services/serverless/common';
import Image from 'next/image'
import { useEffect, useState } from 'react';

export function DapInfo(props: {dao: DAO}) {

    const [preview, setPreview] = useState<string>("./girudo.png");

    useEffect(() => {
        initialize()
    }, [props.dao])

    async function initialize() {
        setPreview("./girudo.png")
        const a = await getAvater(props.dao.dao_id)
        if(a != undefined && a) setPreview(a)
    }

    return (
        <div className="flex rounded-b-lg p-2 md:p-8 w-full justify-center md:justify-start glass2">
            <div className="md:flex">
                <div>
                    <div className="flex justify-center">
                        <Image
                        className='my-4 glass border-2 border-cBlue rounded-full'
                        src={preview}
                        width={200}
                        height={200}
                        alt="Picture of the author"
                        />
                    </div>
                    <div className="text-center text-black text-2xl md:text-4xl">{props.dao.dao_name}</div>
                    <div className="text-center text-black/60 text-sm md:text-lg">Created June 2024</div>
                </div>
                <div className='p-10'>
                    <div className="text-lg text-black">
                        {props.dao.dao_description}
                    </div>
                </div>
            </div>
        </div>
    )
}