"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// hardhat plugin
require("@nomicfoundation/hardhat-toolbox-viem");
const dotenv_1 = require("dotenv");
const path_1 = require("path");
const hardhatConfigHelpers_1 = require("./scripts/helpers/hardhatConfigHelpers");
(0, dotenv_1.config)({ path: (0, path_1.resolve)(__dirname, "./.env") });
const taskFolder = ["tasks"];
(0, hardhatConfigHelpers_1.loadTasks)(taskFolder);
const chainIds = {
    ganache: 1337,
    goerli: 5,
    sepolia: 11155111,
    hardhat: 31337,
    mainnet: 1
};
// Ensure that we have all the environment variables we need.
const pk = process.env.PRIVATE_KEY;
if (!pk) {
    throw new Error("Please set your pk in a .env file");
}
const infuraApiKey = process.env.INFURA_API_KEY;
if (!infuraApiKey) {
    throw new Error("Please set your INFURA_API_KEY in a .env file");
}
function getChainConfig(chain) {
    let jsonRpcUrl;
    switch (chain) {
        case "sepolia":
            jsonRpcUrl = "https://rpc.sepolia.org";
            break;
        default:
            jsonRpcUrl = `https://${chain}.infura.io/v3/${infuraApiKey}`;
    }
    return {
        accounts: [`0x${pk}`],
        chainId: chainIds[chain],
        url: jsonRpcUrl,
    };
}
const config = {
    defaultNetwork: "hardhat",
    networks: {
        hardhat: {
            chainId: chainIds.hardhat,
        },
        local: {
            url: "http://127.0.0.1:8545",
        },
        goerli: getChainConfig("goerli"),
        sepolia: getChainConfig("sepolia"),
        mainnet: getChainConfig("mainnet"),
    },
    paths: {
        artifacts: "./artifacts",
        cache: "./cache",
        sources: "./contracts",
        tests: "./test",
    },
    solidity: {
        compilers: [
            {
                version: "0.8.22",
            },
            {
                version: "0.8.20",
            },
        ],
        settings: {
            metadata: {
                // Not including the metadata hash
                // https://github.com/paulrberg/hardhat-template/issues/31
                bytecodeHash: "none",
            },
            // Disable the optimizer when debugging
            // https://hardhat.org/hardhat-network/#solidity-optimizer-support
            optimizer: {
                enabled: true,
                runs: 200,
                details: {
                    yulDetails: false,
                },
            },
        },
    },
    etherscan: {
        apiKey: {
            goerli: process.env.ETHERSCAN_API_KEY || "",
            sepolia: process.env.ETHERSCAN_API_KEY || "",
            mainnet: process.env.ETHERSCAN_API_KEY || "",
            cardona: process.env.POLYGONSCAN_API_KEY || "",
            baseSepolia: process.env.BASESCAN_API_KEY || "",
        },
        customChains: []
    },
    gasReporter: {
        currency: "USD",
        gasPrice: 100,
        enabled: process.env.REPORT_GAS === "true",
        excludeContracts: [],
        src: "./contracts",
    },
    typechain: {
        outDir: "typechain",
        target: "ethers-v5",
    },
};
exports.default = config;
