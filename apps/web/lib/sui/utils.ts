import { bcs } from "@mysten/sui/bcs";

export const ObjectBag = bcs.struct(
  "0x861708cfbf117a6bfabd1705aa53129536f05390d8829b1cd7db4dd05ae62f01::member::MemberReg",
  {
    id: bcs.Address,
    value: bcs.u64(),
  },
);
