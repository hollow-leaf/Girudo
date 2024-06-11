import { useEffect, useState } from "react"

export function NftSelector() {

    const [closed, setClosed] = useState<Boolean>(true)
    const [selected, setSelected] = useState<string>("All")

    function toggle() {
        setClosed(!closed)
    }



    return (
        <div>
            <div className="flex md:justify-end w-44">
                <button onClick={toggle} className="mb-2 text-white bg-cBlue focus:ring-4 focus:outline-none focus:ring-white/40 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center" type="button">{selected}
                <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                </svg>
                </button>
            </div>
            {!closed&&
            <div id="dropdown" className="glass4 absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                    <li>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
                    </li>
                    <li>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
                    </li>
                    <li>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
                    </li>
                    <li>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</a>
                    </li>
                </ul>
            </div>}
        </div>
    )
}