"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setIO = setIO;
exports.getIO = getIO;
let io;
function setIO(ioInstance) {
    io = ioInstance;
}
function getIO() {
    if (!io) {
        throw new Error("Socket.io not initialized!");
    }
    return io;
}
