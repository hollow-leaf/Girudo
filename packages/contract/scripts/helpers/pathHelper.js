"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readFileSync = exports.writeFileSync = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const writeFileSync = (dirPath, fileName, data) => {
    fs_1.default.mkdirSync(dirPath, { recursive: true });
    fs_1.default.writeFileSync(path_1.default.join(dirPath, fileName), data, 'utf8');
};
exports.writeFileSync = writeFileSync;
const readFileSync = (dirPath, fileName) => {
    return fs_1.default.readFileSync(path_1.default.join(dirPath, fileName), 'utf8');
};
exports.readFileSync = readFileSync;
