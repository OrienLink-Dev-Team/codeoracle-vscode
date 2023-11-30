"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeOracleCompletionProvider = void 0;
const vscode = __importStar(require("vscode"));
const vscode_1 = require("vscode");
const RequestCompletion_1 = require("./RequestCompletion");
const Utils_1 = require("./Utils");
class CodeOracleCompletionProvider {
    statusBar;
    constructor(statusBar) {
        this.statusBar = statusBar;
    }
    async provideInlineCompletionItems(document, position, context, token) {
        let autoTriggerEnabled = vscode_1.workspace.getConfiguration("codeoracle").get("AutoTriggerCompletion");
        // Check if the completion is triggered automatically
        if (context.triggerKind === vscode_1.InlineCompletionTriggerKind.Automatic) {
            // Check if auto-trigger is enabled in the settings
            if (!autoTriggerEnabled) {
                return [];
            }
            let delay = vscode_1.workspace.getConfiguration("codeoracle").get("AutoCompletionDelay");
            await (0, Utils_1.sleep)(1000 * delay);
            // Check if the operation was cancelled
            if (token.isCancellationRequested) {
                return [];
            }
        }
        // Get the prefix and suffix code for completion
        const fimPrefixCode = this.getFimPrefixCode(document, position);
        const fimSuffixCode = this.getFimSuffixCode(document, position);
        let code = '';
        code = fimPrefixCode + fimSuffixCode;
        let type = '';
        if (code.trim().endsWith('//') || code.trim().endsWith('#')) {
            type = 'comment';
        }
        else {
            type = 'code';
        }
        if (this.isNil(fimPrefixCode)) {
            return [];
        }
        // Update the statusBar
        this.statusBar.text = "$(loading~spin)";
        this.statusBar.tooltip = "CodeOracle - Working";
        // Request
        return (0, RequestCompletion_1.postCompletion)(fimPrefixCode, type).then((response) => {
            console.log("response", response);
            this.statusBar.text = "$(light-bulb)";
            this.statusBar.tooltip = `CodeOracle - Ready`;
            // if (token.isCancellationRequested || !response || this.isNil(response.completedCode.trim())) {
            // 	return [];
            // }
            if (!response.isCompleted) {
                return [];
            }
            return [new vscode_1.InlineCompletionItem(response.completedCode, new vscode_1.Range(position, position))];
        }).catch((error) => {
            console.error(error);
            this.statusBar.text = "$(alert)";
            this.statusBar.tooltip = "CodeOracle - Error";
            vscode.window.setStatusBarMessage(`${error}`, 10000);
            return [];
        });
    }
    getFimPrefixCode(document, position) {
        const firstLine = Math.max(position.line - 10, 0);
        const range = new vscode_1.Range(firstLine, 0, position.line, position.character);
        return document.getText(range).trim();
    }
    getFimSuffixCode(document, position) {
        const startLine = position.line + 1;
        const endLine = Math.min(startLine + 10, document.lineCount);
        const range = new vscode_1.Range(position.line, position.character, endLine, 0);
        return document.getText(range).trim();
    }
    isNil(value) {
        return value === undefined || value === null || value.length === 0;
    }
}
exports.CodeOracleCompletionProvider = CodeOracleCompletionProvider;
//# sourceMappingURL=CodeOracleCompletionProvider.js.map