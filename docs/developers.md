## Getting started

You can start by cloning this repo and installing all the relevant dependencies.

```sh
git clone https://github.com/KaruroChori/ebyte-lora-ts
cd ebyte-lora-ts
bun install
```

The master branch is used to store the mainline in-dev version. Stable releases are defined by tags.
As for versioning, the last number for any public release is odd. Even numbers are used internally during development only. For example `v0.1.6` is the in-dev version for `v0.1.7`.  
Breaking changes are generally performed on major releases only **after** major 1. For `v0.x.x` every version might be breaking compatibility with the previous one.

## Examples

You can find several examples on how to use this library in `./examples`. If you want to add more, you are welcome.  
However, examples requiring additional dependencies will not be accepted unless a separate local `package.json` file is provided.

## Linting

[Biome](https://biomejs.dev/linter/) is used as linter. A configuration file is provided in the root directory, and your editor is expected to run it _on save_.  
At the very least, make sure to run it before a commit to master or PR is done.
