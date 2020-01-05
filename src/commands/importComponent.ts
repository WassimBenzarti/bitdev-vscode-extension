import search from "../utils/bit/search";
import * as vscode from "vscode";
import { debounce } from "debounce";
import CommandContext from "../controller/CommandContext";

export default function importComponent({
    executeCommand
}: CommandContext) {
    const picker = vscode.window.createQuickPick()
    picker.matchOnDetail = true
    const callback = debounce(async (value: string) => {

        // Regex for the "[owner.scope] component-name" command
        const [owner, collection, query] = value.match(/(?:\[([^.]*)\.?([^.]*)?\])?\s?(.*)/)?.slice(1) || [];
        
        // Use progress API of VSCode
        const response = await vscode.window.withProgress({
            title: "Fetching components",
            location: 10
        }, () => search(query, collection ? owner + "." + collection : "", owner));

        const hits = response.payload.hits;
        picker.title = `${hits.length} components found`
        picker.items = hits.map(({ size, owner, description, downloads, scope, fullName }: any) => ({
            label: owner.name + "." + scope + "/" + fullName,
            description: `$(arrow-down) ${downloads} | ${size.gzipped}KB`,
            detail: `${description || ""}$(tag) ${(fullName + " " + owner.name + " " + scope).split(/[^a-z]/gi).join(" ")}`,
            value: owner.name + "." + scope + "/" + fullName,
            alwaysShow: true,
        }))
        picker.busy = false
    }, 1000)

    picker.onDidChangeValue(async (value) => {
        if (!value) {
            picker.busy = false
            return;
        };
        picker.busy = true
        callback(value);
    })

    picker.onDidAccept(() => {
        const { value }: any = picker.selectedItems[0];
        executeCommand(`bit import ${value}`)
    })

    picker.show();
}