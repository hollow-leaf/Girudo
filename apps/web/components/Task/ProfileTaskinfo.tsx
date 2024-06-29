import { useEffect, useState } from "react";
import Image from "next/image";
import QRCode from 'qrcode';
import { jwtDecode } from "jwt-decode";
import { useLoginStore } from "../../stores/useUserStore";
import { DAO, task } from "../../app/type";
import { ModalL } from "../Modal/ModalL";

export function TaskInfo(props: {showBow: any, close: any, dao: DAO, task: task}) {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isSuccess, setIsSuccess] = useState<boolean>(false)
    const [qr, setQr] = useState<string>("")

    const {suiUserInfo, userInfo, loginByJwt} = useLoginStore();

    useEffect(() => {
        if(suiUserInfo.jwt != "" && props.task.task_id) {
            generateQRCode(`https://girudo.pages.dev/checkIn#user_id=${jwtDecode(suiUserInfo.jwt).sub}&task_id=${props.task.task_id}`)
        }
    }, [suiUserInfo])

    async function generateQRCode(url: string) {
        try {
          // Generate the QR code as a data URL (base64 string)
          const qrCodeDataUrl = await QRCode.toDataURL(url);
          console.log(qrCodeDataUrl)
          setQr(qrCodeDataUrl)

        } catch (error) {
          console.error('Error generating QR code:', error);
          return ""
        }
    }

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
                {
                    (props.task.participant_role == "Participant" || props.task.participant_role == "VIP") ?
                    <div>
                        <div className="w-full text-center text-2xl font-medium">Check In QRcode</div>
                        {qr != "" &&<Image
                        className="my-1 mx-4 glass shadow rounded-2xl h-[300px] w-[300px]"
                        src={qr}
                        width={300}
                        height={300}
                        alt="Picture of the author"
                        />}
                    </div>
                    :
                    <div></div>
                }
            </div>
        </ModalL>
    )
}