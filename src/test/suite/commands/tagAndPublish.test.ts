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

    test("successfully", async () => {
        // Mock the showInputBox
        (vscode.window.showInputBox as any) = () => "example.my"

        const commands = [
            component[0], // Component name
            "example.my"
        ];

        await tagPublishComponent(
            {
                getCurrentComponentBitmap: () => component,
                executeCommand: (cmd: string) => {
                    assert.ok(cmd.match(commands.shift()) as any);
                }
            } as any
        )
    })

    test("wrong component name", async () => {
        // Mock the showInputBox
        (vscode.window.showInputBox as any) = () => "example.my"

        const commands = [
            "wrong-name", // Component name
            "wrong-example.my"
        ];
        await tagPublishComponent(
            {
                getCurrentComponentBitmap: () => component,
                executeCommand: (cmd: string) => {
                    assert.equal(cmd.match(commands.shift() as any) as any, null)
                }
            } as any
        )
    })

})