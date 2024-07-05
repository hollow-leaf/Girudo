import { Button } from '@/app/components/common/button';
import React, { useState } from 'react';
import Image from "next/image";
import { uploadFile } from '@/services/serverless/common';
import { setSaltByUserIdToken } from '@/services/serverless/user';
import { generateRandomness } from '@mysten/zklogin';
import { AvaterUploadArea } from '@/components/Avater/ImageCropProvider';

export function RegisterForm(props: {sub: string | undefined, loading: any}) {

    const [registerSuccess, setRegisterSuccess] = useState<boolean>(false)
    const [preview, setPreview] = useState<string | null>(null);
    const [name ,setName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [cropStep, setCropStep] = useState<boolean>(false)

    async function registerHandler() {
        if(name == "" || email == "") return
        props.loading(true)

        var cid = ""
        const salt = generateRandomness();
        if(preview !== undefined && preview) await uploadFile(preview, props.sub as string)

        const r = await setSaltByUserIdToken(props.sub as string, salt, {user_name: name, user_email: email, avater: cid, suiAddress: "", user_id: ""})
        if(r) {
            setRegisterSuccess(true)
        } else {
            alert("Something going wrong.")
        }
        props.loading(false)
    }

    return (
        <div className=''>
            {!registerSuccess ?
            <div>
                <AvaterUploadArea setAvater={setPreview} cropStep={cropStep} setCropStep={setCropStep}/>
                {!cropStep && 
                <div>
                    <div className='flex items-center'>
                        <div className='w-24 text-xl text-cBlue pr-2 border-r-2 border-cBlue/50'>Name</div>
                        <input onChange={(e => {setName(e.target.value)})} placeholder="Your good good ID" className="my-4 w-full text-xl mx-2 text-black bg-white/0 focus:outline-none" value={name}/>
                    </div>
                    <div className='flex items-center'>
                        <div className='w-24 text-xl text-cBlue pr-2 border-r-2 border-cBlue/50'>Email</div>
                        <input onChange={(e => {setEmail(e.target.value)})} placeholder="Your e-mail" className="my-4 w-full text-xl mx-2 text-black bg-white/0 focus:outline-none" value={email}/>
                    </div>
                    <div className="md:flex mt-6 pb-8 justify-end">
                        <Button name='Register' handler={registerHandler}/>
                    </div>
                </div>
                }
            </div>
            :
            <div className='flex flex-col items-center justify-center w-full h-[400px]'>
                <Image
                className="rounded-2xl h-[150px] w-[150px]"
                src='./check3.png'
                width={250}
                height={250}
                alt="Picture of the author"
                />
                <div className='w-full py-6 text-xl text-cBlue font-medium text-center'>Register complete</div>
                <Button name='Reload page' handler={()=> {window.location.reload()}}/>
            </div>
            }
        </div>
    )
}