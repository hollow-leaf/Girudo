import React from 'react';
import { Nft } from "./DaoNft";
import { NftSelector } from "./DaoNftSelector";

export function DaoNftTable() {
    return (
        <div className="w-full glass2 rounded-b-lg">
            <div className="flex items-center md:justify-end px-2 md:px-4 pt-4">
                <NftSelector />
            </div>
            <div className="flex flex-wrap justify-around px-2 md:p-4">
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