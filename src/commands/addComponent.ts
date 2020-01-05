import { Terminal, window, comments } from "vscode";
import * as child_process from "child_process";
import CommandContext from "../controller/CommandContext";
import * as vscode from "vscode"
import * as path from "path";
import toDashed from "../utils/toDashed";
import getCommonNamespaces from "../utils/bit/getCommonNamespaces";

export default async function addComponent({
    terminal,
    rootFolder,
    currentFile,
    executeCommand,
    getBitmap,
}: CommandContext) {
    // Preparing the paths
    const relativeFilePath = path.relative(rootFolder.uri.fsPath, currentFile.uri.fsPath)
    const relativeParentPath = path.dirname(relativeFilePath)
    const potentialComponentName = toDashed(path.basename(relativeParentPath));

    const commonNamespaces: any[] = getCommonNamespaces(getBitmap());

    const picker = window.createQuickPick();
    // Suggest the common namespaces
    picker.items = commonNamespaces.map(ns => ({ label: ns, alwaysShow: true })) as any;
    picker.onDidChangeValue(value => {
        // Show an item for the new namespace
        picker.items = [{ label: value, description: "create new namespace", alwaysShow: true }]
            .concat(picker.items.slice(1) as any)
    });

    picker.onDidAccept(async () => {
        const namespace = picker.selectedItems[0].label;

        const componentId = await window.showInputBox({
            placeHolder: "Type the name of the component (lowercase)",
            value: namespace + "/" + potentialComponentName
        });

        executeCommand(`bit add ${relativeParentPath} --id ${componentId}`)
            .then((output) => {
                vscode.window.showInformationMessage(output);
            })
    })

    picker.show();

}