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
exports.activate = void 0;
const vscode = __importStar(require("vscode"));
const CodeOracleCompletionProvider_1 = require("./CodeOracleCompletionProvider");
function activate(context) {
    // Create a status bar item
    const statusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
    statusBar.text = "$(lightbulb)";
    statusBar.tooltip = `CodeOracle - Ready`;
    // Define the callback function for completion status
    const completionStatusCallback = (enabled) => async () => {
        const configuration = vscode.workspace.getConfiguration();
        const target = vscode.ConfigurationTarget.Global;
        // Update the configuration setting for auto completion
        configuration.update("codeoracle.AutoTriggerCompletion", enabled, target, false).then(console.error);
        var msg = enabled ? "启动成功" : "禁用成功";
        vscode.window.showInformationMessage(msg);
        statusBar.show();
    };
    context.subscriptions.push(
    // Register the inline completion item provider
    vscode.languages.registerInlineCompletionItemProvider({ pattern: "**" }, new CodeOracleCompletionProvider_1.CodeOracleCompletionProvider(statusBar)), vscode.commands.registerCommand("codeoracle.auto_completion_enable", completionStatusCallback(true)), vscode.commands.registerCommand("codeoracle.auto_completion_disable", completionStatusCallback(false)), statusBar);
    // Check the auto completion setting and execute the corresponding command
    if (vscode.workspace.getConfiguration("codeoracle").get("AutoTriggerCompletion")) {
        vscode.commands.executeCommand("codeoracle.auto_completion_enable");
    }
    else {
        vscode.commands.executeCommand("codeoracle.auto_completion_disable");
    }
}
exports.activate = activate;
//# sourceMappingURL=extension.js.map