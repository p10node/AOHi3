# AOHi3

This is a project made to participate in a hackathon organized by Weavers starting from Wed Apr 17, 2024.

## Features

https://hackmd.io/@NYDmjrsXTLSKrPB3TDNGrQ/SkhmOcBl0

Analysis and plan for implementation by `pierreneter` at Miro: https://miro.com/app/board/uXjVKR4bbLI=/?share_link_id=265886206601

## Install

### Requirements

- `nodejs`
- `pnpm`
- [`AO`](./ao/README.md)
- `AOS`

### Install dependencies

```bash
pnpm install
```

## Deploy AO Process

[Lua contract aohi3.lua](./ao//aohi3.lua) full of features

### Top-up first

https://app.ardrive.io/

```bash
pnpm turbo:topup
```

### Build and Deploy

```bash
pnpm ao:build
pnpm ao:deploy2
```

Module ID: `mc1AGIDVYPmljVWQokKm-LJn2QP4aDDMSo-XAj5z1Qk`

https://viewblock.io/arweave/tx/mc1AGIDVYPmljVWQokKm-LJn2QP4aDDMSo-XAj5z1Qk

## Start Development

```bash
pnpm start
```

## Deploy UI to Arweave use IRys

```bash
pnpm build
pnpm deploy
```
