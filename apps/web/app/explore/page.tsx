"use client"
import { useEffect, useState } from "react"
import { DAO, member, task } from "../type"
import { UserInfo } from "@/type"
import { allUser } from "@/services/serverless/user"
import { allDAO } from "@/services/serverless/dao"
import { allTask } from "@/services/serverless/task"
import { DaoCard } from "../dao/DaoCard"
import { DaoLogo } from "./DaoLogo"
import { Contributor } from "./Contributor"
import { AwesomeTask } from "./AwesomeTask"

export default function Explore(): JSX.Element {

    const [daos, setDaos] = useState<DAO[]>([])
    const [contributors, setContributors] = useState<UserInfo[]>([])
    const [tasks, setTasks] = useState<task[]>([])

    useEffect(() => {
        initial()
      }, [])

    async function initial() {
        const _users = await allUser()
        const _dao = await allDAO()
        const _tasks = await allTask()
        setContributors(_users)
        setDaos(_dao)
        setTasks(_tasks)
        console.log(_users, _dao, _tasks)
    }
      
    return (
        <div className="px-6 lg:px-10">
            <div className="w-full flex flex-col items-center py-36 lg:py-[360px]">
                <p className="text-3xl lg:text-7xl font-extrabold text-cBlue">Participate and Contribute</p>
                <div className="text-3xl lg:text-7xl font-extrabold text-cBlue" >to the <span className="text-4xl lg:text-8xl font-extrabold bg-gradient-to-r from-[#3F09F9] via-[#CB6BE0] to-[#CE2CE5] inline-block text-transparent bg-clip-text">DAO Community</span></div>
            </div>
            <div className="w-full flex flex-col items-start py-10 lg:py-24">
                <p className="text-3xl lg:text-7xl font-extrabold text-cBlue">Meets Awesome DAO</p>
            </div>
            <div className="flex flex-wrap justify-center lg:justify-start">
            {
                daos.map((dao) => {
                    return <DaoLogo key={dao.dao_id} dao={dao} daoSelector={() => []}/>
                })
            }
            </div>
            <div className="w-full flex flex-col items-start py-10 lg:py-24">
                <p className="text-3xl lg:text-7xl font-extrabold text-cBlue">Enthusiastic and Passionate Contributors</p>
            </div>
            <div className="flex flex-wrap justify-center lg:justify-start">
            {
                contributors.map((contributor) => {
                    return <Contributor key={contributor.user_id} contributor={contributor} />
                })
            }
            </div>
            <div className="w-full flex flex-col items-start py-10 lg:py-24">
                <p className="text-3xl lg:text-7xl font-extrabold text-cBlue">Exciting and Challenging Tasks</p>
            </div>
            <div className="w-full flex flex-wrap justify-center">
            {
                tasks.map((task) => {
                    return <AwesomeTask task={task} />
                })
            }
            </div>
        </div>
    )
}