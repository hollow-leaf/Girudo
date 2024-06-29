import { useState } from "react"

export function TaskPointSelecetor(props: {isPoint: any, setIsPoint: any, point: any, setPoint: any}) {

    return (
        <div className="my-2">
            <div className="flex items-center mb-1">
                <input onChange={() => {props.setIsPoint(!props.isPoint)}} id="default-checkbox" type="checkbox" value="" className="w-4 h-4 bg-cBlue text-cBlue bg-gray-100 border-cBlue rounded focus:ring-cBlue focus:ring-2" />
                <label className="ms-2 text-md font-medium text-cBlue">Ponit Award</label>
            </div>
            {props.isPoint &&
            <form className="max-w-sm mx-auto">
                <input value={props.point} onChange={(e) => {props.setPoint(Number(e.target.value))}} type="number" id="number-input" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-cBlue/50 text-cBlue text-sm rounded-lg focus:outline-none block w-full p-2.5" placeholder="0" />
            </form>
            }
        </div>
    )
}