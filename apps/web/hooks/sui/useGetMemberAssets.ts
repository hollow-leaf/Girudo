import { memberAssetByAddress } from "@/lib/sui/operation";
import { ObjectBag } from "@/lib/sui/utils";
import { useCurrentAccount, useSuiClient } from "@mysten/dapp-kit";
import { bcs } from "@mysten/sui/bcs";
import { Transaction } from "@mysten/sui/transactions";
import { useQuery } from "@tanstack/react-query";

export function useGetMemberAsset(member: string) {
  const client = useSuiClient();
  const account = useCurrentAccount();

  return useQuery({
    queryKey: ["asset", account?.address],
    queryFn: async () => {
      if (!account) {
        throw new Error("Fail to connect to wallet");
      }
      const tx = new Transaction();

      memberAssetByAddress(tx, member);

      const res = await client.devInspectTransactionBlock({
        transactionBlock: tx as any,
        sender: account.address,
      });

      const objectBagId = res.results?.[0]?.returnValues?.[0]?.[0] ?? [];

      if (!objectBagId.length) throw new Error("Not registered member");

      const member_ob = ObjectBag.parse(
        Uint8Array.from(objectBagId as Iterable<number>),
      );
      const all_object_ids = await client.getDynamicFields({
        parentId: member_ob.id,
      });
      console.log("all_object_ids", all_object_ids);
    },
    enabled: !!account?.address,
  });
}
