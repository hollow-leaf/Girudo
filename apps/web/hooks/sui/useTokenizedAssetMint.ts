import { queryClient } from "@/components/providers/Provider";
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
  recipient: string;
}
export const useTokenizedAssetMint = () => {
  const client = useSuiClient();
  const account = useCurrentAccount();
  const { mutateAsync: signAndExecuteTransaction } =
    useSignAndExecuteTransaction();
  // {
  //   execute: async ({ bytes, signature }) =>
  //     await client.executeTransactionBlock({
  //       transactionBlock: bytes,
  //       signature,
  //       options: {
  //         // Raw effects are required so the effects can be reported back to the wallet
  //         showRawEffects: true,
  //         // Select additional data to return
  //         showObjectChanges: true,
  //       },
  //     }),
  // }

  return useMutation({
    mutationFn: async ({
      guild,
      metadata,
      value,
      recipient,
    }: TokenizedAssetMintArgs) => {
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

      tx.transferObjects([tokenizedAsset], recipient);

      // const res = await client.devInspectTransactionBlock({
      //   transactionBlock: tx as any,
      //   sender: account.address,
      // });

      await signAndExecuteTransaction(
        {
          transaction: tx as any,
          chain: "sui:testnet",
        },
        {
          onSuccess: (result) => {
            return result.digest;
          },
        },
      );
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["getOwnedTokenizedAsset", account!.address],
      });
      toast.success(`success tx. Sender: ${account!.address}`);
    },
    onError: (err: Error) => {
      console.error("error", err), toast.error("error");
    },
  });
};
