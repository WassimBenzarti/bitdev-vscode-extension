import * as path from "path"
import * as fs from "fs";
import { WorkspaceFolder } from "vscode";

export function getBitmapPath(rootFolder: WorkspaceFolder) {
    return path.resolve(rootFolder.uri.fsPath, ".bitmap");
}

export default function getBitmap(rootFolder: WorkspaceFolder) {
    const bitMapFilePath = getBitmapPath(rootFolder);

    const bitMap = fs.readFileSync(bitMapFilePath);

    const components = JSON.parse(bitMap.toString().replace(/^\/\*.*?\*\//, ""));

    return components;
}

export const createBitmapGetter = (rootFolder: WorkspaceFolder) => () => getBitmap(rootFolder);