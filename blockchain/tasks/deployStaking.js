require('@nomiclabs/hardhat-web3');

task('deployStaking', 'Deploys the staking').setAction(async () => {
  const deployResults = {};

  console.info('Deploying staking...');
  const UpfireStaking = await hre.ethers.getContractFactory('UpfireStaking');
  const upfireStaking = await UpfireStaking.deploy();
  await upfireStaking.deployed();
  deployResults.UpfireStaking = upfireStaking.address;
  console.info(`Staking deployed at ${upfireStaking.address}`);

  console.log(JSON.stringify(deployResults, null, 2));
});
