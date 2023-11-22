import * as vscode from 'vscode';
import { CodeoRacleCompletionProvider } from "./CodeOracleCompletionProvider";

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
        configuration.update("CodeOracle.AutoTriggerCompletion", enabled, target, false).then(console.error);
        var msg = enabled ? "Auto completion enabled" : "Auto completion disabled";
        vscode.window.showInformationMessage(msg);
        statusBar.show();
    };

    context.subscriptions.push(
        // Register the inline completion item provider
        vscode.languages.registerInlineCompletionItemProvider(
            { pattern: "**" }, new CodeoRacleCompletionProvider(statusBar)
        ),
        vscode.commands.registerCommand("codeoracle.auto_completion_enable", completionStatusCallback(true)),
        vscode.commands.registerCommand("codeoracle.auto_completion_disable", completionStatusCallback(false)),
        statusBar
    );

    // Check the auto completion setting and execute the corresponding command
    if (vscode.workspace.getConfiguration("CodeOracle").get("AutoTriggerCompletion")) {
        vscode.commands.executeCommand("codeoracle.auto_completion_enable");
    } else {
        vscode.commands.executeCommand("codeoracle.auto_completion_disable");
    }
}