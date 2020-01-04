import { Terminal, window, comments } from "vscode";
import * as child_process from "child_process";
import CommandContext from "../controller/CommandContext";
import * as vscode from "vscode"
import * as path from "path";

export default async function addComponent({
    terminal,
    rootFolder,
    currentFile
}: CommandContext) {
    const namespace = await window.showQuickPick(["common", "specific"]);

    const componentId = await window.showInputBox({ 
        placeHolder: "Type the name of the component (lowercase)",
        value: namespace+"/"
    });

    const relativeFilePath = path.relative(rootFolder.uri.fsPath, currentFile.uri.fsPath)
    const cmd = child_process.exec(
        `bit add ${relativeFilePath} --id ${componentId}`,
        {
            cwd: rootFolder.uri.fsPath
        })

    cmd.stdout?.on("data", (data) => {
        console.log(data.toString());
        vscode.window.showInformationMessage(data.toString());

    })

    cmd.stderr?.on("data", data => {
        console.log(data.toString());
        vscode.window.showErrorMessage(data.toString(),{
            modal:true,
        });
    })

    //terminal.sendText("bit add ")
}