import * as vscode from "vscode";
import CommandContext from "../controller/CommandContext";
import { ComponentNotFound } from "../utils/bit/getCurrentComponentBitmap";


export default async function tagPublishComponent({
    getCurrentComponentBitmap,
    executeCommand
}: CommandContext) {
    let scope; // Scope of the component
    try {
        const [name, component] = getCurrentComponentBitmap();

        await executeCommand(
            `bit tag ${name}`
        )

        scope = await vscode.window.showInputBox({
            prompt: "Type the scope"
        })

        await executeCommand(
            `bit export ${scope}`
        )

    } catch (e) {
        if (e instanceof ComponentNotFound) {
            vscode.window.showWarningMessage("This is not a component, please open a file of the component first.")
        }
        if (scope && e.message.match(`\"${scope}\" was not found`)!==null) {
            const action = await vscode.window.showErrorMessage(
                `Make sure the scope "${scope}" exists`,
                "Create collection",
                "Create organization"
            )
            switch(action){
                case "Create collection":
                    //vscode.env.openExternal();
                    vscode.env.openExternal(vscode.Uri.parse("https://bit.dev/~create-collection"));
                break;
                case "Create organization":
                    vscode.env.openExternal(vscode.Uri.parse("https://bit.dev/~create-org"));
                break;
            }
            action
        }
        vscode.window.showErrorMessage(e.message);
        throw e;
    }
}

