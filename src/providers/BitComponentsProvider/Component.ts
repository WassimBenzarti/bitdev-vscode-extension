import * as vscode from "vscode"
import Item from "./Item";



export default class Component extends Item{
    contextValue = "component"
    constructor(
        public key: string,
        public component: any,
    ) {
        super(key);
    }

    get organization() {
        const match = this.key.match(/^(.*?)\./);
        return (match ) ? match[1] : "Default";
    }

    get collection(){
        const match = this.key.match(/^.*\.(.*)\//);
        return (match ) ? match[1]: "COLLECTION";
    }

    get namespace(){
        const match = this.key.match(/^.*\.(.*)\//);
        return (match) ? match[1] : "";
    }

    get fullName(){
        const match = this.key.match(/^.*\.(.*)\//);
        return (match) ? match[1]: "NAME" ;
    }

}