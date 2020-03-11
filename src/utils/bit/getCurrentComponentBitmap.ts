import * as path from "path";
import Component, { NameAndComponent } from "./Component";


export class ComponentNotFound { }

export default function getComponentBitmap(currentFile: any, rootFolder: any, bitmap: any):NameAndComponent {
    const relativeCurrentFilePath = path.relative(rootFolder.uri.fsPath, currentFile.uri.fsPath)
        .replace(/\\/g, "/")
    const relativeCurrentParentPath = path.dirname(relativeCurrentFilePath)
    // The current parent might not be the root folder of the component
    // We need to check if it's a child of any component
    const componentNameAndObject = Object.entries<Component>(bitmap)
        .filter(([key, _]) => key !== "version")
        .find(([key, component]: any) => {
            return isChildOf(relativeCurrentFilePath, component.rootDir || component.trackDir)
        })

    if (!componentNameAndObject) {
        throw new ComponentNotFound;
    }

    return componentNameAndObject;
}

const isChildOf = (child: any, parent: any) => {
    if (child === parent) {return false;}
    const parentTokens = parent.split('/').filter((i: any) => i.length)
    return parentTokens.every((t: any, i: any) => child.split('/')[i] === t)
}

export const createComponentGetter = (currentFile: any, rootFolder: any, getBitmap: any) => () =>
    getComponentBitmap(currentFile(), rootFolder(), getBitmap())