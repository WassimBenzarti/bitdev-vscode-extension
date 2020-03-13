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
import { untrackComponent } from './commands/untrackComponent';
import { openComponent } from './commands/openComponent';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	const bitComponentsProvider = new BitComponentsProvider(
		getBitmapPath(getRootFolder()),
		() => getBitmap(getRootFolder())
	);
	vscode.window.registerTreeDataProvider('bitComponents',
		bitComponentsProvider
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
		"bitdev.bitSetup": setupBit,
		"bitdev.bitLogin": login,
		"bitdev.bitAdd": addComponent,
		"bitdev.bitRefresh": bitComponentsProvider.refresh.bind(bitComponentsProvider),
		"bitdev.bitList": listComponents,
		"bitdev.bitImport": importComponent,
		"bitdev.bitTagPublish": tagPublishComponent,
		"bitdev.bitUntrack": untrackComponent,
		"bitdev.openComponent": openComponent,
	};

	context.subscriptions.push(
		...createCommands(context, commands)
	);
}

// this method is called when your extension is deactivated
export function deactivate() { }
