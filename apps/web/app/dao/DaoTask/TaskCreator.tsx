import Image from 'next/image'
import { useState } from "react"
import { ModalL } from "../../components/Modal/ModalL"
import { DayPicker } from "react-day-picker";
import { DatePickerSection } from '../../components/Modal/DatePicker';

export function TaskCreator() {
    const [showBow, setShowBox] = useState<boolean>(false)
    const [dateSelectedStart, setDateSelectedStart] = useState<Date>()
    const [dateSelectedEnd, setDateSelectedEnd] = useState<Date>()

    return (
        <div>
            <button onClick={()=>{setShowBox(true)}} className="mb-2 text-white bg-cBlue focus:ring-4 focus:outline-none focus:ring-white/40 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center">Create Task</button>
            <ModalL showBox={showBow} closed={()=>{setShowBox(false)}}>
                <div className="md:flex pb-8 px-3 md:px-8">
                    <Image
                    className='my-1 mx-1 glass shadow rounded-2xl h-[300px] w-[300px]'
                    src="/girudo.png"
                    width={300}
                    height={300}
                    alt="Picture of the author"
                    />
                    <div className="p-4">
                        <input placeholder="Task Name" className="w-full text-4xl border-b-2 border-cBlue/50 text-black bg-white/0 focus:outline-none"></input>
                        <DatePickerSection selectedStart={dateSelectedStart} onSelectStart={setDateSelectedStart} onSelectEnd={setDateSelectedEnd} selectedEnd={dateSelectedEnd}/>
                        <textarea rows={4} className="text-cBlue bg-white/0 block w-full my-2 border-0 border-b-2 border-cBlue/50 focus:outline-0 focus:ring-0 focus:border-cBlue/50" placeholder="Write the event description here..."></textarea>
                        <div className="text-cBlue text-lg font-medium">Option</div>
                    </div>
                    
                </div>
                <div className="md:flex pb-8 px-3 md:px-8 justify-end">
                    <button className="bg-cBlue p-3 rounded-md">Create</button>
                </div>
            </ModalL>
        </div>
    )
}