import { Type as t, type Static } from "@sinclair/typebox";
import { Value } from "@sinclair/typebox/value";

/*
    Implementation specific for the e22-900t22u.
    Other models like e22-xxxt22u will require minor adaptations like
    - the channel range
    - the default channel
    - the encoding of air_rate
*/

/**
 * Special address for broadcast
 */
export const BROADCAST = 0xffff

//#region Annoying definitions to convert from enum type to integer
const air_rate_t = t.Union([t.Literal(2400), t.Literal(4800), t.Literal(9600), t.Literal(19200), t.Literal(38400), t.Literal(62500)], { default: 2400, description: 'Transmission budget in bps' })
const air_rate_s: Record<Static<typeof air_rate_t>, number> = {
    2400: 2,
    4800: 3,
    9600: 4,
    19200: 5,
    38400: 6,
    62500: 7
} as const
const air_rate_e: Record<number, Static<typeof air_rate_t>> = {
    0: 2400,
    1: 2400,
    2: 2400,
    3: 4800,
    4: 9600,
    5: 19200,
    6: 38400,
    7: 62500
} as const

const tx_power_t = t.Union([t.Literal(22), t.Literal(17), t.Literal(13), t.Literal(10)], { default: 22, description: 'dBm of power for transmission' })
const tx_power_s: Record<Static<typeof tx_power_t>, number> = {
    22: 0,
    17: 1,
    13: 2,
    10: 3,
} as const
const tx_power_e: Record<number, Static<typeof tx_power_t>> = {
    0: 22,
    1: 17,
    2: 13,
    3: 10,
} as const

const frame_size_t = t.Union([t.Literal(240), t.Literal(128), t.Literal(64), t.Literal(32)], { default: 240 })
const frame_size_s: Record<Static<typeof frame_size_t>, number> = {
    240: 0,
    128: 1,
    64: 2,
    32: 3,
} as const
const frame_size_e: Record<number, Static<typeof frame_size_t>> = {
    0: 240,
    1: 128,
    2: 64,
    3: 32,
} as const

const baud_rate_t = t.Union([t.Literal(1200), t.Literal(2400), t.Literal(4800), t.Literal(9600), t.Literal(19200), t.Literal(38400), t.Literal(57600), t.Literal(115200)], { default: 9600 })
const baud_rate_s: Record<Static<typeof baud_rate_t>, number> = {
    1200: 0,
    2400: 1,
    4800: 2,
    9600: 3,
    19200: 4,
    38400: 5,
    57600: 6,
    115200: 7
} as const

const baud_rate_e: Record<number, Static<typeof baud_rate_t>> = {
    0: 1200,
    1: 2400,
    2: 4800,
    3: 9600,
    4: 19200,
    5: 38400,
    6: 57600,
    7: 115200
} as const

const mode_t = t.Union([t.Literal('8N1'), t.Literal('8O1'), t.Literal('8E1')], { default: '8N1', description: "Serial mode as data bits, parity (none, odd, even), stop bits" })
const mode_s: Record<Static<typeof mode_t>, number> = {
    "8N1": 0,
    "8O1": 1,
    "8E1": 2,
} as const
const mode_e: Record<number, Static<typeof mode_t>> = {
    0: "8N1",
    1: "8O1",
    2: "8E1",
    3: "8N1"
} as const

//#endregion

/**
 * Schema for a lora modem set as endpoint node.
 */
export const lora_cfg_endpoint = t.Object({
    mode: t.Literal('endpoint', { default: 'endpont' }),
    address: t.Integer({ minimum: 0, maximum: 65535, default: 0 }),
    network: t.Integer({ minimum: 0, maximum: 255, default: 0 }),
    radio: t.Object({
        air_rate: air_rate_t,
        channel: t.Integer({ minimum: 0, maximum: 80, default: 0x12 }),
        tx_power: tx_power_t,
    }, { default: {}, additionalProperties: false }),
    serial: t.Object({
        baud_rate: baud_rate_t,
        mode: mode_t,
        enable_RSSI_cmds: t.Boolean({ default: false }),
        enable_mode_switch: t.Boolean({ default: false })
    }, { default: {}, additionalProperties: false }),
    transport: t.Object({
        enable_RSSI: t.Boolean({ default: false }),
        fixed: t.Boolean({ default: false }),
        enable_LBT: t.Boolean({ default: false }),
        frame_size: frame_size_t
    }, { default: {}, additionalProperties: false })
}, { additionalProperties: false })

/**
 * Schema for a lora modem set as relay node.
 */
export const lora_cfg_relay = t.Object({
    mode: t.Literal('relay', { default: 'relay' }),
    src_network: t.Integer({ minimum: 0, maximum: 255, default: 0 }),
    dst_network: t.Integer({ minimum: 0, maximum: 255, default: 0 }),
    radio: t.Object({
        air_rate: air_rate_t,
        channel: t.Integer({ minimum: 0, maximum: 80, default: 0x12 }),
        tx_power: tx_power_t,
    }, { default: {}, additionalProperties: false }),
    serial: t.Object({
        baud_rate: baud_rate_t,
        mode: mode_t,
        enable_RSSI_cmds: t.Boolean({ default: false }),
        enable_mode_switch: t.Boolean({ default: false })
    }, { default: {}, additionalProperties: false }),
    transport: t.Object({
        enable_RSSI: t.Boolean({ default: false }),
        fixed: t.Boolean({ default: true }),
        enable_LBT: t.Boolean({ default: false }),
        frame_size: frame_size_t
    }, { default: {}, additionalProperties: false })
}, { additionalProperties: false })

export const lora_cfg = t.Union([lora_cfg_endpoint, lora_cfg_relay])

export type lora_cfg_t = Static<typeof lora_cfg>



export class lora_node {
    private config: lora_cfg_t
    private file: unknown
    mode: 'local' | 'ota' = 'local' //It determines if 0xcf 0xcf is preponed

    static UnrecognizedCommand = class extends Error { }

    // biome-ignore lint/suspicious/noExplicitAny: Validation will be performed downstream
    constructor(file: unknown, opts: any = {}) { this.file = file; this.config = Value.Default(opts.mode === "relay" ? lora_cfg_relay : lora_cfg_endpoint, opts) as lora_cfg_t }

    /**
     * Serialize the configuration. 
     * While the original specs allows to update each register on its own, here it is assumed to be in one step.
     * @param cfg a validated configuration json
     * @param temporary true if writing on temporary registers
     * @returns an array to send via serial
     */
    static serialize_config(cfg: lora_cfg_t): Uint8Array {
        const tmp = new Uint8Array(7)
        if (cfg.mode === 'relay') {
            tmp[0] = cfg.src_network
            tmp[1] = cfg.dst_network
            tmp[2] = 0x00
        }
        else {
            tmp[0] = cfg.address & 0xff00
            tmp[1] = cfg.address & 0x00ff
            tmp[2] = cfg.network
        }
        tmp[3] = air_rate_s[cfg.radio.air_rate] | mode_s[cfg.serial.mode] << 3 | baud_rate_s[cfg.serial.baud_rate] << 5
        tmp[4] = tx_power_s[cfg.radio.tx_power] | (cfg.serial.enable_mode_switch ? 1 : 0) << 2 | (cfg.serial.enable_RSSI_cmds ? 1 : 0) << 5 | frame_size_s[cfg.transport.frame_size] << 6
        tmp[5] = cfg.radio.channel
        tmp[6] = (cfg.transport.enable_LBT ? 1 : 0) << 4 | (cfg.mode === 'relay' ? 1 : 0) << 5 | (cfg.transport.fixed ? 1 : 0) << 6 | (cfg.transport.enable_RSSI ? 1 : 0) << 7
        return tmp
    }

    /**
     * De-serialize a byte array into a configuration json.
     * While the original specs would allow to read registers in chunks, here it is assumed to be in one operation.
     * @param array the returned array of bytes
     * @param skip_sig_check ignore checks on the return header (used for internal tests only)
     * @returns the de-serialized json
     */
    static deserialize_config(array: Uint8Array): lora_cfg_t {
        if (array.length < 7) throw new Error("Unable to decode an arbitrary received message.")
        const cfg: lora_cfg_t = { radio: {}, serial: {}, transport: {} } as lora_cfg_t

        cfg.mode = (((array[6] >> 5) & 1) === 0) ? 'endpoint' : 'relay'
        if (cfg.mode === 'endpoint') {
            cfg.address = array[0] << 8 + array[1]
            cfg.network = array[2]
        }
        else {
            cfg.src_network = array[0]
            cfg.dst_network = array[1]
        }
        cfg.radio.air_rate = air_rate_e[array[3] & 1]
        cfg.serial.mode = mode_e[((array[3] >> 3) & 3)]
        cfg.serial.baud_rate = baud_rate_e[((array[3] >> 5) & 7)]

        cfg.radio.tx_power = tx_power_e[array[4] & 3]
        cfg.serial.enable_mode_switch = !(((array[4] >> 2) & 1) === 0)
        cfg.serial.enable_RSSI_cmds = !(((array[4] >> 5) & 1) === 0)
        cfg.transport.frame_size = frame_size_e[(array[4] >> 6) & 3]

        cfg.radio.channel = array[5]

        cfg.transport.enable_LBT = !(((array[6] >> 4) & 1) === 0)
        cfg.transport.fixed = !(((array[6] >> 6) & 1) === 0)
        cfg.transport.enable_RSSI = !(((array[6] >> 7) & 1) === 0)
        return cfg
    }

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






//////////////


function test() {
    const w = Value.Default(lora_cfg_relay, {
        mode: "relay",
        radio: { air_rate: 2400 },
        src_network: 0xaa,
        dst_network: 0xbb,
    }) as lora_cfg_t;

    console.log(w, Value.Check(lora_cfg_relay, w));
    console.log(lora_node.serialize_config(w));
    console.log(lora_node.deserialize_config(lora_node.serialize_config(w)));
    console.log(
        lora_node.serialize_config(lora_node.deserialize_config(lora_node.serialize_config(w))),
    );
}

//Stupid hacky way to run only when directly run & not as imported. It does not work when bundled.
if (this !== undefined) test()