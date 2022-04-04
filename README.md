# Upfire

Upfire is the first-ever decentralized P2P file-sharing platform. Our project is open source and anyone can contribute to development.

## Purpose

The main goal of this decentralized application is to enable users to directly exchange their files for cryptocurrency. This empowers users to set their own prices for their content and removes the middleman.

## How to contribute?

1. Fork the repository. 
2. Do your changes and create a pull request.
3. When the pull request is merged into the main branch, the dapp will be built on Github.
4. Find the builds [here](https://github.com/UpfireHQ/upfire/actions).

## How to run the app in dev mode? 

1. Clone the repository.
2. Install dependencies via `yarn`.
3. Start the renderer thread in another terminal session via `yarn start-renderer-dev`.   
4. Start the main thread in one terminal session via `yarn start-main-dev`.

## Staking Contract

1. To deploy the staking contract switch to the `blockchain` directory with `cd blockchain`. 
2. Now install dependencies with `npm install`.
3. If you want to deploy staking to BSC testnet you need a private key for a wallet with BNB balance. Store the private key in a `BSC_PRIVATE_KEY` env variable.
4. Run `npx hardhat deployStaking --network bsctest` and the staking contract will be deployed to testnet.

How does the contract work? The test case `blockchain/test/UpfireStaking.js` shows how to interact.
