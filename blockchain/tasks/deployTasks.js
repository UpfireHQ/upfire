require('@nomiclabs/hardhat-web3');
const fs = require('fs');
const path = require('path');

task('deploy', 'Deploys the dapp').setAction(async () => {
  const deployResults = {};

  console.info('Deploying UPR token...');
  const UPR = await hre.ethers.getContractFactory('UPR');
  const upr = await UPR.deploy();
  await upr.deployed();
  deployResults.UPRToken = upr.address;
  console.info(`UPR token deployed at ${upr.address}`);

  console.info('Deploying UFR token...');
  const UFR = await hre.ethers.getContractFactory('UFR');
  const ufr = await UFR.deploy();
  await ufr.deployed();
  deployResults.UFRToken = ufr.address;
  console.info(`UFR token deployed at ${ufr.address}`);

  console.info('Deploying store...');
  const UpfireStore = await hre.ethers.getContractFactory('UpfireStore');
  const upfireStore = await UpfireStore.deploy();
  await upfireStore.deployed();
  deployResults.UpfireStore = upfireStore.address;
  console.info(`Store deployed at ${upfireStore.address}`);

  console.info('Deploying staking...');
  const UpfireStaking = await hre.ethers.getContractFactory('UpfireStaking');
  const upfireStaking = await UpfireStaking.deploy();
  await upfireStaking.deployed();
  deployResults.UpfireStaking = upfireStaking.address;
  console.info(`Staking deployed at ${upfireStaking.address}`);

  console.info('Deploying dapp...');
  const Upfiring = await hre.ethers.getContractFactory('Upfiring');
  const upfiring = await Upfiring.deploy(
    upfireStore.address,
    upfireStaking.address,
    0,
    50,
    3,
    0
  );
  await upfiring.deployed();

  deployResults.Upfiring = upfiring.address;
  console.info(`Upfiring deployed at ${upfiring.address}`);

  const UpfiringSwap = await hre.ethers.getContractFactory('UPRSwap');
  const upfiringSwap = await UpfiringSwap.deploy(ufr.address, upr.address);
  await upfiringSwap.deployed();
  deployResults.UpfiringSwap = upfiringSwap.address;
  console.info(`UpfiringSwap deployed at ${upfiringSwap.address}`);

  await upr.addAdmin(upfiringSwap.address);
  await upfireStore.transferOwnership(upfiring.address);

  const resultPath = path.join(
    __dirname,
    `./../constants/${hre.network.name}.json`
  );
  fs.writeFileSync(resultPath, JSON.stringify(deployResults, null, 2));

  console.log(JSON.stringify(deployResults, null, 2));
});
