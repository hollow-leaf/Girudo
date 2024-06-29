"use client";

import { POAP } from "@/components/card/Poap";
import { Button } from "@/components/ui/button";
import { useAddMember } from "@/hooks/sui/useAddMember";
import { useGetMemberAsset } from "@/hooks/sui/useGetMemberAssets";
import { useGetTokenizedAsset } from "@/hooks/sui/useGetTokenizedAsset";
import { useTokenizedAssetMint } from "@/hooks/sui/useTokenizedAssetMint";
import { useMemo } from "react";

export default function SuiPage() {
  // getOwnedObjct
  const { data: fungibleAssets, isLoading } = useGetTokenizedAsset(
    "PSYDUCK",
    "FT",
  );
  const { data: poap } = useGetTokenizedAsset("PSYDUCK", "NFT");

  const points = useMemo(
    () =>
      fungibleAssets?.reduce(
        (res, asset) => (res += Number(asset.balance)),
        0,
      ) ?? 0,
    [fungibleAssets],
  );

  const metaBody = {
    name: "PsyDuck",
    image_url:
      "https://ipfs.io/ipfs/QmRky6vJUzHzyMULF6aaEbCubi6tNbi65czo4MDC3fCMag",
    Description:
      "Psyduck is a yellow Pokémon resembling a duck or a bipedal platypus",
    host: "Solo",
    start: "1719540474499", //ms
    end: "1719626874499", //ms
  };

  // ERC1155
  const { mutateAsync: mintTokenizedAssetMutate, isPending: isTxLoading } =
    useTokenizedAssetMint();
  const handleMintCoin = async () => {
    await mintTokenizedAssetMutate({
      guild: "PSYDUCK",
      metadata: {},
      value: 100n,
      recipient:
        "0x0b3fc768f8bb3c772321e3e7781cac4a45585b4bc64043686beb634d65341798",
    });
  };

  const handleMintEvent = async () => {
    await mintTokenizedAssetMutate({
      guild: "PSYDUCK",
      metadata: metaBody,
      value: 1n,
      recipient:
        "0x0b3fc768f8bb3c772321e3e7781cac4a45585b4bc64043686beb634d65341798",
    });
  };

  // Member
  const { mutateAsync: addMemberMutate } = useAddMember();
  const handleAddMember = async () => {
    await addMemberMutate(
      "0x0b3fc768f8bb3c772321e3e7781cac4a45585b4bc64043686beb634d65341798",
    );
  };

  const { data } = useGetMemberAsset(
    "0x0b3fc768f8bb3c772321e3e7781cac4a45585b4bc64043686beb634d65341798",
  );
  console.log("data", data);
  return (
    <div className="w-full grid grid-cols-3 gap-2">
      <Button onClick={handleAddMember} className="px-3 py-2 w-fit">
        Add Member
      </Button>
      <div className="border flex flex-col items-center justify-center">
        <Button
          onClick={handleMintCoin}
          disabled={isTxLoading}
          className="w-20"
        >
          Mint Point
        </Button>
        <h3>
          owned points: <span>{points}</span>
        </h3>
      </div>
      <div className="border flex flex-col items-center justify-center">
        <Button className="w-20" onClick={handleMintEvent}>
          Mint Event
        </Button>
        <h3>owned events</h3>
        <div className="flex flex-wrap gap-2">
          <POAP
            image_url={"/task0.png"}
            name={"PsyDuck"}
            start={new Date(1719540474499).toString()}
            end={new Date(1719540474499).toString()}
          />
        </div>
      </div>
    </div>
  );
}
