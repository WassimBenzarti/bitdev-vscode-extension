import * as vscode from "vscode"

export default (terminal: vscode.Terminal) => {
    terminal.show()
    // Init the bit project
    terminal.sendText("bit init");
}