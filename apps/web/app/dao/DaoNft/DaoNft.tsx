import React from 'react';
import Image from 'next/image'

export function Nft() {
    return (
        <div className="flex justify-center w-[150px] md:w-56 m-2 md:m-4 p-1 md:p-4 cursor-pointer glass border-2  border-cBlue rounded-lg shadow">
            <div>
                <div>
                    <Image
                    src="/task0.png"
                    width={180}
                    height={180}
                    alt="Picture of the author"
                    />
                </div>
                <div className="mt-2 text-black">
                        <div className="flex">
                            <Image
                            className='p-1 mr-1'
                            src="/party.svg"
                            width={24}
                            height={24}
                            alt="Picture of the author"
                            />
                            <div className="text-sm md:text-lg">XueDAO</div>
                        </div>
                        <div className="flex items-center">
                        <Image
                        className='p-1 mr-1'
                        src="/medal.svg"
                        width={24}
                        height={24}
                        alt="Picture of the author"
                        />
                        <div className="text-sm md:text-lg">100 points</div>
                    </div>
                </div>
            </div>
        </div>
    )
}