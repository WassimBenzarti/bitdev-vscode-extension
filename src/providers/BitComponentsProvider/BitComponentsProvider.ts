import * as vscode from "vscode"
import Component from "./Component";
import Scope from "./Scope";
import Item from "./Item";

export default class BitComponentsProvider implements vscode.TreeDataProvider<Item> {
    public _changeEvent = new vscode.EventEmitter<any>();
    constructor(private bitmapPath: string,
        private getBitmap: () => any) {
        const dispose = vscode.workspace.createFileSystemWatcher(bitmapPath)
            .onDidChange(() => this._changeEvent.fire());
    }

    onDidChangeTreeData?: vscode.Event<Item | null | undefined> | undefined = this._changeEvent.event;


    getTreeItem(element: Item): vscode.TreeItem | Thenable<vscode.TreeItem> {
        const treeItem = new vscode.TreeItem(element.name,
            element instanceof Scope
                ? vscode.TreeItemCollapsibleState.Expanded
                : vscode.TreeItemCollapsibleState.None);
        return treeItem;
    }

    getChildren(element?: Scope): vscode.ProviderResult<Item[]> {
        if (!element) {
            return this._getScopes();
        }

        const components: Item[] = element.children;

        /*
        const scopes = components.reduce((result: any, next: Item) => {
            if (!result[next.organization]) result[next.organization] = {}
            const organization = result[next.organization];
            if (!organization[next.collection]) organization[next.collection] = []
            organization[next.collection].push(next);
            return result;
        }, {})

        const items: any[] = Object.entries(scopes).reduce((result, [scopeName, scope]: any) => {
            result.push(new Scope(scopeName))
            Object.entries(scope).forEach(([collectionName, collection]:any) => {
                result.push(new Scope(collectionName))
                collection.forEach((component:Component)=>{
                    result.push(component);
                })
            })
            return result;
        },[] as any);
        */
        return components;
    }

    _getScopes(): Item[] {
        const components = Object.entries(this.getBitmap())
            .filter(([key, _]) => key !== "version")
            .map(([key, component]) => new Component(key, component))
        const scopes: any = components.reduce((result: any, next: Component) => {
            if (!result[next.organization]) result[next.organization] = {}
            const organization = result[next.organization];
            if (!organization[next.collection]) organization[next.collection] = []
            organization[next.collection].push(next);
            return result;
        }, {})
        const items: any[] = Object.entries(scopes).reduce((result, [scopeName, scope]: any) => {
            const children: Item[] = Object.entries(scope).map(([collectionName, collection]: any) => {
                return new Scope(collectionName, collection)
            })
            result.push(new Scope(scopeName, children))
            return result;
        }, [] as any);

        return Object.values(items);
    }

}