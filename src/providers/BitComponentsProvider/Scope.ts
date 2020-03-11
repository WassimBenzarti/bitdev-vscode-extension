import Item from "./Item";
import * as vscode from "vscode";

export default class Scope extends Item {

    collapsibleState= vscode.TreeItemCollapsibleState.Expanded;

    constructor(
        public name: string,
        public children: Item[]
    ) {
        super(name, children);
    }


}