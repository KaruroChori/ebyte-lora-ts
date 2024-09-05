# serial-e22-lora

> [!CAUTION]
> Very much WIP and not documented. For reference, the [official documentation](https://www.cdebyte.com/products/E22-900T22U).
> So far only the `ebyte e22-900t22u` is supported, but other models only require minimal changes.
> It has not been tested yet on hardware. I just checked that serialization and de-serialization of configs are reversible in simple cases.

Library to configure and use lora devices like the `ebyte e22-900t22u` via typescript.  
Be it to configure and use them from a [browser](https://developer.mozilla.org/en-US/docs/Web/API/SerialPort), or to implement a shell utility & replace the official one only available for windows.  
This library is only handling the packet building & validation from/to json config files. This way it is kept fully portable for whatever runtime you might want to use.

An equivalent native implementation is also planned, but it has low priority.
