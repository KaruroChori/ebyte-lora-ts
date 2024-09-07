#!/bin/env bun
import { Glob, $ } from "bun";

//Generate json schema to host to have hints while filling the configuration as a json file.
console.log('Generating JSON schemas.')
{
    await $`rm -rf ./schemas`
    await $`mkdir -p ./schemas`

    const glob = new Glob("./models/[!@]*.ts");
    for await (const file of glob.scan(".")) {
        const item = file.slice("./models/".length, -'.ts'.length)
        const { relay, endpoint } = await import(`.${file}`)
        if (relay !== undefined) await Bun.write(`./schemas/${item}.relay.schema.json`, JSON.stringify(relay, undefined, 4));
        if (endpoint !== undefined) await Bun.write(`./schemas/${item}.endpoint.schema.json`, JSON.stringify(endpoint, undefined, 4));
    }
}
