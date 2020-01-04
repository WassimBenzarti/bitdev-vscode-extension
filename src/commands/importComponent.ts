import search from "../utils/bit/search";
import * as vscode from "vscode";
import { debounce } from "debounce";

export default function importComponent() {
    const picker = vscode.window.createQuickPick()

    const callback = debounce(async (value:string) => {
        const response = await vscode.window.withProgress({
            title: "Fetching components",
            location: 10
        }, () => search(value));
        const hits = response.payload.hits;
        picker.items = hits.map(({ owner, scope, fullName }: any) => ({ label: fullName, description:owner.name+"/"+scope }))
    }, 1000)

    picker.onDidChangeValue(async (value) => {
        if (!value) return;
        callback(value);
    })
    picker.show();



}