import { Disposable, commands, window, ExtensionContext, workspace, Terminal, WorkspaceFolder, TextDocument } from "vscode";
import * as vscode from "vscode";
import { getCurrentFile, getRootFolder } from "../utils/resolver";
import CommandContext from "./CommandContext";



export default function createCommands(ctx: ExtensionContext, commandsExec: any, ): Disposable[] {

    // Get terminal
    let terminal: any = ctx.workspaceState.get("mainTerminal");
    if (!terminal) {
        terminal = window.createTerminal("Bit.dev");
        ctx.workspaceState.update("mainTerminal", terminal);
    }

    function addArguments(fn: (arg: CommandContext) => any) {
        return () => {
            return fn({
                terminal,
                rootFolder: getRootFolder(),
                currentFile: getCurrentFile(),
            });
        }
    }

    return Object.entries<Function>(commandsExec)
        .map(([key, fn]: any) => [key, addArguments(fn)])
        .map(([key, fn]: any): Disposable => commands.registerCommand(key, fn));
}