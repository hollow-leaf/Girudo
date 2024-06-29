import { useEffect, useState } from "react";
import { DaoCard } from "./DaoCard";
import { DaoCreator } from "./DaoCreator";
import { DAO } from "../type";

export function DaoList(props: {daos: DAO[], daoSelector: any}) {

    return (
        <div className="flex flex-nowrap overflow-x-auto md:inline max-h-screen overflow-auto rounded-lg p-4 mx-8 text-black z-10">
            <DaoCreator />
            {
                props.daos.map((dao) => {
                    return <DaoCard key={dao.dao_id} dao={dao} daoSelector={props.daoSelector}/>
                })
            }
        </div>
    )
}