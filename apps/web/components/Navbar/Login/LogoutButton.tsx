import { Button } from "@/app/components/common/button";
import { useLoginStore } from "@/stores/useUserStore";

export function LogoutButton() {

    const {suiUserInfo, userInfo, logout} = useLoginStore();

    async function logoutHandler() {
        localStorage.removeItem("girudo-jwt")
        localStorage.removeItem("girudo-salt")
        sessionStorage.removeItem("girudo-jwt")
        sessionStorage.removeItem("girudo-salt")
        logout()
        window.location.reload()
    }

    return (
        <div className="mx-1 my-2 lg:mx-0">
            <Button name="Log out" handler={logoutHandler}/>
        </div>
    )
}