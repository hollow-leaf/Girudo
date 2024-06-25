import {
  Transaction,
  TransactionObjectArgument,
  TransactionResult,
} from "@mysten/sui/transactions";
import { TARGETS } from "./config";
import { bcs } from "@mysten/sui/bcs";

export function tokenizedAssetMint(
  tx: Transaction,
  assetType: string,
  assetCap: string,
  metadata: { [key: string]: string },
  value: bigint,
): TransactionObjectArgument {
  const [tokenizedAsset] = tx.moveCall({
    target: TARGETS.tokenizedAsset.mint,
    typeArguments: [assetType],
    arguments: [
      tx.object(assetCap),
      tx.pure(bcs.vector(bcs.string()).serialize(Object.keys(metadata))),
      tx.pure(bcs.vector(bcs.string()).serialize(Object.values(metadata))),
      tx.pure(
        bcs.u64().serialize(Object.keys(metadata).length !== 0 ? 1 : value),
      ),
    ],
  });

  if (!tokenizedAsset) throw new Error("fail to acquire minted tokenizedAsset");

  return tokenizedAsset;
}
