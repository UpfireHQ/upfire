/* global task,hre */
require('@nomiclabs/hardhat-web3');

task('deployApp', 'Deploys the dapp').setAction(async () => {
  const deployResults = {};

  console.info('Deploying store...');
  const UpfireStore = await hre.ethers.getContractFactory('UpfireStore');
  const upfireStore = await hre.upgrades.deployProxy(UpfireStore, []);
  deployResults.UpfireStore = upfireStore.address;
  console.info(`Store deployed at ${upfireStore.address}`);

  console.info('Deploying dapp...');
  const Upfiring = await hre.ethers.getContractFactory('Upfiring');
  const upfiring = await hre.upgrades.deployProxy(Upfiring, [
    upfireStore.address,
    50,
    3,
    0
  ]);

  deployResults.Upfiring = upfiring.address;
  console.info(`Upfiring deployed at ${upfiring.address}`);

  console.log(JSON.stringify(deployResults, null, 2));
});
