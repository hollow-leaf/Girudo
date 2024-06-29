import { useState } from "react"

export function TaskPoapSelector(props: {isPoap: any, setIsPoap: any, setPoapChain: any}) {

    return (
        <div className="my-2">
            <div className="flex items-center mb-1">
                <input onChange={() => {props.setIsPoap(!props.isPoap)}} id="default-checkbox" type="checkbox" value="" className="w-4 h-4 bg-cBlue text-cBlue bg-gray-100 border-cBlue rounded focus:ring-cBlue focus:ring-2" />
                <label className="ms-2 text-md font-medium text-cBlue">POAP Award</label>
            </div>
            {props.isPoap &&
            <form className="max-w-sm mx-auto">
            <select onChange={(e) => {props.setPoapChain(e.target.value)}} defaultValue={""} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option value="">Choose a blockchain</option>
              <option value="Ethereum">Ethereum</option>
              <option value="Solana">Solana</option>
              <option value="Sui">Sui</option>
            </select>
          </form>
            }
        </div>
    )
}