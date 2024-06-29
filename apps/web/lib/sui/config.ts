export const TARGETS = {
  tokenizedAsset: {
    mint: "0xa8fe0d9f91e4f63df6bd4816278fb02589a763ec9410ecdde0d1128538825a1d::tokenized_asset::mint",
  },
  member: {
    add_member_and_transfer:
      "0x9cf704141302afffd6bd75c4f2421b2ff23acc13964ec756ac2a5eed8d9dbafe::member::add_member_and_transfer",
    member_asset_by_address:
      "0x9cf704141302afffd6bd75c4f2421b2ff23acc13964ec756ac2a5eed8d9dbafe::member::member_asset_by_address",
  },
};

export const SHARED_OBJECT_REFS = {
  member: {
    MemberReg: {
      objectId:
        "0x95a0478491bee9b58e5953083a2357b54e64a271eb5d1910f38bccfe81f994fb",
      initialSharedVersion: 29116305,
      mutable: true,
    },
  },
};

export const OWNED_OBJECTS = {
  member: {
    AdminCap:
      "0x14a6d4cd7eca52019068fb0a2eed66367272c6ebfa7d4f68b832285a017c0d62",
  },
};
