import * as assert from "assert";
import getCommonNamespaces from "../../../../utils/bit/getCommonNamespaces/getCommonNamespaces";




suite("get common namespaces", () => {
    test("should not return duplicates",()=>{
        const bitmap = {
            "test/another-component@0.0.1": {
                "origin": "AUTHORED",
            },
            "test/test-component": {
                "origin": "AUTHORED"
            },
            "version": "14.7.1"
        };
        const commonNames = getCommonNamespaces(bitmap);
        assert.deepEqual(commonNames, ["test"]);
    });

    test("should return with order",()=>{
        const bitmap = {
            "testing/test-component": {
                "origin": "AUTHORED"
            },
            "test/another-component@0.0.1": {
                "origin": "AUTHORED",
            },
            "test/test-component": {
                "origin": "AUTHORED"
            },
            "version": "14.7.1"
        };
        const commonNames = getCommonNamespaces(bitmap);
        assert.deepEqual(commonNames, ["test","testing"]);
    });

    test("should parse right",()=>{
        const bitmap = {
            "bmw.my/components/another-component@0.0.1": {
                "origin": "AUTHORED",
            },
            "bmw.my/another-component@0.0.1": {
                "origin": "AUTHORED",
            },
            "test/test-component": {
                "origin": "AUTHORED"
            },
            "version": "14.7.1"
        };
        const commonNames = getCommonNamespaces(bitmap);
        assert.deepEqual(commonNames, ["components", "test"]);
    });

    test("should succeed",()=>{
        const bitmap = {
            "bmw.my/components/flex@0.0.4": {
                "origin": "IMPORTED",
            },
            "testing/another-component@0.0.1": {
                "origin": "AUTHORED",
            },
            "test/test-component": {
                "origin": "AUTHORED"
            },
            "version": "14.7.1"
        };
        const commonNames = getCommonNamespaces(bitmap);
        assert.deepEqual(commonNames, ["testing", "test"]);
    });
});