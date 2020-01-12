import * as child_process from "child_process";
import { WorkspaceFolder } from "vscode";
import * as vscode from "vscode"

const channel = vscode.window.createOutputChannel("Bit.dev");

export class CommandFailed extends Error{}

export default function createExecutor(rootFolder: WorkspaceFolder) {
    return (command: string, options?: any): Promise<any> => new Promise<any>((resolve, reject) => {
        channel.clear();
        const cmd = child_process.exec(command, {
            cwd: rootFolder.uri.fsPath,
            ...options
        })

        let output = {
            success: "",
            error:"",
        }
        cmd.stdout?.on("data", (data) => {
            //success(data.toString());
            output.success += data;
            channel.appendLine(data.toString())
        })

        cmd.stderr?.on("data", data => {
            //error(data.toString());
            output.error += data;
            //vscode.window.showErrorMessage(data.toString());
            channel.appendLine(data.toString())
            channel.show();
        })

        cmd.stdout?.on("end",()=>{
            output.error ? reject(new CommandFailed(output.error)) : resolve(output)
        })

    })
}