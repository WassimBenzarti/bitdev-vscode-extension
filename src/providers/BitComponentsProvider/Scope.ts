import Item from "./Item";
import * as vscode from "vscode";
import * as path from "path";

export default class Scope extends Item {
    iconPath = {
		light: path.join(__filename,"..",'..', '..', '..', 'resources','icons', 'light', 'department.svg'),
		dark: path.join(__filename,"..",'..', '..', '..', 'resources','icons', 'dark', 'department.svg')
	};

    collapsibleState= vscode.TreeItemCollapsibleState.Expanded;

    constructor(
        public name: string,
        public children: Item[]
    ) {
        super(name, children);
    }


}