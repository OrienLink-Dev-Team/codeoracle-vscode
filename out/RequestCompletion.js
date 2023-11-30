"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postCompletion = void 0;
const axios_1 = __importDefault(require("axios"));
const vscode_1 = require("vscode");
async function postCompletion(fimPrefixCode, type) {
    const serverAddress = "http://localhost:8899/codeinterpreter"; // 修改为你的请求地址
    let maxtokens = vscode_1.workspace.getConfiguration("codeoracle").get("CompletionMaxTokens");
    const jsonData = {
        type: type,
        code: fimPrefixCode
    };
    console.debug("request.data:", jsonData);
    try {
        const response = await axios_1.default.post(serverAddress, jsonData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.data.type === "code") {
            const completedCode = response.data.result[0].generation;
            return {
                completedCode: completedCode,
                isCompleted: true
            };
        }
        else {
            console.error('Received error response:', response.data.error);
            return {
                completedCode: "",
                isCompleted: false
            };
        }
    }
    catch (error) {
        console.error('Error:', error);
        return {
            completedCode: "",
            isCompleted: false
        };
    }
}
exports.postCompletion = postCompletion;
const axiosInstance = axios_1.default.create({
    timeout: 60000,
    timeoutErrorMessage: "请求超时"
});
//# sourceMappingURL=RequestCompletion.js.map