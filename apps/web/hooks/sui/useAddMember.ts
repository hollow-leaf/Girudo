import { addMember } from "@/lib/sui/operation";
import {
  useCurrentAccount,
  useSignAndExecuteTransaction,
  useSuiClient,
} from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useAddMember = () => {
  const client = useSuiClient();
  const account = useCurrentAccount();
  const { mutateAsync: signAndExecuteTransaction } =
    useSignAndExecuteTransaction();

  return useMutation({
    mutationFn: async (member: string) => {
      if (!account) {
        throw new Error("Fail to connect to wallet");
      }
      const tx = new Transaction();

      addMember(tx, member);

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
    onSuccess: () => {
      toast.success(`success tx. Sender: ${account!.address}`);
    },
    onError: (err: Error) => {
      toast.error("error");
    },
  });
};
