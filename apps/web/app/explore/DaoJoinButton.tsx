import { useLoginStore } from "@/stores/useUserStore";
import { Button } from "../components/common/button";
import { addMemberBySub } from "@/services/serverless/dao";
import { jwtDecode } from "jwt-decode";
import { LoginButton } from "@/components/Navbar/Login/LoginButton";

export function DaoJoinButton(props: {daoId: string, loadingControl: any}) {

    const {suiUserInfo, userInfo, loginByJwt} = useLoginStore();

    async function joinHandler() {
        if(suiUserInfo.jwt == "") return

        props.loadingControl(true)
        const r = await addMemberBySub(props.daoId, "Member", jwtDecode(suiUserInfo.jwt).sub as string)
        if(r) {
            alert("Successful!")
        } else {
            alert("Something going wrong!")
        }
        props.loadingControl(false)
    }

    return (
        <div className="p-4 my-4 flex w-full justify-center">
            {suiUserInfo.jwt != "" ?
            <Button name="Join!" handler={joinHandler} />
            :
            <div className="flex flex-col items-center">
                <div className='w-full text-center mt-2 py-6 text-cBlue text-2xl font-medium'>Login to Join!</div>
                <LoginButton />
            </div>
            }
        </div>
    )
}