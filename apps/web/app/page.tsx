"use client"
import { Task } from "@/components/Task/Task";
import { useLoginStore } from "@/stores/useUserStore";
import Explore from "./explore/page";

export default function Page(): JSX.Element {

  const {suiUserInfo, userInfo, loginByJwt} = useLoginStore();

  return (
    <main className="">
      {suiUserInfo.jwt == "" ? <Explore /> : <Task />}
    </main>
  );
}
