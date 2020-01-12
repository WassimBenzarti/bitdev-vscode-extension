import * as assert from 'assert';
import * as vscode from "vscode"
import tagPublishComponent from "../../../commands/tagPublishComponent"
import { CommandFailed } from '../../../utils/terminalCommand/createExecutor';

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

    test("show error message", async () => {
        // Mock the showInputBox
        (vscode.window.showInputBox as any) = () => "example.my";
        (vscode.window.showErrorMessage as any) = (message: string) => {
            assert.equal(message, "Can't publish for some reason")
        }
        const commands = [
            () => assert.ok(true), // First command with success
            () => { throw new CommandFailed("Can't publish for some reason") }
        ];
        await assert.rejects(() => tagPublishComponent(
            {
                getCurrentComponentBitmap: () => component,
                executeCommand: async (cmd: string) => {
                    return await (commands.shift() as any)()
                },
            } as any
        ))
    })

    test("show missing scope", async () => {
        const scope = "example.nonexistingcollection";
        // Mock the showInputBox
        (vscode.window.showInputBox as any) = () => scope;
        (vscode.window.showErrorMessage as any) = (message: string) => {
            assert.equal(message, `Make sure the scope "${scope}" exists`)
            return "Create collection"
        }
        (vscode.env.openExternal as any) = (uri: vscode.Uri) => {
            assert.equal(uri.toString(), `https://bit.dev/~create-collection`)
        }
        const commands = [
            () => assert.ok(true), // First command with success
            () => { throw new CommandFailed(`"${scope}" was not found`) } // Simulate the Bit not found message
        ];
        await assert.rejects(() => tagPublishComponent(
            {
                getCurrentComponentBitmap: () => component,
                executeCommand: async (cmd: string) => {
                    return await (commands.shift() as any)()
                },
            } as any
        ))
    })

})