import { Nft } from "./Nft";
import { NftSelector } from "./NftSelector";

export function NftTable() {
    return (
        <div className="w-full glass2">
            <div className="flex items-center justify-end px-2 md:px-4 pt-4">
                <NftSelector />
            </div>
            <div className="flex flex-wrap justify-between px-2 md:p-4">
                <Nft />
                <Nft />
                <Nft />
                <Nft />
                <Nft />
                <Nft />
                <Nft />
                <Nft />
                <Nft />
                <Nft />
                <Nft />
                <Nft />
            </div>
        </div>
    )
}