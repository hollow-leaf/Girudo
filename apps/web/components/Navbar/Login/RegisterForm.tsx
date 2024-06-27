import { Button } from '@/app/components/common/button';
import React, { useState } from 'react';
import Image from "next/image";
import { uploadFile } from '@/services/pinta';
import { setSaltByUserIdToken } from '@/services/serverless';
import { generateRandomness } from '@mysten/zklogin';

export function RegisterForm(props: {sub: string | undefined, loading: any}) {

    const [registerSuccess, setRegisterSuccess] = useState<boolean>(false)
    const [avater, setAvater] = useState<File | null>()
    const [preview, setPreview] = useState<string | null>(null);
    const [name ,setName] = useState<string>("")
    const [email, setEmail] = useState<string>("")

    function uploadHandler(files: FileList | null) {
        if(files && files.length > 0) {
            setAvater(files[0])
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(files[0] as File);
        }
    }

    async function registerHandler() {
        if(name == "" || email == "") return
        props.loading(true)

        var cid = ""
        const salt = generateRandomness();
        if(avater !== undefined && avater) cid = await uploadFile(avater)
        const r = await setSaltByUserIdToken(props.sub as string, salt, {username: name, email: email, avater: cid, suiAddress: ""})
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
                <div className="flex mb-6 items-center justify-center w-full">
                    {preview == null ? 
                    <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50/40 hover:bg-gray-100">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                            </svg>
                            <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload your avater</span></p>
                            <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (MAX. 300x300px)</p>
                        </div>
                        <input onChange={(e) => {uploadHandler(e.target.files)}} id="dropzone-file" type="file" className="hidden" />
                    </label>
                    :
                    <div>
                        <Image
                            className="glass shadow rounded-2xl h-[250px] w-[250px]"
                            src={preview}
                            width={250}
                            height={250}
                            alt="Picture of the author"
                        />
                        <div onClick={()=>{
                        setAvater(null)
                        setPreview(null)
                        }} className='mt-2 flex w-full cursor-pointer justify-center items-center'>
                            <div>Reset avater</div>
                            <Image
                            className="shadow mx-1 rounded-2xl h-[15px] w-[15px]"
                            src='./rotate-right.png'
                            width={15}
                            height={15}
                            alt="Picture of the author"
                            />
                        </div>
                    </div>
                    }
                </div>
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