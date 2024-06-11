import { task } from "hardhat/config"
import { readFileSync, writeFileSync } from "../helpers/pathHelper"

task("deploy:contract", "Deploy contract")
  .addParam("contract")
  .setAction(async ({ contract }, hre) => {
    await hre.run("compile")
    const [signer]: any = await hre.viem.getWalletClients()
    const deployContract: any = await hre.viem.deployContract(contract, [])
    console.log(`TestToken.sol deployed to ${deployContract.address}`)

    const address = {
      main: deployContract.address,
    }
    const addressData = JSON.stringify(address)
    writeFileSync(`scripts/address/${hre.network.name}/`, "mainContract.json", addressData)

    await deployContract.deployed()
  },
  )

task("deploy:token", "Deploy contract")
  .addFlag("verify", "Validate contract after deploy")
  .setAction(async ({ verify }, hre) => {
    await hre.run("compile")
    console.log("compiling...")
    const [signer]: any = await hre.viem.getWalletClients()
    console.log(signer.account.address)
    const deployContract: any = await hre.viem.deployContract("TestToken", [signer.account.address])
    console.log(`TestToken.sol deployed to ${deployContract.address}`)
    const address = {
      main: deployContract.address,
    }
    const addressData = JSON.stringify(address)
    writeFileSync(`scripts/address/${hre.network.name}/`, "TestToken.json", addressData)

    if (verify) {
      console.log("verifying contract...")
      await deployContract.deployTransaction.wait(3)
      try {
        await hre.run("verify:verify", {
          address: deployContract.address,
          constructorArguments: [signer.account.address],
          contract: "contracts/TestToken.sol:TestToken",
        })
      } catch (e) {
        console.log(e)
      }
    }
  },
  )
