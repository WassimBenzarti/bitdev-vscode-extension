import * as child_process from "child_process";
import { WorkspaceFolder } from "vscode";
import * as vscode from "vscode"

export default function createExecutor(rootFolder:WorkspaceFolder) {
    return (command:string, options?:any):Promise<string>=>new Promise<string>((resolve,reject)=>{
        const cmd = child_process.exec(command,{
            cwd:rootFolder.uri.fsPath,
            ...options
        })

        cmd.stdout?.on("data", (data) => {
            resolve(data.toString());
        })
    
        cmd.stderr?.on("data", data => {
            reject(data.toString());
            vscode.window.showErrorMessage(data.toString());
        })
    
    })
}