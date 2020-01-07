import * as vscode from "vscode";
import CommandContext from "../controller/CommandContext";
import { ComponentNotFound } from "../utils/bit/getCurrentComponentBitmap";


export default async function tagPublishComponent({
    getCurrentComponentBitmap,
    executeCommand
}: CommandContext) {
    try {
        const [name, component] = getCurrentComponentBitmap();

        executeCommand(
            `bit tag ${name}`
        )

        const scope = await vscode.window.showInputBox({
            prompt:"Type the scope"
        })

        // TODO: Publish component
        executeCommand(
            `bit export ${scope}`
        )

    } catch (e) {
        if (e instanceof ComponentNotFound) {
            vscode.window.showWarningMessage("This is not a component, please open a file of the component first.")
        }
    }
}

