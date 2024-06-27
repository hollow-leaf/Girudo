"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadTasks = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const loadTasks = (taskFolders) => taskFolders.forEach((folder) => {
    const tasksPath = path_1.default.join(__dirname, '../', folder);
    fs_1.default.readdirSync(tasksPath)
        .filter((pth) => pth.includes('.ts') || pth.includes('.js'))
        .forEach((task) => {
        require(`${tasksPath}/${task}`);
    });
});
exports.loadTasks = loadTasks;
