"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("hardhat/config");
const pathHelper_1 = require("../helpers/pathHelper");
(0, config_1.task)("deploy:contract", "Deploy contract")
    .addParam("contract")
    .setAction(async ({ contract }, hre) => {
    await hre.run("compile");
    const [signer] = await hre.viem.getWalletClients();
    const deployContract = await hre.viem.deployContract(contract, []);
    console.log(`TestToken.sol deployed to ${deployContract.address}`);
    const address = {
        main: deployContract.address,
    };
    const addressData = JSON.stringify(address);
    (0, pathHelper_1.writeFileSync)(`scripts/address/${hre.network.name}/`, "mainContract.json", addressData);
    await deployContract.deployed();
});
(0, config_1.task)("deploy:token", "Deploy contract")
    .addFlag("verify", "Validate contract after deploy")
    .setAction(async ({ verify }, hre) => {
    await hre.run("compile");
    console.log("compiling...");
    const [signer] = await hre.viem.getWalletClients();
    console.log(signer.account.address);
    const deployContract = await hre.viem.deployContract("TestToken", [signer.account.address]);
    console.log(`TestToken.sol deployed to ${deployContract.address}`);
    const address = {
        main: deployContract.address,
    };
    const addressData = JSON.stringify(address);
    (0, pathHelper_1.writeFileSync)(`scripts/address/${hre.network.name}/`, "TestToken.json", addressData);
    if (verify) {
        console.log("verifying contract...");
        await deployContract.deployTransaction.wait(3);
        try {
            await hre.run("verify:verify", {
                address: deployContract.address,
                constructorArguments: [signer.account.address],
                contract: "contracts/TestToken.sol:TestToken",
            });
        }
        catch (e) {
            console.log(e);
        }
    }
});
