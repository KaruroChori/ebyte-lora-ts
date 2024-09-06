import { Type as t, type TSchema } from "@sinclair/typebox"
import { Value } from "@sinclair/typebox/value"

type model_t<endpoint_t, relay_t> = { endpoint: TSchema, relay: TSchema, serialize_cfg(arg: endpoint_t | relay_t): Uint8Array, deserialize_cfg(arg: Uint8Array): endpoint_t | relay_t }
export class lora_node<endpoint_t extends { mode: 'endpoint' }, relay_t extends { mode: 'relay' }> {
    private model: model_t<endpoint_t, relay_t>
    private partial_endpoint: TSchema
    private partial_relay: TSchema
    private file: unknown
    private mode: 'local' | 'ota' //It determines whether 0xcf 0xcf is preponed

    static UnrecognizedCommand = class extends Error { }

    constructor(file: unknown, model: model_t<endpoint_t, relay_t>, mode: 'local' | 'ota' = 'local') {
        this.file = file;
        this.model = model;
        this.mode = mode;
        this.partial_endpoint = t.Partial(model.endpoint)
        this.partial_relay = t.Partial(model.relay)
    }

    async write_cfg(opts: Partial<endpoint_t | relay_t>) {
        const cfg = Value.Default(opts?.mode === "relay" ? this.model.relay : this.model.endpoint, opts) as endpoint_t | relay_t
        await this.write_registers(0x00, this.model.serialize_cfg(cfg))
    }

    async read_cfg() {
        const tmp = await this.read_registers(0x00, 7)
        return this.model.deserialize_cfg(tmp)
    }

    /**
     * send C0/C2 BASE LENGHT DATA
     * recv C1 BASE LENGTH DATA
     * @param base 
     * @param data 
     * @param temporary 
     */
    async write_registers(base: number, data: Uint8Array, temporary = false) {
    }

    /**
     * send C1 BASE LENGTH
     * recv C1 BASE LENGTH DATA
     * @param base 
     */
    async read_registers(base: number, length: number): Uint8Array { }


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
        const tmp = new Uint8Array([0xC0, 0xC1, 0xC2, 0xC3, 0x02, mode === 'transmission' ? 0 : 1])

    }
}
