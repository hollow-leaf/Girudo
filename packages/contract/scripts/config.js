"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadContract = loadContract;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function loadContract(chain, contractName, abiLocate) {
    const locate = abiLocate ? `${abiLocate}/` : "/";
    const abiPath = path_1.default.resolve(__dirname, `../artifacts/contracts/${locate}${contractName}.sol/${contractName}.json`);
    const addressPath = path_1.default.resolve(__dirname, `../scripts/address/${chain}/${contractName}.json`);
    const abi = JSON.parse(fs_1.default.readFileSync(abiPath, "utf8"));
    const address = JSON.parse(fs_1.default.readFileSync(addressPath, "utf8"));
    return { abi, address };
}
