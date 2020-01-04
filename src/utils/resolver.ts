import * as vscode from "vscode"

export function getRootFolder():vscode.WorkspaceFolder{
    return (vscode.workspace.workspaceFolders as any)[0];
}

export function getCurrentFile():vscode.TextDocument{
    return vscode.window.activeTextEditor?.document as vscode.TextDocument;
}