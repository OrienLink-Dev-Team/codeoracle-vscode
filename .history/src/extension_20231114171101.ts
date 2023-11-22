// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "helloworld" is now active!');

    // login command
    let disposable = vscode.commands.registerCommand('helloworld.helloWorld', () => {
        // Gets the currently active text editor
        const editor = vscode.window.activeTextEditor;
		vscode.window.showInformationMessage('开始');
		console.log('输入内容1111:', editor);
        if (editor) {
            // Listen for text changes in the editor
            const disposable = vscode.workspace.onDidChangeTextDocument((e) => {
				console.log('输入内容2222:', e);

                // 检查是否是当前活动的文本编辑器
                if (e.document === editor.document) {
                    // 检查最后一个按键是否是 Enter 键
                    const lastChange = e.contentChanges[e.contentChanges.length - 1];
                    if (lastChange.text === '\n') {
                        // 获取用户输入的内容
                        const inputText = editor.document.getText();
                        // 将输入内容发送给后端
                        sendInputToBackend(inputText);
                    }
                }
            });
            context.subscriptions.push(disposable);
        }
		vscode.window.showInformationMessage('结束');
    });

    context.subscriptions.push(disposable);
}

// 模拟发送输入内容给后端的函数
function sendInputToBackend(inputText: string) {
    console.log('输入内容:', inputText);
}

// This method is called when your extension is deactivated
export function deactivate() {}
