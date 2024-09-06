import type { TSchema } from "@sinclair/typebox"
import { Value } from "@sinclair/typebox/value"

export class lora_node<lora_cfg_endpoint_t, lora_cfg_relay_t> {
    private model: { lora_cfg_endpoint: TSchema, lora_cfg_relay: TSchema, serialize(arg: lora_cfg_endpoint_t | lora_cfg_relay_t): Uint8Array, deserialize(arg: Uint8Array): lora_cfg_endpoint_t | lora_cfg_relay_t }
    #config?: lora_cfg_endpoint_t | lora_cfg_relay_t
    private file: unknown
    private mode: 'local' | 'ota' //It determines whether 0xcf 0xcf is preponed

    static UnrecognizedCommand = class extends Error { }

    constructor(file: unknown, model: { lora_cfg_endpoint: TSchema, lora_cfg_relay: TSchema, serialize(arg: lora_cfg_endpoint_t | lora_cfg_relay_t): Uint8Array, deserialize(arg: Uint8Array): lora_cfg_endpoint_t | lora_cfg_relay_t }, mode: 'local' | 'ota' = 'local') {
        this.file = file;
        this.model = model;
        this.mode = mode;
    }

    get config() {
        //If not defined get it from the device
        return this.#config
    }

    // biome-ignore lint/suspicious/noExplicitAny: Validation will be performed downstream
    set config(opts: any) { this.#config = Value.Default(opts.mode === "relay" ? this.model.lora_cfg_relay : this.model.lora_cfg_endpoint, opts) as lora_cfg_endpoint_t | lora_cfg_relay_t }

    /**
     * send C0/C2 BASE LENGHT DATA
     * recv C1 BASE LENGTH DATA
     * @param base 
     * @param data 
     * @param temporary 
     */
    write_registers(base: number, data: Uint8Array, temporary = false) { }

    /**
     * send C1 BASE LENGTH
     * recv C1 BASE LENGTH DATA
     * @param base 
     */
    read_registers(base: number): Uint8Array { }


    /**
     * Request device information (read-only registers)
     */
    get_pid() { const payload = new Uint8Array([0xC1, 0x80, 0x6]) }

    /**
     * Set a specific crypto key (write-only registers)
     * @param key crypto key selected
     * @returns the command to send.
     */
    set_crypto(key: number) {
        const tmp = new Uint8Array(3 + 2)
        tmp[0] = 0xC0
        tmp[1] = 0x00
        tmp[2] = 0x08
        tmp[3] = key & 0xff00
        tmp[4] = key & 0x00ff

    }

    /**
     * Switch operating mode of the modem (transmission/configuration).
     * It only works if `enable_mode_switch` is set to true
     */
    switch_modem_mode(mode: 'transmission' | 'configuration') {
        const tmp = new Uint8Array([0xC0, 0xC1, 0xC2, 0xC3, 0x02, mode === 'transmission' ? 0 : 1])
    }
}
