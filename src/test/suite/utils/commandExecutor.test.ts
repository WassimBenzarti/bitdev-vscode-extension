import * as assert from "assert";
import createExecutor from "../../../utils/terminalCommand/createExecutor";
import { before } from "mocha";



suite("Command executor", () => {
    let execute: (cmd: string, options?: any) => Promise<string>;
    before(() => {
        execute = createExecutor({ uri: { fsPath: "" } } as any);
    })

    test("successfully", async () => {
        assert.doesNotReject(async () => {
            let out = await execute("echo hello");
            out
        })
    });

    test("fail because the command is wrong", async () => {
        assert.rejects(async () => {
            let output = await execute("azjifoazeif");
            output
        })
    });

});