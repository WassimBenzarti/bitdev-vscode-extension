import * as child_process from "child_process";
import { WorkspaceFolder } from "vscode";
import * as vscode from "vscode"

const channel = vscode.window.createOutputChannel("Bit.dev");

export default function createExecutor(rootFolder: WorkspaceFolder) {
    return (command: string, options?: any): Promise<string> => new Promise<string>((resolve, reject) => {
        channel.clear();
        const cmd = child_process.exec(command, {
            cwd: rootFolder.uri.fsPath,
            ...options
        })

        cmd.stdout?.on("data", (data) => {
            resolve(data.toString());
            channel.appendLine(data.toString())
        })

        cmd.stderr?.on("data", data => {
            reject(data.toString());
            //vscode.window.showErrorMessage(data.toString());
            channel.appendLine(data.toString())
            channel.show();
        })

    })
}