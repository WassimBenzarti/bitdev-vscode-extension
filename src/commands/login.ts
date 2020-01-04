import * as vscode from "vscode"


export default function(terminal:vscode.Terminal){
    terminal?.show();
    terminal?.sendText("bit login");
}