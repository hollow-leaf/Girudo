"use client";
import { useState } from "react";
import { Task } from "@/components/Task/Task";
import { Profile } from "./Profile";
import { NftTable } from "@/components/Nft/NftTable";
import { ProfileInfo } from "./ProfileInfo/ProfileInfo";
import { useLoginStore } from "@/stores/useUserStore";
import { Button } from "../components/common/button";
import { LoginButton } from "@/components/Navbar/Login/LoginButton";

export default function Page(): JSX.Element {
  const [selected, setSelected] = useState<string>("task");
  const {suiUserInfo, userInfo, loginByJwt} = useLoginStore();


  return (
    <div className="bg-cover min-h-screen">
      {suiUserInfo.jwt == "" ?
      <div className="w-full flex justify-center items-center">
        <LoginButton />
      </div>
      :
      <div className="lg:flex justify-center p-4 lg:px-10 z-10">
        <Profile />
        <div className="md:w-[800px]">
          <div>
            <ul className="flex flex-wrap w-full text-sm font-medium text-center text-gray-500 border-b-2 border-cBlue">
              <li onClick={()=>{setSelected("info")}} className="me-2">
                {selected=="info"?
                <a href="#" aria-current="page" className="md:min-w-36 inline-block py-4 px-3 md:p-4 text-white bg-cBlue rounded-t-lg active">Info</a>:
                <a href="#" aria-current="page" className="md:min-w-36 inline-block py-4 px-3 md:p-4 text-cBlue rounded-t-lg active">Info</a>
                }              
                </li>
              <li onClick={()=>{setSelected("task")}} className="me-2">
                {selected=="task"?
                <a href="#" aria-current="page" className="md:min-w-36 inline-block py-4 px-3 md:p-4 text-white bg-cBlue rounded-t-lg active">Task</a>:
                <a href="#" aria-current="page" className="md:min-w-36 inline-block py-4 px-3 md:p-4 text-cBlue rounded-t-lg active">Task</a>
                }
              </li>
              <li
                onClick={() => {
                  setSelected("nft");
                }}
                className="me-2"
              >
                {selected == "nft" ? (
                  <a
                    href="#"
                    aria-current="page"
                    className="md:min-w-36 inline-block py-4 px-3 md:p-4 text-white bg-cBlue rounded-t-lg active"
                  >
                    POAP
                  </a>
                ) : (
                  <a
                    href="#"
                    aria-current="page"
                    className="md:min-w-36 inline-block py-4 px-3 md:p-4 text-cBlue rounded-t-lg active"
                  >
                    POAP
                  </a>
                )}
              </li>
              <li
                onClick={() => {
                  setSelected("records");
                }}
                className="me-2"
              >
                {selected == "records" ? (
                  <a
                    href="#"
                    aria-current="page"
                    className="md:min-w-36 inline-block py-4 px-3 md:p-4 text-white bg-cBlue rounded-t-lg active"
                  >
                    Records
                  </a>
                ) : (
                  <a
                    href="#"
                    aria-current="page"
                    className="md:min-w-36 inline-block py-4 px-3 md:p-4 text-cBlue rounded-t-lg active"
                  >
                    Records
                  </a>
                )}
              </li>
            </ul>
          </div>
          {selected == "task" && <Task />}
          {selected == "nft" && <NftTable />}
          {selected == "records" && <Task />}
          {selected == "info" && <ProfileInfo />}
        </div>
      </div>}
    </div>
  );
}
