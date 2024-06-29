import { getAvater } from '@/services/serverless/common';
import { useLoginStore } from '@/stores/useUserStore';
import { jwtDecode } from 'jwt-decode';
import Image from 'next/image'
import { useEffect, useState } from 'react';

export function Profile() {

    const {suiUserInfo, userInfo, loginByJwt} = useLoginStore();
    const [preview, setPreview] = useState<string>("");

    useEffect(() => {
        initial()
    }, [suiUserInfo])

    async function initial() {
        if(suiUserInfo.jwt != "") {
            const a = await getAvater(jwtDecode(suiUserInfo.jwt).sub as string)
            if(a != undefined) setPreview(a)
        }
    }

    return (
        <div className="w-full lg:w-64 lg:h-[700px] my-6 lg:mx-6 lg:my-0 rounded-lg glass">
            <div className="flex justify-center px-4 py-8">
                <div className="space-y-6 text-black">
                    <Image
                    src={preview == "" ? "/task0.png" : preview}
                    width={180}
                    height={180}
                    alt="Picture of the author"
                    className='rounded-full border-cBlue border-4 w-[100px] h-[100px] lg:w-[180px] lg:h-[180px]'
                    />
                    <div>
                        <div className="text-center md:text-2xl">{userInfo.username == "" ? "Brother Jake" : userInfo.username}</div>
                        <div className="text-center text-black/60 text-xs md:text-sm">Joined March 2022</div>
                        <div className="text-center text-cBlue text-sm md:text-lg">6666 GDO</div>
                    </div>
                </div>
            </div>
        </div>
    )
}