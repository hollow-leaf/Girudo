import { useState } from "react";
import { ModalL } from "../../../components/Modal/ModalL";
import Image from "next/image";
import { DAO, task } from "@/app/type";
import { registerTask } from "@/services/serverless/task";
import { useLoginStore } from "@/stores/useUserStore";
import { jwtDecode } from "jwt-decode";

export function TaskInfo(props: {showBow: any, close: any, dao: DAO, task: task}) {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isSuccess, setIsSuccess] = useState<boolean>(false)

    const {suiUserInfo, userInfo, loginByJwt} = useLoginStore();

    async function registerHandler() {
        setIsLoading(true)
        if(suiUserInfo.jwt != "") {
            const r = await registerTask(props.task.task_id, jwtDecode(suiUserInfo.jwt).sub as string, "Approve", "Participant")
            if(r) {
                alert("Register sucessful!")
                setIsSuccess(true)
            }
            setIsLoading(false)
        } else {
            setIsLoading(false)
            return
        }
    }

    return (
        <ModalL
            isLoading={isLoading}
            showBox={props.showBow}
            closed={props.close}
        >
            <div className="lg:flex lg:w-[800px] pb-8 px-3 lg:px-8">
                <div className='flex justify-center w-full lg:w-[350px]'>
                    <Image
                    className="my-1 mx-4 glass shadow rounded-2xl h-[300px] w-[300px]"
                    src="/girudo.png"
                    width={300}
                    height={300}
                    alt="Picture of the author"
                    />
                </div>
                <div className="p-4">
                    <div>
                        {props.task.task_description}
                    </div>
                </div>
            </div>
            <div className="flex pb-8 px-3 md:px-8 justify-end">
                <button onClick={registerHandler} className="bg-cBlue p-3 text-white rounded-md">Register</button>
            </div>
        </ModalL>
    )
}