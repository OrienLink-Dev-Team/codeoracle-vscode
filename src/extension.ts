import * as vscode from 'vscode';
import { CodeOracleCompletionProvider } from "./CodeOracleCompletionProvider";

export function activate(context: vscode.ExtensionContext) {
    // Create a status bar item
    const statusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
    statusBar.text = "$(lightbulb)";
    statusBar.tooltip = `CodeOracle - Ready`;

    // Define the callback function for completion status
    const completionStatusCallback = (enabled: boolean) => async () => {
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
        vscode.languages.registerInlineCompletionItemProvider(
            { pattern: "**" }, new CodeOracleCompletionProvider(statusBar)
        ),
        vscode.commands.registerCommand("codeoracle.auto_completion_enable", completionStatusCallback(true)),
        vscode.commands.registerCommand("codeoracle.auto_completion_disable", completionStatusCallback(false)),
        statusBar
    );

    // Check the auto completion setting and execute the corresponding command
    if (vscode.workspace.getConfiguration("codeoracle").get("AutoTriggerCompletion")) {
        vscode.commands.executeCommand("codeoracle.auto_completion_enable");
    } else {
        vscode.commands.executeCommand("codeoracle.auto_completion_disable");
    }
}