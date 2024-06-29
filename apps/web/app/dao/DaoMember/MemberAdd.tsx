import { useEffect, useState } from "react";
import Image from "next/image";
import { DAO } from "../../type";
import { Button } from "../../components/common/button";
import { ModalXs } from "../../../components/Modal/ModalXS";
import { addMember } from "@/services/serverless/dao";

export function MemberAdd(props: {dao: DAO}) {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isSuccess, setIsSuccess] = useState<boolean>(false)
    const [showBow, setShowBox] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("")

    useEffect(() => {
        setIsSuccess(false)
        setEmail("")
    }, [])

    async function addHandler() {
        setIsLoading(true)
        if(email == "") return
        const r = await addMember(props.dao.dao_id, "Member", email)
        if(r) {
            setIsSuccess(true)
        } else {
            alert("The email does't exist!")
        }
        setIsLoading(false)
    }

    return (
        <div>
            <Button name="Add Member" handler={() => {setShowBox(true)}}/>
            <ModalXs isLoading={isLoading} showBox={showBow} closed={() => {setShowBox(false)}}>
                <div>
                    {!isSuccess ?
                    <div className='flex flex-col items-center justify-center w-full h-[400px] p-10'>
                        <div className="w-full text-center text-3xl font-medium pb-16">New Member Invite</div>
                        <div className='flex items-center'>
                            <div className='w-24 text-xl text-cBlue pr-2 border-r-2 border-cBlue/50'>Email</div>
                            <input onChange={(e => {setEmail(e.target.value)})} placeholder="Invitee e-mail" className="my-4 w-full text-xl mx-2 text-black bg-white/0 focus:outline-none" value={email}/>
                        </div>
                        <div className="md:flex mt-6 pb-8 justify-end">
                            <Button name='Add' handler={addHandler}/>
                        </div>
                    </div>
                    :
                    <div className='flex flex-col items-center justify-center w-full h-[400px] p-10'>
                        <Image
                        className="rounded-2xl h-[150px] w-[150px]"
                        src='./check3.png'
                        width={250}
                        height={250}
                        alt="Picture of the author"
                        />
                        <div className='w-full py-6 text-xl text-cBlue font-medium text-center'>Add member complete</div>
                    </div>
                    }
                </div>
            </ModalXs>
        </div>
    )
}