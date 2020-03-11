import CommandContext from "../controller/CommandContext";
import * as vscode from "vscode";
import Component from "../providers/BitComponentsProvider/Component";
import { ComponentNotFound } from "../utils/bit/getCurrentComponentBitmap";

//{executeCommand, getCurrentComponentBitmap}: CommandContext
export async function untrackComponent({executeCommand, getCurrentComponentBitmap}: CommandContext, componentItem:Component|undefined){
    let nameAndComponent = null;

    /**
     * Since the user can call this function from:
     *      - Command palette (that means the component is focused in the editor)
     *      - Context menu of the view (this means the componentItem, in the argument, is not undefined)
     */
    if(typeof componentItem === "undefined"){
        try{
            nameAndComponent = getCurrentComponentBitmap();
        }catch(e){
            if(e instanceof ComponentNotFound){
                return vscode.window.showErrorMessage(`Component not found, you can't untrack the component focused in the editor.`);
            }
        }
    }else{
        nameAndComponent = [componentItem.name, componentItem.component];
    }


    const [name, component] = nameAndComponent;
    /**
     * TODO: Currently showing the success/error messages as is, because bit CLI doesn't raise an error
     * when there is an exception
     */
    try{
        const output:any = await executeCommand(`bit untrack ${name}`);
        vscode.window.showInformationMessage(output.success);
    }catch(e){
        vscode.window.showErrorMessage(e.message);
    }

}