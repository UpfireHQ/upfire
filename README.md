# Upfire

Upfire is the first-ever decentralized P2P file-sharing platform. Our project is now open source, and anyone can contribute to development.

## Purpose

The main goal of this decentralized application is to enable users to directly exchange their files for cryptocurrency. This empowers users to set their own prices for their content and removes the middleman.

## Features

- Change currency UFR to ETH ✅
- Create ERC-20 UPR (able config minter) ✅
- Swapping contract UFR to UPR (able to config ratio) ✅
- Staking UPR contract to get fees (able to config percentage by minter) ✅

![main page](.github/assets/main-page.png)

![wallet page](.github/assets/wallet-page.png)

## Configuration

### Initial Minter

we can config initialize address to minter from deploy Smart Contract on this variable `minters` on this file `blockchain/scripts/deploy.js`

```js
const minters = ['address1', "address2", ...];
```

### Smart Contract Address

if you deploy Smart Contract via script it will create constant address into the folder `app/constants/blockchain-config/` automatically or you can update by yourself

**NOTE:** about ABI (file.json) after compiled Smart Contract we need to update into this folder `app/block/contracts` by hand

### Public Application

**NOTE:** you need to change application information and distribution on the file `package.json` such as

```js
...
"publish": {
  "provider": "",
  "owner": "",
  "repo": "",
  "token": "",
  "releaseType": ""
},
```
