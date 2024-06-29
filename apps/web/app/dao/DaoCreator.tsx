import { useState } from "react";
import Image from "next/image";
import { Button } from "../components/common/button";
import { Popover } from "flowbite-react";
import { ModalXs } from "@/components/Modal/ModalXS";
import { ModalL } from "@/components/Modal/ModalL";
import { DatePickerSection } from "@/components/Modal/DatePicker";
import { createDAO } from "@/services/serverless/dao";
import { useLoginStore } from "@/stores/useUserStore";
import { jwtDecode } from "jwt-decode";
import { Loading } from "../components/common/loading";

export function DaoCreator() {

    const {suiUserInfo, userInfo, loginByJwt} = useLoginStore();

    const [isLoading, setisLoading] = useState<boolean>(false)
    const [showBow, setShowBow] = useState<boolean>(false)
    const [isSuccess, setIsSuccess] = useState<boolean>(false)
    const [avater, setAvater] = useState<File | null>()
    const [preview, setPreview] = useState<string | null>(null);
    const [name ,setName] = useState<string>("")
    const [description, setDescription] = useState<string>("")

    function uploadHandler(files: FileList | null) {
        if(files && files.length > 0 && files[0]?.size as number < 60000) {
            setAvater(files[0])
            console.log(files[0]?.size)
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(files[0] as File);
        } else if(files && files.length > 0 && files[0]?.size as number > 60000) {
            alert("The avater size must be less than 60 KB.")
        }
    }

    async function createHandler() {
        setisLoading(true)
        console.log(suiUserInfo.jwt)
        if(name == "" || description == "" || suiUserInfo.jwt == "") {
            alert("Fillfull all columns and log in")
            setisLoading(false)
            return
        }
        const _r = await createDAO(name, description, jwtDecode(suiUserInfo.jwt).sub as string, preview? preview: "")
        if(_r) setIsSuccess(true)
        setisLoading(false)
    }

    return (
        <div className=''>
            <Popover
                aria-labelledby="default-popover"
                arrow={false}
                trigger="hover"
                content={
                    <div className="p-2">Create DAO</div>
                }
                placement="right"
                theme={{base: "absolute z-20 glass outline-none border-0 rounded-lg shadow-sm"}}
                >
                <Image
                onClick={() => {setShowBow(true)}}
                className='my-1 mx-1 glass border-2 p-6 border-cBlue rounded-full cursor-pointer'
                src="/plus2.png"
                width={100}
                height={100}
                alt="Picture of the author"
                />
            </Popover>
            <ModalL
            isLoading={isLoading}
            showBox={showBow}
            closed={() => {
                setShowBow(false);
            }}
            >
            {!isSuccess?
            <div>
                <div className="w-[400px] pb-8 px-3 mt-2 md:px-8">
                    <div className="w-full flex justify-center">
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
                    <div className="p-4">
                        <div className="text-cBlue text-2xl my-2">DAO Name</div>
                        <input
                        onChange={(e) => {setName(e.target.value)}}
                        value={name}
                        placeholder="DAO Name"
                        className="w-full border-b-2 border-cBlue/50 text-cBlue bg-white/0 focus:outline-none"
                        ></input>
                        <div className="text-cBlue text-2xl my-2">Description</div>
                        <textarea
                        onChange={(e) => {setDescription(e.target.value)}}
                        value={description}
                        rows={4}
                        className="text-cBlue bg-white/0 block w-full my-2 border-0 border-b-2 border-cBlue/50 focus:outline-0 focus:ring-0 focus:border-cBlue/50"
                        placeholder="Write the event description here..."
                        ></textarea>
                    </div>
                </div>
                <div className="md:flex pb-8 px-3 md:px-8 justify-end">
                    <button onClick={createHandler} className="bg-cBlue p-3 text-white rounded-md">Create</button>
                </div>
            </div>:
            <div className="flex flex-col items-center justify-center h-[600px] w-[400px] pb-8 px-3 md:px-8">
                <Image
                className="rounded-2xl h-[150px] w-[150px]"
                src='./check3.png'
                width={250}
                height={250}
                alt="Picture of the author"
                />
                <div className='w-full py-6 text-xl text-cBlue font-medium text-center'>Create complete</div>
            </div>}
            </ModalL>
        </div>
    )
}