import { lora_node } from "../client.ts"
import { model, type lora_cfg_endpoint_t, type lora_cfg_relay_t } from "../models/e22-900t22u";
import { Value } from "@sinclair/typebox/value";
//////////////


const client = new lora_node<lora_cfg_endpoint_t, lora_cfg_relay_t>({}, model)
client.config = { mode: "relay" }

/*
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
*/