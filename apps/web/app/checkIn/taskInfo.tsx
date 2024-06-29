import { ModalL } from "@/components/Modal/ModalL";
import { useLoginStore } from "@/stores/useUserStore";
import { useState } from "react";
import Image from "next/image";
import { DAO, task } from "../type";
import { Button } from "../components/common/button";

export function TaskInfo(props: {showBow: any, close: any, dao: DAO, task: task, checkInHandler: any}) {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isSuccess, setIsSuccess] = useState<boolean>(false)

    const {suiUserInfo, userInfo, loginByJwt} = useLoginStore();

    return (
        <ModalL
            isLoading={isLoading}
            showBox={props.showBow}
            closed={props.close}
        >
            <div className="pb-8 px-3 lg:px-8">
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
                    <div className="text-black">
                        {props.task.task_description}
                    </div>
                </div>
                <div className="my-8 w-full flex justify-center">
                    <Button name="Check In" handler={props.checkInHandler}/>
                </div>
            </div>
        </ModalL>
    )
}