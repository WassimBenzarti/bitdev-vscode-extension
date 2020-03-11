import * as vscode from "vscode"

export default class Item extends vscode.TreeItem {

    constructor(
        public name: string,
        public children?: Item[]
    ) { 
        super(name);
    }

}