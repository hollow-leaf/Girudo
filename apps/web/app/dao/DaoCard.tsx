
import Image from 'next/image'
import { Popover } from "flowbite-react";

export function DaoCard() {
    return (   
        <div className="flex min-w-[100px] mx-1 items-center cursor-pointer z-20">
            <Popover
                aria-labelledby="default-popover"
                arrow={false}
                trigger="hover"
                content={
                    <div className="p-2">XueDAO</div>
                }
                placement="right"
                theme={{base: "absolute z-20 glass outline-none border-0 rounded-lg shadow-sm"}}
                >
                <Image
                className='my-1 mx-1 glass border-2 border-cBlue rounded-full'
                src="/girudo.png"
                width={100}
                height={100}
                alt="Picture of the author"
                />
            </Popover>
        </div>
    )
}