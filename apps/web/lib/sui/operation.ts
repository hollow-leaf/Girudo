import {
  Transaction,
  TransactionObjectArgument,
  TransactionResult,
} from "@mysten/sui/transactions";
import { OWNED_OBJECTS, SHARED_OBJECT_REFS, TARGETS } from "./config";
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

// --- Member ---
export function addMember(tx: Transaction, member: string) {
  tx.moveCall({
    target: TARGETS.member.add_member_and_transfer,
    arguments: [
      tx.sharedObjectRef(SHARED_OBJECT_REFS.member.MemberReg),
      tx.object(OWNED_OBJECTS.member.AdminCap),
      tx.pure.address(member),
    ],
  });
}

export function memberAssetByAddress(tx: Transaction, member: string) {
  return tx.moveCall({
    target: TARGETS.member.member_asset_by_address,
    arguments: [
      tx.sharedObjectRef(SHARED_OBJECT_REFS.member.MemberReg),
      tx.pure.address(member),
    ],
  });
}
