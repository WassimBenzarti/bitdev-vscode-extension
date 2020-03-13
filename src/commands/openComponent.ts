import CommandContext from "../controller/CommandContext";
import Component from "../providers/BitComponentsProvider/Component";
import * as vscode from "vscode";

export async function openComponent(options:CommandContext, component: Component){

    const path = component.fullPath.replace(/\\/g, "/");


    vscode.workspace.openTextDocument(path).then(document=>{
        vscode.window.showTextDocument(document);
    });

}