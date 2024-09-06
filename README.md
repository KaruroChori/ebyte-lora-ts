# ebyte-lora-ts

> [!CAUTION]
> Very much WIP and not documented. For reference, the [official documentation](https://www.cdebyte.com/products/E22-900T22U).  
> So far only the `ebyte e22-900t22u` is supported, but other models can be easily added with minimal changes.  
> It has been tested on hardware, but coverage is not full.

This library provides some utility framework to configure and operate lora devices from **ebyte** via typescript.  
The design goal of this library is to be platform-agnostic, so you might use it write a [webapp](https://developer.mozilla.org/en-US/docs/Web/API/SerialPort) or some portable CLI tool to replace the official one which is only available for windows.  
This library is only handling the packet building & validation from/to json config files, you will have to provide `read` and `write` functions to support your serial device.

## Compatibility

- Node via `@serialport/bindings-cpp`, targetting most operating systems and architectures.
- Bun at the moment is not compatible with that node library, and I was not able to find any alternative for now.
- [QuickJS](https://github.com/quickjs-ng/quickjs) should work fine as long as you bring your own read/write.
- [Txiki](https://github.com/saghul/txiki.js) as well. I wrote a [serial module](https://github.com/KaruroChori/serial-txiki-module) a while back, this is expected to work.

## Upcoming features

They are described in [here](./TODO.md).
