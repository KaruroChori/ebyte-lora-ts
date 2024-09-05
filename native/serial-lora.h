
#include <cstdint>

//For 900T and 400T
enum class air_rate_t {
    //bps_2400 = 0
    //bps_2400
    bps_2400 = 2,
    bps_4800,
    bps_9600,
    bps_19200,
    bps_38400,
    bps_62500
};

enum class serial_t {
    p_8n1 = 0,
    p_8o1,
    p_8e1,
    //p_8n1
};

enum class bps_t {
    bps_1200,
    bps_2400,
    bps_4800,
    bps_9600,
    bps_19200,
    bps_38400,
    bps_57600,
    bps_115200
};

enum class power_t {
    dBm_22,
    dBm_17,
    dBm_13,
    dBm_10
};

enum class enabled_t{
    DISABLED,
    ENABLED
};

enum class frame_size_t{
    b_240,
    b_128,
    b_64,
    b_32
};

#pragma pack(1)
struct config{
    union{
        uint16_t            address;
        //Only for relay mode.
        struct{
            uint8_t         src_network;
            uint8_t         dst_network;
        };
    };
    //Not used in relay mode.
    uint8_t network;
    union{
        uint8_t reg0;
        struct{
            air_rate_t      radio_air_rate: 3;
            serial_t        serial_cfg: 2;
            bps_t           serial_bps: 3;
        };
    };
    union{
        uint8_t reg1;
        struct{
            power_t         radio_tx_power: 2;
            enabled_t       enable_cfg: 1;
            uint8_t         res0: 2;
            enabled_t       enable_cfg_RSSI: 1;
            frame_size_t    radio_frame_size: 2;
        };
    };
    union{
        uint8_t reg2;
        uint8_t             radio_channel;
    };
    union{
        uint8_t reg3;
        struct{
            uint8_t         res1: 4;
            enabled_t       radio_LBT: 1;
            enabled_t       mode_relay: 1;
            uint8_t         mode_fixed: 1;
            enabled_t       mode_RSSI:1;
        };
    };
};

//Device intened to run in mode_relay:disabled
class endpoint{
    config cfg;
    uint16_t crypto;
    uint8_t pid[6];

    static config make_cfg(uint16_t address, uint8_t network, uint8_t channel, air_rate_t air_rate){
        config cfg;
        return cfg;
    }

    endpoint(const char* device, const config& config, uint16_t crypto = 0, bool in_transmission_mode = false){}
};

//Device intended to run in mode_relay:enabled 
class router{
    config cfg;
    uint16_t crypto;
    uint8_t pid[6];

    static config make_cfg(uint8_t src_network, uint8_t dst_network, uint8_t channel, air_rate_t air_rate){
        config cfg;
        return cfg;
    }

    router(const char* device, const config& config, bool in_transmission_mode = false){}
};

//Set crypt
//Read PID