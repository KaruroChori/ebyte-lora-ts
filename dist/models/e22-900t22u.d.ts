import { type Static } from "@sinclair/typebox";
/**
 * Special address for broadcast
 */
export declare const BROADCAST = 65535;
/**
 * Schema for a lora modem set as endpoint node.
 */
export declare const endpoint: import("@sinclair/typebox").TObject<{
    type: import("@sinclair/typebox").TLiteral<"e22-900t22u">;
    mode: import("@sinclair/typebox").TLiteral<"endpoint">;
    address: import("@sinclair/typebox").TInteger;
    network: import("@sinclair/typebox").TInteger;
    radio: import("@sinclair/typebox").TObject<{
        air_rate: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<2400>, import("@sinclair/typebox").TLiteral<4800>, import("@sinclair/typebox").TLiteral<9600>, import("@sinclair/typebox").TLiteral<19200>, import("@sinclair/typebox").TLiteral<38400>, import("@sinclair/typebox").TLiteral<62500>]>;
        channel: import("@sinclair/typebox").TInteger;
        tx_power: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<22>, import("@sinclair/typebox").TLiteral<17>, import("@sinclair/typebox").TLiteral<13>, import("@sinclair/typebox").TLiteral<10>]>;
    }>;
    serial: import("@sinclair/typebox").TObject<{
        baud_rate: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<1200>, import("@sinclair/typebox").TLiteral<2400>, import("@sinclair/typebox").TLiteral<4800>, import("@sinclair/typebox").TLiteral<9600>, import("@sinclair/typebox").TLiteral<19200>, import("@sinclair/typebox").TLiteral<38400>, import("@sinclair/typebox").TLiteral<57600>, import("@sinclair/typebox").TLiteral<115200>]>;
        mode: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"8N1">, import("@sinclair/typebox").TLiteral<"8O1">, import("@sinclair/typebox").TLiteral<"8E1">]>;
        enable_RSSI_cmds: import("@sinclair/typebox").TBoolean;
        enable_mode_switch: import("@sinclair/typebox").TBoolean;
    }>;
    transport: import("@sinclair/typebox").TObject<{
        enable_RSSI: import("@sinclair/typebox").TBoolean;
        fixed: import("@sinclair/typebox").TBoolean;
        enable_LBT: import("@sinclair/typebox").TBoolean;
        frame_size: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<240>, import("@sinclair/typebox").TLiteral<128>, import("@sinclair/typebox").TLiteral<64>, import("@sinclair/typebox").TLiteral<32>]>;
    }>;
}>;
/**
 * Schema for a lora modem set as relay node.
 */
export declare const relay: import("@sinclair/typebox").TObject<{
    type: import("@sinclair/typebox").TLiteral<"e22-900t22u">;
    mode: import("@sinclair/typebox").TLiteral<"relay">;
    src_network: import("@sinclair/typebox").TInteger;
    dst_network: import("@sinclair/typebox").TInteger;
    radio: import("@sinclair/typebox").TObject<{
        air_rate: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<2400>, import("@sinclair/typebox").TLiteral<4800>, import("@sinclair/typebox").TLiteral<9600>, import("@sinclair/typebox").TLiteral<19200>, import("@sinclair/typebox").TLiteral<38400>, import("@sinclair/typebox").TLiteral<62500>]>;
        channel: import("@sinclair/typebox").TInteger;
        tx_power: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<22>, import("@sinclair/typebox").TLiteral<17>, import("@sinclair/typebox").TLiteral<13>, import("@sinclair/typebox").TLiteral<10>]>;
    }>;
    serial: import("@sinclair/typebox").TObject<{
        baud_rate: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<1200>, import("@sinclair/typebox").TLiteral<2400>, import("@sinclair/typebox").TLiteral<4800>, import("@sinclair/typebox").TLiteral<9600>, import("@sinclair/typebox").TLiteral<19200>, import("@sinclair/typebox").TLiteral<38400>, import("@sinclair/typebox").TLiteral<57600>, import("@sinclair/typebox").TLiteral<115200>]>;
        mode: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"8N1">, import("@sinclair/typebox").TLiteral<"8O1">, import("@sinclair/typebox").TLiteral<"8E1">]>;
        enable_RSSI_cmds: import("@sinclair/typebox").TBoolean;
        enable_mode_switch: import("@sinclair/typebox").TBoolean;
    }>;
    transport: import("@sinclair/typebox").TObject<{
        enable_RSSI: import("@sinclair/typebox").TBoolean;
        fixed: import("@sinclair/typebox").TBoolean;
        enable_LBT: import("@sinclair/typebox").TBoolean;
        frame_size: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<240>, import("@sinclair/typebox").TLiteral<128>, import("@sinclair/typebox").TLiteral<64>, import("@sinclair/typebox").TLiteral<32>]>;
    }>;
}>;
export declare const lora_cfg: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TObject<{
    type: import("@sinclair/typebox").TLiteral<"e22-900t22u">;
    mode: import("@sinclair/typebox").TLiteral<"endpoint">;
    address: import("@sinclair/typebox").TInteger;
    network: import("@sinclair/typebox").TInteger;
    radio: import("@sinclair/typebox").TObject<{
        air_rate: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<2400>, import("@sinclair/typebox").TLiteral<4800>, import("@sinclair/typebox").TLiteral<9600>, import("@sinclair/typebox").TLiteral<19200>, import("@sinclair/typebox").TLiteral<38400>, import("@sinclair/typebox").TLiteral<62500>]>;
        channel: import("@sinclair/typebox").TInteger;
        tx_power: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<22>, import("@sinclair/typebox").TLiteral<17>, import("@sinclair/typebox").TLiteral<13>, import("@sinclair/typebox").TLiteral<10>]>;
    }>;
    serial: import("@sinclair/typebox").TObject<{
        baud_rate: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<1200>, import("@sinclair/typebox").TLiteral<2400>, import("@sinclair/typebox").TLiteral<4800>, import("@sinclair/typebox").TLiteral<9600>, import("@sinclair/typebox").TLiteral<19200>, import("@sinclair/typebox").TLiteral<38400>, import("@sinclair/typebox").TLiteral<57600>, import("@sinclair/typebox").TLiteral<115200>]>;
        mode: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"8N1">, import("@sinclair/typebox").TLiteral<"8O1">, import("@sinclair/typebox").TLiteral<"8E1">]>;
        enable_RSSI_cmds: import("@sinclair/typebox").TBoolean;
        enable_mode_switch: import("@sinclair/typebox").TBoolean;
    }>;
    transport: import("@sinclair/typebox").TObject<{
        enable_RSSI: import("@sinclair/typebox").TBoolean;
        fixed: import("@sinclair/typebox").TBoolean;
        enable_LBT: import("@sinclair/typebox").TBoolean;
        frame_size: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<240>, import("@sinclair/typebox").TLiteral<128>, import("@sinclair/typebox").TLiteral<64>, import("@sinclair/typebox").TLiteral<32>]>;
    }>;
}>, import("@sinclair/typebox").TObject<{
    type: import("@sinclair/typebox").TLiteral<"e22-900t22u">;
    mode: import("@sinclair/typebox").TLiteral<"relay">;
    src_network: import("@sinclair/typebox").TInteger;
    dst_network: import("@sinclair/typebox").TInteger;
    radio: import("@sinclair/typebox").TObject<{
        air_rate: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<2400>, import("@sinclair/typebox").TLiteral<4800>, import("@sinclair/typebox").TLiteral<9600>, import("@sinclair/typebox").TLiteral<19200>, import("@sinclair/typebox").TLiteral<38400>, import("@sinclair/typebox").TLiteral<62500>]>;
        channel: import("@sinclair/typebox").TInteger;
        tx_power: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<22>, import("@sinclair/typebox").TLiteral<17>, import("@sinclair/typebox").TLiteral<13>, import("@sinclair/typebox").TLiteral<10>]>;
    }>;
    serial: import("@sinclair/typebox").TObject<{
        baud_rate: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<1200>, import("@sinclair/typebox").TLiteral<2400>, import("@sinclair/typebox").TLiteral<4800>, import("@sinclair/typebox").TLiteral<9600>, import("@sinclair/typebox").TLiteral<19200>, import("@sinclair/typebox").TLiteral<38400>, import("@sinclair/typebox").TLiteral<57600>, import("@sinclair/typebox").TLiteral<115200>]>;
        mode: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"8N1">, import("@sinclair/typebox").TLiteral<"8O1">, import("@sinclair/typebox").TLiteral<"8E1">]>;
        enable_RSSI_cmds: import("@sinclair/typebox").TBoolean;
        enable_mode_switch: import("@sinclair/typebox").TBoolean;
    }>;
    transport: import("@sinclair/typebox").TObject<{
        enable_RSSI: import("@sinclair/typebox").TBoolean;
        fixed: import("@sinclair/typebox").TBoolean;
        enable_LBT: import("@sinclair/typebox").TBoolean;
        frame_size: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<240>, import("@sinclair/typebox").TLiteral<128>, import("@sinclair/typebox").TLiteral<64>, import("@sinclair/typebox").TLiteral<32>]>;
    }>;
}>]>;
export type lora_cfg_t = Static<typeof lora_cfg>;
export type endpoint_t = Static<typeof endpoint>;
export type relay_t = Static<typeof relay>;
export declare const model: {
    endpoint: import("@sinclair/typebox").TObject<{
        type: import("@sinclair/typebox").TLiteral<"e22-900t22u">;
        mode: import("@sinclair/typebox").TLiteral<"endpoint">;
        address: import("@sinclair/typebox").TInteger;
        network: import("@sinclair/typebox").TInteger;
        radio: import("@sinclair/typebox").TObject<{
            air_rate: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<2400>, import("@sinclair/typebox").TLiteral<4800>, import("@sinclair/typebox").TLiteral<9600>, import("@sinclair/typebox").TLiteral<19200>, import("@sinclair/typebox").TLiteral<38400>, import("@sinclair/typebox").TLiteral<62500>]>;
            channel: import("@sinclair/typebox").TInteger;
            tx_power: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<22>, import("@sinclair/typebox").TLiteral<17>, import("@sinclair/typebox").TLiteral<13>, import("@sinclair/typebox").TLiteral<10>]>;
        }>;
        serial: import("@sinclair/typebox").TObject<{
            baud_rate: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<1200>, import("@sinclair/typebox").TLiteral<2400>, import("@sinclair/typebox").TLiteral<4800>, import("@sinclair/typebox").TLiteral<9600>, import("@sinclair/typebox").TLiteral<19200>, import("@sinclair/typebox").TLiteral<38400>, import("@sinclair/typebox").TLiteral<57600>, import("@sinclair/typebox").TLiteral<115200>]>;
            mode: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"8N1">, import("@sinclair/typebox").TLiteral<"8O1">, import("@sinclair/typebox").TLiteral<"8E1">]>;
            enable_RSSI_cmds: import("@sinclair/typebox").TBoolean;
            enable_mode_switch: import("@sinclair/typebox").TBoolean;
        }>;
        transport: import("@sinclair/typebox").TObject<{
            enable_RSSI: import("@sinclair/typebox").TBoolean;
            fixed: import("@sinclair/typebox").TBoolean;
            enable_LBT: import("@sinclair/typebox").TBoolean;
            frame_size: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<240>, import("@sinclair/typebox").TLiteral<128>, import("@sinclair/typebox").TLiteral<64>, import("@sinclair/typebox").TLiteral<32>]>;
        }>;
    }>;
    relay: import("@sinclair/typebox").TObject<{
        type: import("@sinclair/typebox").TLiteral<"e22-900t22u">;
        mode: import("@sinclair/typebox").TLiteral<"relay">;
        src_network: import("@sinclair/typebox").TInteger;
        dst_network: import("@sinclair/typebox").TInteger;
        radio: import("@sinclair/typebox").TObject<{
            air_rate: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<2400>, import("@sinclair/typebox").TLiteral<4800>, import("@sinclair/typebox").TLiteral<9600>, import("@sinclair/typebox").TLiteral<19200>, import("@sinclair/typebox").TLiteral<38400>, import("@sinclair/typebox").TLiteral<62500>]>;
            channel: import("@sinclair/typebox").TInteger;
            tx_power: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<22>, import("@sinclair/typebox").TLiteral<17>, import("@sinclair/typebox").TLiteral<13>, import("@sinclair/typebox").TLiteral<10>]>;
        }>;
        serial: import("@sinclair/typebox").TObject<{
            baud_rate: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<1200>, import("@sinclair/typebox").TLiteral<2400>, import("@sinclair/typebox").TLiteral<4800>, import("@sinclair/typebox").TLiteral<9600>, import("@sinclair/typebox").TLiteral<19200>, import("@sinclair/typebox").TLiteral<38400>, import("@sinclair/typebox").TLiteral<57600>, import("@sinclair/typebox").TLiteral<115200>]>;
            mode: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"8N1">, import("@sinclair/typebox").TLiteral<"8O1">, import("@sinclair/typebox").TLiteral<"8E1">]>;
            enable_RSSI_cmds: import("@sinclair/typebox").TBoolean;
            enable_mode_switch: import("@sinclair/typebox").TBoolean;
        }>;
        transport: import("@sinclair/typebox").TObject<{
            enable_RSSI: import("@sinclair/typebox").TBoolean;
            fixed: import("@sinclair/typebox").TBoolean;
            enable_LBT: import("@sinclair/typebox").TBoolean;
            frame_size: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<240>, import("@sinclair/typebox").TLiteral<128>, import("@sinclair/typebox").TLiteral<64>, import("@sinclair/typebox").TLiteral<32>]>;
        }>;
    }>;
    /**
     * Serialize the configuration.
     * While the original specs allows to update each register on its own, here it is assumed to be in one step.
     * @param cfg a validated configuration json
     * @param temporary true if writing on temporary registers
     * @returns an array to send via serial
     */
    serialize_cfg(cfg: lora_cfg_t): Uint8Array;
    /**
     * De-serialize a byte array into a configuration json.
     * While the original specs would allow to read registers in chunks, here it is assumed to be in one operation.
     * @param array the returned array of bytes
     * @param skip_sig_check ignore checks on the return header (used for internal tests only)
     * @returns the de-serialized json
     */
    deserialize_cfg(array: Uint8Array): lora_cfg_t;
};
