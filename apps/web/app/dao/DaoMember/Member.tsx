import Image from 'next/image'
import { member } from "../../type";

export function Member(props: {member: member}) {
    return (
        <div>
            <div className="m-2 md:m-4">
                <Image
                className='max-w-[90px] max-h-[90px] md:max-w-[140px] md:max-h-[140px] rounded-full'
                src={props.member.avatar}
                width={140}
                height={140}
                alt="Picture of the author"
                />
            </div>
            <div className="text-center text-black text-lg md:text-2xl">{props.member.username}</div>
            <div className="text-center text-black/60 text-sm md:text-lg">{props.member.role}</div>
        </div>
    )
}