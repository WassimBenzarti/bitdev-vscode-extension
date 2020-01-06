import { Terminal, WorkspaceFolder, TextDocument } from "vscode";
import * as vscode from "vscode"

export default interface CommandContext {
    terminal: Terminal,
    rootFolder: WorkspaceFolder,
    currentFile: TextDocument,
    executeCommand: (cmd:string, options?:any)=>Promise<string>,
    getBitmap: ()=>any,
    getCurrentComponentBitmap: ()=>any,
}