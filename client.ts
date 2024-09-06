import { Type as t, type TSchema } from "@sinclair/typebox"
import { Value } from "@sinclair/typebox/value"

type RecursivePartial<T> = {
    [P in keyof T]?: RecursivePartial<T[P]>;
};

type model_t<endpoint_t, relay_t> = { endpoint: TSchema, relay: TSchema, serialize_cfg(arg: endpoint_t | relay_t): Uint8Array, deserialize_cfg(arg: Uint8Array): endpoint_t | relay_t }
type file_t = { write: (data: Uint8Array) => Promise<void>, read: () => Promise<{ value: Uint8Array; done: boolean }> }
export class lora_node<endpoint_t extends { mode: 'endpoint' }, relay_t extends { mode: 'relay' }> {
    private model: model_t<endpoint_t, relay_t>
    private file: file_t
    private mode: 'local' | 'ota' //It determines whether 0xcf 0xcf is preponed

    static UnrecognizedCommand = class extends Error { }
    static ConfigValidationFailed = class extends Error { }

    constructor(file: file_t, model: model_t<endpoint_t, relay_t>, mode: 'local' | 'ota' = 'local') {
        this.file = file;
        this.model = model;
        this.mode = mode;
    }

    async write_cfg(opts: RecursivePartial<endpoint_t | relay_t>) {
        const cfg = Value.Default(opts?.mode === "relay" ? this.model.relay : this.model.endpoint, opts) as endpoint_t | relay_t
        if (!Value.Check(opts?.mode === "relay" ? this.model.relay : this.model.endpoint, cfg)) {
            //for (const error of Value.Errors(opts?.mode === "relay" ? this.model.relay : this.model.endpoint, cfg)) console.error(error)
            throw new lora_node.ConfigValidationFailed();
        }
        await this.write_registers(0x00, this.model.serialize_cfg(cfg))
    }

    async read_cfg() {
        const tmp = await this.read_registers(0x00, 7)
        const cfg = this.model.deserialize_cfg(tmp)
        console.log(cfg)
        if (!Value.Check(cfg?.mode === "relay" ? this.model.relay : this.model.endpoint, cfg)) throw new lora_node.ConfigValidationFailed()
        return
    }

    /**
     * send C0/C2 BASE LENGHT DATA
     * recv C1 BASE LENGTH DATA
     * @param base 
     * @param data 
     * @param temporary 
     */
    async write_registers(base: number, data: Uint8Array, temporary = false) {
        const tmp = new Uint8Array(2 * (this.mode === "ota" ? 1 : 0) + 3 + data.length)
        let window: Uint8Array;
        if (this.mode === "ota") {
            tmp[0] = 0xCF
            tmp[1] = 0xCF
            window = tmp.subarray(2)
        }
        else window = tmp.subarray()
        window[0] = temporary ? 0xC2 : 0xC0
        window[1] = base
        window[2] = data.length
        window.subarray(3).set(data)

        await this.file.write(tmp)
        const ret = await this.file.read()
        if (!ret.done) throw new Error('Missing part of the return')
        if (ret.value.length === 3 && ret.value[0] === 0xFF && ret.value[1] === 0xFF && ret.value[2] === 0xFF) throw new lora_node.UnrecognizedCommand()
        //TODO: Check return value to match
    }

    /**
     * send C1 BASE LENGTH
     * recv C1 BASE LENGTH DATA
     * @param base 
     */
    async read_registers(base: number, length: number): Promise<Uint8Array> {
        const tmp = new Uint8Array(2 * (this.mode === "ota" ? 1 : 0) + 3)
        let window: Uint8Array;
        if (this.mode === "ota") {
            tmp[0] = 0xCF
            tmp[1] = 0xCF
            window = tmp.subarray(2)
        }
        else window = tmp.subarray()
        window[0] = 0xC1
        window[1] = base
        window[2] = length
        await this.file.write(tmp)

        const ret = await this.file.read()
        if (!ret.done) throw new Error('Missing part of the return')
        if (ret.value.length === 3 && ret.value[0] === 0xFF && ret.value[1] === 0xFF && ret.value[2] === 0xFF) throw new lora_node.UnrecognizedCommand()
        //TODO: Check return value to match
        return ret.value.subarray(2 * (this.mode === "ota" ? 1 : 0) + 3)
    }


    /**
     * Request device information (read-only registers)
     */
    async get_pid() { return this.read_registers(0x80, 6) }

    /**
     * Set a specific crypto key (write-only registers)
     */
    async set_crypto(key: number) {
        await this.write_registers(0x8, new Uint8Array([key & 0xff00, (key & 0x00ff) >> 8]))
    }

    /**
     * Switch operating mode of the modem (transmission/configuration).
     * It only works if `enable_mode_switch` is set to true
     */
    async switch_modem_mode(mode: 'transmission' | 'configuration') {
        const tmp = new Uint8Array([...(this.mode === 'local' ? [] : [0xcf, 0xcf]), 0xC0, 0xC1, 0xC2, 0xC3, 0x02, mode === 'transmission' ? 0 : 1])
        const ret = await this.file.read()
        if (!ret.done) throw new Error('Missing part of the return')
        if (ret.value.length === 3 && ret.value[0] === 0xFF && ret.value[1] === 0xFF && ret.value[2] === 0xFF) throw new lora_node.UnrecognizedCommand()
        //TODO: Check return value to match
    }
}
