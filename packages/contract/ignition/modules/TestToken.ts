import { buildModule} from "@nomicfoundation/hardhat-ignition/modules"

export default buildModule("TestToken", (m) => {
  const token = m.contract("TestToken", ["TestToken", "TT", 18])

  return { token }
})