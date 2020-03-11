import * as assert from 'assert';
import * as vscode from "vscode";
import { untrackComponent } from '../../../commands/untrackComponent';

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
        const name = component[0];
        (vscode.window.showInformationMessage as any) = (msg:string) => {
            assert.equal(msg, `Successfully untracked the component ${name}`);
        };

        await untrackComponent(
            {
                getCurrentComponentBitmap: () => component,
                executeCommand: (cmd: string) => {
                    assert.ok(cmd.match(`^bit untrack ${name}$`) as any);
                }
            } as any
        )

    });
});