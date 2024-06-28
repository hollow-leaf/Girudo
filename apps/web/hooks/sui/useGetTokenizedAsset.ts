import Page from "@/app/page";
import {
  GUILDS_TYPE_LIST,
  TOKENIZED_ASSET_TYPE,
} from "@/constants/sui/tokenized_asset";
import { extractGenericType } from "@/lib/sui/format";
import { GUILD } from "@/type";
import { useCurrentAccount, useSuiClient } from "@mysten/dapp-kit";
import { useQuery } from "@tanstack/react-query";
import { memo, useMemo } from "react";

type Asset = "FT" | "NFT";

interface TokenizedAsset {
  asset: Asset;
  guild: string;
  metadata: { [key: string]: string };
  balance: bigint;
}

export function useGetTokenizedAsset(guild: GUILD, type: Asset) {
  const client = useSuiClient();
  const account = useCurrentAccount();

  const { data: tokenizedAssets, isPending } = useQuery({
    queryKey: ["getOwnedTokenizedAsset", account?.address],
    queryFn: async () => {
      const objs = await client.getOwnedObjects({
        owner: account!.address,
        filter: {
          StructType: TOKENIZED_ASSET_TYPE,
        },
      });

      if (objs.data.length > 0) {
        const tokenizedAssetObjs = await Promise.all(
          objs.data.map((objData) =>
            client.getObject({
              id: objData.data?.objectId as string,
              options: { showContent: true },
            }),
          ),
        );
        return tokenizedAssetObjs.map((resp) => {
          const content = resp?.data?.content as any;
          if (!content)
            throw new Error(
              "No content field. Please set`showContent` to true in options",
            );
          const fields = content.fields;
          const metadata = fields.metadata.fields.contents;
          const fungible = !metadata.length;

          return {
            asset: fungible ? "FT" : "NFT",
            guild: extractGenericType(content.type, 1),
            metadata: fungible
              ? null
              : metadata.reduce(
                  (obj: any, data: any) => ({
                    ...obj,
                    [data.fields.key]: data.fields.value,
                  }),
                  {},
                ),
            balance: BigInt(fields.balance),
          } as TokenizedAsset;
        });
      } else {
        return [];
      }
    },
    enabled: !!account?.address,
  });

  return useMemo(() => {
    if (!tokenizedAssets)
      return {
        isLoading: isPending,
        data: null,
      };
    return {
      isLoading: false,
      data: tokenizedAssets.filter(
        (asset) =>
          asset.asset === type && asset.guild === GUILDS_TYPE_LIST[guild],
      ),
    };
  }, [tokenizedAssets, guild, type]);
}
