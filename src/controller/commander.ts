import { Disposable, commands, window, ExtensionContext, workspace, Terminal, WorkspaceFolder, TextDocument } from "vscode";
import * as vscode from "vscode";
import { getCurrentFile, getRootFolder } from "../utils/resolver";
import CommandContext from "./CommandContext";
import createExecutor from "../utils/terminalCommand/createExecutor";
import getBitmap, { createBitmapGetter } from "../utils/bit/getBitmap";
import { createComponentGetter } from "../utils/bit/getCurrentComponentBitmap";



export default function createCommands(ctx: ExtensionContext, commandsExec: any, ): Disposable[] {

    // Get terminal
    // TODO: Maybe using name isn't a good idea, maybe use processId
    let terminal: Terminal = window.terminals.find(terminal => terminal.name === "Bit.dev") || window.createTerminal("Bit.dev");

    function addArguments(fn: (arg: CommandContext) => any) {
        return () => {
            const getBitmap = createBitmapGetter(getRootFolder());
            return fn({
                terminal,
                rootFolder: getRootFolder(),
                currentFile: getCurrentFile(),
                executeCommand: createExecutor(getRootFolder()),
                getBitmap,
                getCurrentComponentBitmap: createComponentGetter(getCurrentFile, getRootFolder, getBitmap),
            });
        };
    }

    return Object.entries<Function>(commandsExec)
        .map(([key, fn]: any) => [key, addArguments(fn)])
        .map(([key, fn]: any): Disposable => commands.registerCommand(key, fn));
}