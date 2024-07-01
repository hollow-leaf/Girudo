import { Button } from "@/app/components/common/button";

export function SignInWithGoogle(props: {loginHandler: any}) {
    return (
        <div className="flex flex-col items-center justify-center h-[400px]">
            <Button name='Sign in with Google' handler={props.loginHandler}/>
        </div>
    )
}