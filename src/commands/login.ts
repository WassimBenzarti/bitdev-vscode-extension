import * as vscode from "vscode"
import CommandContext from "../controller/CommandContext";


export default function login({ terminal }: CommandContext) {
        terminal.show();
        terminal.sendText("bit login");
}