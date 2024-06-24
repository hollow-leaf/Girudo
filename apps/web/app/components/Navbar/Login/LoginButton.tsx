import { useState } from "react"
import { ModalXs } from "../../Modal/ModalXS"

export function LoginButton() {

    const [isShow, setIsShow] = useState<boolean>(true)

    return (
        <div>
            <button onClick={()=>{setIsShow(true)}} className="bg-cBlue px-4 py-2 text-medium rounded-lg">Login</button>
            <ModalXs showBox={isShow} closed={()=>{setIsShow(false)}}><div></div></ModalXs>
        </div>
    )
}