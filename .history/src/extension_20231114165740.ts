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
	// let disposable = vscode.commands.registerCommand('helloworld.helloWorld', () => {
	// 	vscode.window.showInformationMessage('Hello World from HelloWorld!');
	// 	const disposableListener = vscode.window.onDidChangeActiveTextEditor(editor => {
	// 	  if (editor) {
	// 		const disposableKeydown = vscode.commands.registerCommand('type', () => {
	// 		  const userInput = editor.document.getText();
	// 		  if (userInput.includes('\n')) {
	// 			console.log('User input:', userInput);
	// 		  }
	// 		});
	
	// 		context.subscriptions.push(disposableKeydown);
	// 	  }
	// 	});
	
	// 	context.subscriptions.push(disposableListener);
	//   });
	// 	vscode.window.showInformationMessage('ailili!');
	  
	//   context.subscriptions.push(disposable);

    // 注册命令
    let disposable = vscode.commands.registerCommand('helloworld.helloWorld', () => {
        // 获取当前活动的文本编辑器
        const editor = vscode.window.activeTextEditor;
		vscode.window.showInformationMessage('开始');
		console.log('输入内容:', editor);

        if (editor) {
            // 监听编辑器的文本变化
            const disposable = vscode.workspace.onDidChangeTextDocument((e) => {
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
