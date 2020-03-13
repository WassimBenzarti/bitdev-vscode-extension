import * as vscode from "vscode"
import Item from "./Item";
import * as path from "path";
import {default as BitComponent} from "../../utils/bit/Component";



export default class Component extends Item {
    contextValue = "component";
    iconPath = {
		light: path.join(__filename,"..",'..', '..', '..', 'resources','icons', 'light', '3d.svg'),
		dark: path.join(__filename,"..",'..', '..', '..', 'resources','icons', 'dark', '3d.svg')
	};

    constructor(
        public key: string,
        public component: BitComponent,
    ) {
        super(path.basename(key));
        this.key = key;
        this.command = {
            command:"bitdev.openComponent",
            title:"Open command",
            arguments:[this],
        };
    }

    get fullPath(){
        if(this.isImported){
            return vscode.workspace.rootPath +"/"+ this.component.rootDir +"/"+ this.component.mainFile
        }
        return vscode.workspace.rootPath +"/" + this.component.mainFile
    }

    get organization() {
        const match = this.key.match(/^(.*?)\./);
        return (match) ? match[1] : "Default";
    }

    get collection() {
        const match = this.key.match(/^.*\.(.*)\//);
        return (match) ? match[1] : "COLLECTION";
    }

    get namespace() {
        const match = this.key.match(/^.*\.(.*)\//);
        return (match) ? match[1] : "";
    }

    get fullName() {
        const match = this.key.match(/^.*\.(.*)\//);
        return (match) ? match[1] : "NAME";
    }

    get isImported(){
        return this.component.origin === "IMPORTED";
    }

}