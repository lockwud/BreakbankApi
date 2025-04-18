"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_route_1 = __importDefault(require("./auth.route"));
const fileupload_route_1 = __importDefault(require("./fileupload.route"));
const webRouter = (0, express_1.Router)();
webRouter.use("/auth", auth_route_1.default);
webRouter.use("/question", fileupload_route_1.default);
exports.default = webRouter;
