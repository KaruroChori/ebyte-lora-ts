import { lora_node } from "ebyte-lora-ts/client"
import { model, type endpoint_t, type relay_t } from "ebyte-lora-ts/models/e22-900t22u";

import { autoDetect } from '@serialport/bindings-cpp'
const Binding = autoDetect()

const port = await Binding.open({ path: '/dev/ttyUSB0', baudRate: 9600 })

//Extremely bad buggy design of wrappers for bindings-cpp. Just to show it running (sometimes)
const client = new lora_node<endpoint_t, relay_t>({
    write: async (array: Uint8Array) => {
        const buffer = Buffer.from(array)
        return port.write(buffer)
    },
    read: async () => {
        const buffer = Buffer.alloc(64)
        const ret = await port.read(buffer, 0, 64);
        return { value: buffer.subarray(0, ret.bytesRead), done: true }
    }
}, model)

//await client.write_cfg({ address: 0xffff, radio: { air_rate: 62500 } })
console.log(await client.read_cfg())

