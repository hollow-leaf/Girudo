import { useEffect, useState } from "react";
import { DAO, member } from "../../type";
import { Member } from "./Member";
import { daoMember } from "@/services/serverless/dao";

export function DaoMember(props:{dao: DAO}) {

    const [members, setmembers] = useState<member[]>([])

    useEffect(() => {
        initial()
      }, [])
    
      async function initial() {
        const r = await daoMember(props.dao.dao_id)
        setmembers(r)
      }

    return (
        <div className="flex rounded-b-lg w-full flex-wrap glass2 p-4 md:p-8" >
            {members.map((member) => {
                return <Member key={member.user_name} member={member}/>
            })}
        </div>
    )
}