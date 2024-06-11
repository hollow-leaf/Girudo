import { member } from "../../type";
import { Member } from "./Member";

export function DaoMember(props:{members: member[]}) {

    return (
        <div className="flex rounded-b-lg w-full flex-wrap glass2 p-4 md:p-8" >
            {props.members.map((member) => {
                return <Member member={member}/>
            })}
        </div>
    )
}