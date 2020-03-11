import CommandContext from "../controller/CommandContext";
import Component from "../utils/bit/Component";
import * as vscode from "vscode";


export async function untrackComponent({executeCommand, getCurrentComponentBitmap}: CommandContext){
    const [name, component]:[string, Component] = getCurrentComponentBitmap();
    
    await executeCommand(`bit untrack ${name}`);


    vscode.window.showInformationMessage(`Successfully untracked the component ${name}`);
}