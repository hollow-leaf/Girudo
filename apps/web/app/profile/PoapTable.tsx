import React from 'react';
import { Nft } from "../../components/Nft/Nft";
import { NftSelector } from "../../components/Nft/NftSelector";

export function NftTable() {
    return (
        <div className="w-full glass2">
            <div className="flex items-center justify-end px-2 lg:px-4 pt-4">
                <NftSelector />
            </div>
            <div className="flex flex-wrap justify-between px-2 lg:p-4">
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