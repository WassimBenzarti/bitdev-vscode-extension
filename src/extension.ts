// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import setupBit from './commands/setupBit';
import login from './commands/login';
import createCommands from './controller/commander';
import addComponent from './commands/addComponent';
import listComponents from './commands/listComponents';
import importComponent from './commands/importComponent';
import tagPublishComponent from './commands/tagPublishComponent';
import BitComponentsProvider from './providers/BitComponentsProvider/BitComponentsProvider';
import getBitmap, { getBitmapPath } from './utils/bit/getBitmap';
import { getRootFolder } from './utils/resolver';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	vscode.window.registerTreeDataProvider('bitComponents',
		new BitComponentsProvider(
			getBitmapPath(getRootFolder()),
			() => getBitmap(getRootFolder())
		)
	);

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "bitdev" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World!');
	};

	const commands: { [key: string]: Function } = {
		"extension.helloWorld": disposable,
		"extension.bitSetup": setupBit,
		"extension.bitLogin": login,
		"extension.bitAdd": addComponent,
		"extension.bitList": listComponents,
		"extension.bitImport": importComponent,
		"extension.bitTagPublish": tagPublishComponent
	};

	context.subscriptions.push(
		...createCommands(context, commands)
	);
}

// this method is called when your extension is deactivated
export function deactivate() { }
