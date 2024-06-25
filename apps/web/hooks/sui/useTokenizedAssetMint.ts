import {
  GUILDS_ASSET_CAP,
  GUILDS_TYPE_LIST,
} from "@/constants/sui/tokenized_asset";
import { tokenizedAssetMint } from "@/lib/sui/operation";
import { GUILD } from "@/type";
import {
  useCurrentAccount,
  useSignAndExecuteTransaction,
  useSuiClient,
} from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

interface TokenizedAssetMintArgs {
  guild: GUILD;
  metadata: { [key: string]: string };
  value: bigint;
}
export const useTokenizedAssetMint = () => {
  const client = useSuiClient();
  const account = useCurrentAccount();
  const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction();

  return useMutation({
    mutationFn: async ({ guild, metadata, value }: TokenizedAssetMintArgs) => {
      if (!account) {
        throw new Error("Fail to connect to wallet");
      }

      const type = GUILDS_TYPE_LIST[guild];
      const assetCap = GUILDS_ASSET_CAP[guild];

      const tx = new Transaction();
      const tokenizedAsset = tokenizedAssetMint(
        tx,
        type,
        assetCap,
        metadata,
        value,
      );

      tx.transferObjects([tokenizedAsset], account.address);
    },
    onSuccess: () => {
      console.log("success");
      toast.success("success");
    },
    onError: (err: Error) => {
      console.error("error", err), toast.error("error");
    },
  });
};
