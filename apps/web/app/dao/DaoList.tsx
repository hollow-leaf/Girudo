import { DaoCard } from "./DaoCard";

export function DaoList() {
    return (
        <div className="flex flex-nowrap overflow-x-auto md:inline max-h-screen overflow-auto rounded-lg p-4 text-black z-10">
            <DaoCard />
            <DaoCard />
            <DaoCard />
            <DaoCard />
            <DaoCard />
            <DaoCard />
            <DaoCard />
            <DaoCard />
            <DaoCard />
            <DaoCard />
        </div>
    )
}