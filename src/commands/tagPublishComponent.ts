import * as vscode from "vscode";
import CommandContext from "../controller/CommandContext";
import { ComponentNotFound } from "../utils/bit/getCurrentComponentBitmap";


export default function tagPublishComponent({
    getCurrentComponentBitmap,
    executeCommand
}: CommandContext) {
    try {
        const [name, component] = getCurrentComponentBitmap();

        executeCommand(
            `bit tag ${name}`
        )

        // TODO: Publish component
        

    } catch (e) {
        if (e instanceof ComponentNotFound) {
            vscode.window.showWarningMessage("This is not a component, please open a file of the component first.")
        }
    }
}

