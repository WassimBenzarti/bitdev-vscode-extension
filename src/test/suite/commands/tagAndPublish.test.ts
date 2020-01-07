import * as assert from 'assert';
import * as vscode from "vscode"
import tagPublishComponent from "../../../commands/tagPublishComponent"

const component: any = [
    "specific/another-component",
    {
        "files": [
            {
                "relativePath": "src/common/AnotherComponent/AnotherComponent.js",
                "test": false,
                "name": "AnotherComponent.js"
            }
        ],
        "mainFile": "src/common/AnotherComponent/AnotherComponent.js",
        "trackDir": "src/common/AnotherComponent",
        "origin": "AUTHORED",
        "exported": false
    }
]


suite("should tag and publish", () => {

    test("successfully", () => {
        // Mock the showInputBox
        (vscode.window.showInputBox as any) = () => "bmw.my"

        tagPublishComponent(
            {
                getCurrentComponentBitmap: () => component,
                executeCommand: (cmd: string) => {
                    //assert.ok(cmd.match(component[0]), "Exact name")
                    console.log(cmd)
                }
            } as any
        )
    })

})