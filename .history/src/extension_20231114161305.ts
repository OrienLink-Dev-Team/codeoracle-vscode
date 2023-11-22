// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "helloworld" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	// let disposable = vscode.commands.registerCommand('helloworld.helloWorld', () => {
	// 	// The code you place here will be executed every time your command is executed
	// 	// Display a message box to the user
	// 	vscode.window.showInformationMessage('Hello World from HelloWorld!');
	// });
	vscode.workspace.onDidChangeTextDocument((event) => {
        // 获取当前活动的编辑器
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            // 获取当前编辑器的文档
            const document = editor.document;
            // 获取用户最后一次输入的文本
            const lastInput = document.getText(event.contentChanges[0].range);
            
            // 在控制台输出用户输入的文本
            console.log('用户输入:', lastInput);
            
            // 在状态栏显示用户输入的文本
            vscode.window.setStatusBarMessage(`用户输入: ${lastInput}`);
        }
    });
}

// This method is called when your extension is deactivated
export function deactivate() {}
