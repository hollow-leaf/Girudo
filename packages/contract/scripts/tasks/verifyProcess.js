"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const config_1 = require("hardhat/config");
(0, config_1.task)("verify:contract", "Verify deployed contract")
    .addParam("file")
    .addParam("contract")
    .setAction(async ({ file, contract }, hre) => {
    try {
        const contractAddress = fs_1.default.readFileSync(`scripts/address/${hre.network.name}/mainContract.json`);
        const addressData = JSON.parse(contractAddress.toString());
        await hre.run("verify:verify", {
            address: addressData.main,
            constructorArguments: [],
            contract: `contracts/${file}.sol:${contract}`,
        });
    }
    catch (e) {
        console.log(e);
    }
});
