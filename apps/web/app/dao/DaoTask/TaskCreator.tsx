import React from 'react';
import Image from "next/image";
import { useState } from "react";
import { ModalL } from "@/components/Modal/ModalL";
import { DatePickerSection } from "@/components/Modal/DatePicker";
import { TaskPoapSelector } from './TaskPoapSelector';
import { TaskPointSelecetor } from './TaskPointSelecetor'
import { newTask } from '@/services/serverless/task';
import { DAO } from '@/app/type';
import { useLoginStore } from '@/stores/useUserStore';
import { jwtDecode } from 'jwt-decode';

export function TaskCreator(props: {dao: DAO}) {

  const {suiUserInfo, userInfo, loginByJwt} = useLoginStore();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  const [showBow, setShowBox] = useState<boolean>(false);
  const [taskName, setTaskName] = useState<string>("")
  const [taskDescription, setTaskDescription] = useState<string>("")
  const [isPoap, setIsPoap] = useState<boolean>(false)
  const [poapChain, setPoapChain] = useState<"" | "Ethereum" | "Solana" | "Sui">("")
  const [isPoint, setIsPoint] = useState<boolean>(false)
  const [point, setPoint] = useState<number>(0)
  const [dateSelectedStart, setDateSelectedStart] = useState<Date>();
  const [dateSelectedEnd, setDateSelectedEnd] = useState<Date>();

  async function createTask() {

    setIsLoading(true)
    if(taskName == "" || dateSelectedStart == undefined || dateSelectedEnd == undefined || taskDescription == "" || suiUserInfo.jwt == "") {
      alert("Fillfull all columns!")
      setIsLoading(false)
      return
    }

    var prize = ""
    if(isPoap && poapChain != "") {
      prize = prize + poapChain +" POAP"
    }
    if(isPoint && point > 0) {
      if(prize.length > 0) prize = prize + " AND "
      prize = prize + String(point) + " POINT"
    }

    const r = await newTask(props.dao.dao_id, jwtDecode(suiUserInfo.jwt).sub as string, taskName, dateSelectedStart.toISOString().split("T")[0] as string, dateSelectedEnd.toISOString().split("T")[0] as string, taskDescription, prize)
    if(r) {
      setIsSuccess(true)
    } else {
      alert("Something going wrong")
    }

    setIsLoading(false)
  }

  return (
    <div>
      <button
        onClick={() => {
          setShowBox(true);
        }}
        className="mb-2 text-white bg-cBlue focus:ring-4 focus:outline-none focus:ring-white/40 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
      >
        Create Task
      </button>
      <ModalL
        isLoading={isLoading}
        showBox={showBow}
        closed={() => {
          setShowBox(false);
        }}
      >
        <div className="lg:flex pb-8 px-3 lg:px-8">
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
            <input
              value={taskName}
              onChange={(e) => {setTaskName(e.target.value)}}
              placeholder="Task Name"
              className="w-full text-4xl border-b-2 border-cBlue/50 text-cBlue bg-white/0 focus:outline-none"
            ></input>
            <DatePickerSection
              selectedStart={dateSelectedStart}
              onSelectStart={setDateSelectedStart}
              onSelectEnd={setDateSelectedEnd}
              selectedEnd={dateSelectedEnd}
            />
            <textarea
              value={taskDescription}
              onChange={(e) => {setTaskDescription(e.target.value)}}
              rows={4}
              className="text-cBlue bg-white/0 block w-full my-2 border-0 border-b-2 border-cBlue/50 focus:outline-0 focus:ring-0 focus:border-cBlue/50"
              placeholder="Write the event description here..."
            ></textarea>
            <div className="text-cBlue text-lg font-medium">Option</div>
            <TaskPoapSelector isPoap={isPoap} setIsPoap={setIsPoap} setPoapChain={setPoapChain}/>
            <TaskPointSelecetor isPoint={isPoint} setIsPoint={setIsPoint} point={point} setPoint={setPoint}/>
          </div>
        </div>
        <div className="flex pb-8 px-3 md:px-8 justify-end">
          <button onClick={createTask} className="bg-cBlue p-3 text-white rounded-md">Create</button>
        </div>
      </ModalL>
    </div>
  );
}
