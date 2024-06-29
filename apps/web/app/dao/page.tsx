"use client";
import { useEffect, useState } from "react";
import { Task } from "./DaoTask/Task";
import { DaoList } from "./DaoList";
import { DaoNftTable } from "./DaoNft/DaoNftTable";
import { DapInfo } from "./DaoInfo/DaoInfo";
import { DaoMember } from "./DaoMember/DaoMember";
import { memberSample } from "../../sampleData/member";
import { daoByUserID } from "@/services/serverless/user";
import { useLoginStore } from "@/stores/useUserStore";
import { jwtDecode } from "jwt-decode";
import { DAO } from "../type";
import { DaoSampleData } from "@/sampleData/dao";

export default function Page(): JSX.Element {

  const {suiUserInfo, userInfo, loginByJwt} = useLoginStore();

  const [selected, setSelected] = useState<string>("task");
  const [daos, setDaos] = useState<DAO[]>([])
  const [daoSelected, setDaoSelected] = useState<DAO>(DaoSampleData)

  useEffect(() => {
    initial()
  }, [suiUserInfo])

  async function initial() {
    if(suiUserInfo.jwt != "") {
        const _dao = await daoByUserID(jwtDecode(suiUserInfo.jwt).sub as string)
        if(_dao.length > 0) {
          setDaos(_dao)
          setDaoSelected(_dao[0] as DAO)
        }
    }
  }


  return (
    <div className="bg-cover min-h-screen">
      <div className="md:flex justify-center p-4 md:px-10 z-10">
        <DaoList daos={daos} daoSelector={setDaoSelected}/>
        <div className="md:w-[800px]">
          <div className="text-4xl md:text-6xl text-black my-6 font-medium">
            {daoSelected.dao_name}
          </div>
          <div>
            <ul className="flex flex-wrap w-full text-sm font-medium text-center text-gray-500 border-b-2 border-cBlue">
              <li
                onClick={() => {
                  setSelected("info");
                }}
                className="me-2"
              >
                {selected == "info" ? (
                  <a
                    href="#"
                    aria-current="page"
                    className="md:min-w-36 inline-block py-4 px-3 md:p-4 text-white bg-cBlue rounded-t-lg active"
                  >
                    Info
                  </a>
                ) : (
                  <a
                    href="#"
                    aria-current="page"
                    className="md:min-w-36 inline-block py-4 px-3 md:p-4 text-cBlue rounded-t-lg active"
                  >
                    Info
                  </a>
                )}
              </li>
              <li
                onClick={() => {
                  setSelected("task");
                }}
                className="me-2"
              >
                {selected == "task" ? (
                  <a
                    href="#"
                    aria-current="page"
                    className="md:min-w-36 inline-block py-4 px-3 md:p-4 text-white bg-cBlue rounded-t-lg active"
                  >
                    Task
                  </a>
                ) : (
                  <a
                    href="#"
                    aria-current="page"
                    className="md:min-w-36 inline-block py-4 px-3 md:p-4 text-cBlue rounded-t-lg active"
                  >
                    Task
                  </a>
                )}
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
                  setSelected("member");
                }}
                className="me-2"
              >
                {selected == "member" ? (
                  <a
                    href="#"
                    aria-current="page"
                    className="md:min-w-36 inline-block py-4 px-3 md:p-4 text-white bg-cBlue rounded-t-lg active"
                  >
                    Member
                  </a>
                ) : (
                  <a
                    href="#"
                    aria-current="page"
                    className="md:min-w-36 inline-block py-4 px-3 md:p-4 text-cBlue rounded-t-lg active"
                  >
                    Member
                  </a>
                )}
              </li>
              <li
                onClick={() => {
                  setSelected("manage");
                }}
                className="me-2"
              >
                {selected == "manage" ? (
                  <a
                    href="#"
                    aria-current="page"
                    className="md:min-w-36 inline-block py-4 px-3 md:p-4 text-white bg-cBlue rounded-t-lg active"
                  >
                    Manage
                  </a>
                ) : (
                  <a
                    href="#"
                    aria-current="page"
                    className="md:min-w-36 inline-block py-4 px-3 md:p-4 text-cBlue rounded-t-lg active"
                  >
                    Manage
                  </a>
                )}
              </li>
            </ul>
          </div>
          {selected == "info" && <DapInfo dao={daoSelected}/>}
          {selected == "task" && <Task dao={daoSelected}/>}
          {selected == "nft" && <DaoNftTable />}
          {selected == "member" && <DaoMember dao={daoSelected}/>}
          {selected == "manage" && <Task dao={daoSelected}/>}
        </div>
      </div>
    </div>
  );
}
