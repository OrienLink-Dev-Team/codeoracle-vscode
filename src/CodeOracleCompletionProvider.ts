import * as vscode from "vscode";
import { CancellationToken, InlineCompletionContext, InlineCompletionItem, InlineCompletionItemProvider, ProviderResult, Range, TextDocument, workspace, InlineCompletionTriggerKind } from "vscode";
import { postCompletion } from "./RequestCompletion";
import { sleep } from "./Utils";

export class CodeoRacleCompletionProvider implements InlineCompletionItemProvider {

	private statusBar: vscode.StatusBarItem;

	constructor(statusBar: vscode.StatusBarItem) {
		this.statusBar = statusBar;
	}

	public async provideInlineCompletionItems(document: TextDocument, position: vscode.Position, context: InlineCompletionContext, token: CancellationToken): Promise<vscode.InlineCompletionItem[] | null | undefined> {
		let autoTriggerEnabled = workspace.getConfiguration("CodeOracle").get("AutoTriggerCompletion") as boolean;
		// Check if the completion is triggered automatically
		if (context.triggerKind === InlineCompletionTriggerKind.Automatic) {
			// Check if auto-trigger is enabled in the settings
			if (!autoTriggerEnabled) {
				return [];
			}
			let delay = workspace.getConfiguration("CodeOracle").get("AutoCompletionDelay") as number;
			await sleep(1000 * delay);
			// Check if the operation was cancelled
			if (token.isCancellationRequested) {
				return [];
			}
		}
		// Get the prefix and suffix code for completion
		const fimPrefixCode = this.getFimPrefixCode(document, position);
		const fimSuffixCode = this.getFimSuffixCode(document, position);
		
		if (this.isNil(fimPrefixCode)) {
			return [];
		}
		// Update the statusBar
		this.statusBar.text = "$(loading~spin)";
		this.statusBar.tooltip = "CodeOracle - Working";
		// Request
		return postCompletion(fimPrefixCode, 'code').then((response) => {
			console.log("response",response);
			this.statusBar.text = "$(light-bulb)";
			this.statusBar.tooltip = `CodeOracle - Ready`;
			// if (token.isCancellationRequested || !response || this.isNil(response.completedCode.trim())) {
			// 	return [];
			// }
			if (!response.isCompleted) {
				return [];
			}
			return [new InlineCompletionItem(response.completedCode, new Range(position, position))];
		}).catch((error) => {
			console.error(error);
			this.statusBar.text = "$(alert)";
			this.statusBar.tooltip = "CodeOracle - Error";
			vscode.window.setStatusBarMessage(`${error}`, 10000);
			return [];
		});
	}

	private getFimPrefixCode(document: TextDocument, position: vscode.Position): string {
		const firstLine = Math.max(position.line - 5, 0);
		const range = new Range(firstLine, 0, position.line, position.character);
		return document.getText(range).trim();
	}

	private getFimSuffixCode(document: TextDocument, position: vscode.Position): string {
		const startLine = position.line + 1;
		const endLine = Math.min(startLine + 5, document.lineCount);
		const range = new Range(position.line, position.character, endLine, 0);
		return document.getText(range).trim();
	}

	private isNil(value: string | undefined | null): boolean {
		return value === undefined || value === null || value.length === 0;
	}
}