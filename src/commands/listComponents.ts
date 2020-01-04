import CommandContext from "../controller/CommandContext";
import * as path from "path";
import * as fs from "fs";
import * as vscode from "vscode";

export default async function listComponents({
    rootFolder
}: CommandContext) {
    const bitMapFilePath = path.resolve(rootFolder.uri.fsPath, ".bitmap");

    const bitMap = fs.readFileSync(bitMapFilePath);

    const components = JSON.parse(bitMap.toString().replace(/^\/\*.*?\*\//, ""));

    const componentsNames = Object.entries(components)
        .filter(([name, object]) => name !== "version")
        .map(([name, object]) => ({ label: name, description: getComponentDescription(object) }));

    const pickedComponent = await vscode.window.showQuickPick(componentsNames, {
        placeHolder: "Pick a component",
        matchOnDescription: true
    });

    if (!pickedComponent) {
        return;
    }

    const componentFiles = components[pickedComponent.label]

    const chosenFile = await vscode.window.showQuickPick(getFilesWithDescription(componentFiles), {
        matchOnDescription:true,
        placeHolder:"Choose the file you want to open"
    });
    if (!chosenFile) {
        return;
    }

    // Show the chosen file
    const textDocument = await vscode.workspace.openTextDocument(path.resolve(rootFolder.uri.fsPath,chosenFile.description));
    vscode.window.showTextDocument(textDocument);
}



function getComponentDescription(component: any) {
    const { origin, exported, files } = component;
    return `${origin} ${exported ? 'Exported' : 'Not exported'} ${files.length} files`
}

function getFilesWithDescription(component: any):{label:string, description:string}[] {
    const { files } = component;
    return files.map(({ test, name, relativePath }:any) => {
        return {
            label: `${test?"✔":""} ${name}`,
            description: relativePath
        }
    })
}