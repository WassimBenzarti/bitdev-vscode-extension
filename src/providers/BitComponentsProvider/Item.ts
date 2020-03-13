import * as vscode from "vscode"

export default class Item extends vscode.TreeItem {

    constructor(
        name: string,
        public children?: Item[]
    ) { 
        super(name);
    }

}