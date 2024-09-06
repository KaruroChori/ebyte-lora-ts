import { type TSchema } from "@sinclair/typebox";
type RecursivePartial<T> = {
    [P in keyof T]?: RecursivePartial<T[P]>;
};
type model_t<endpoint_t, relay_t> = {
    endpoint: TSchema;
    relay: TSchema;
    serialize_cfg(arg: endpoint_t | relay_t): Uint8Array;
    deserialize_cfg(arg: Uint8Array): endpoint_t | relay_t;
};
type file_t = {
    write: (data: Uint8Array) => Promise<void>;
    read: () => Promise<{
        value: Uint8Array;
        done: boolean;
    }>;
};
export declare class lora_node<endpoint_t extends {
    mode: 'endpoint';
}, relay_t extends {
    mode: 'relay';
}> {
    private model;
    private file;
    private mode;
    static UnrecognizedCommand: {
        new (message?: string): {
            name: string;
            message: string;
            stack?: string;
            cause?: unknown;
        };
        new (message?: string, options?: ErrorOptions): {
            name: string;
            message: string;
            stack?: string;
            cause?: unknown;
        };
        captureStackTrace(targetObject: object, constructorOpt?: Function): void;
        captureStackTrace(targetObject: object, constructorOpt?: Function): void;
        prepareStackTrace?: ((err: Error, stackTraces: NodeJS.CallSite[]) => any) | undefined;
        stackTraceLimit: number;
    };
    static ConfigValidationFailed: {
        new (message?: string): {
            name: string;
            message: string;
            stack?: string;
            cause?: unknown;
        };
        new (message?: string, options?: ErrorOptions): {
            name: string;
            message: string;
            stack?: string;
            cause?: unknown;
        };
        captureStackTrace(targetObject: object, constructorOpt?: Function): void;
        captureStackTrace(targetObject: object, constructorOpt?: Function): void;
        prepareStackTrace?: ((err: Error, stackTraces: NodeJS.CallSite[]) => any) | undefined;
        stackTraceLimit: number;
    };
    constructor(file: file_t, model: model_t<endpoint_t, relay_t>, mode?: 'local' | 'ota');
    write_cfg(opts: RecursivePartial<endpoint_t | relay_t>): Promise<void>;
    read_cfg(): Promise<void>;
    /**
     * send C0/C2 BASE LENGHT DATA
     * recv C1 BASE LENGTH DATA
     * @param base
     * @param data
     * @param temporary
     */
    write_registers(base: number, data: Uint8Array, temporary?: boolean): Promise<void>;
    /**
     * send C1 BASE LENGTH
     * recv C1 BASE LENGTH DATA
     * @param base
     */
    read_registers(base: number, length: number): Promise<Uint8Array>;
    /**
     * Request device information (read-only registers)
     */
    get_pid(): Promise<Uint8Array>;
    /**
     * Set a specific crypto key (write-only registers)
     */
    set_crypto(key: number): Promise<void>;
    /**
     * Switch operating mode of the modem (transmission/configuration).
     * It only works if `enable_mode_switch` is set to true
     */
    switch_modem_mode(mode: 'transmission' | 'configuration'): Promise<void>;
}
export {};
