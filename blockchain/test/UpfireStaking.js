/* eslint-disable no-unused-expressions */
/* global beforeEach, describe, it, ethers */
const { expect, assert } = require('chai');

describe.only('UpfireStaking', () => {
  let upfireStaking;
  let deployer;
  let staker;

  it('deploy UpfireStaking', async () => {
    const UPRToken = await ethers.getContractFactory("UPR");
    uprToken = await UPRToken.deploy();

    expect(await uprToken.deployed()).not.to.throw;

    const UpfireStaking = await ethers.getContractFactory('UpfireStaking');
    upfireStaking = await UpfireStaking.deploy();
    upfireStaking.initialize(uprToken.address, '10000000000000000000');

    [deployer, staker] = await ethers.getSigners();
  });

  it('should allow changing min stake amount', async () => {
    const value1 = (await upfireStaking.minStakeAmount()).toString();
    expect(value1).to.equal('10000000000000000000');
    await upfireStaking.setMinStakeAmount('20000000000000000000')
    const value2 = (await upfireStaking.minStakeAmount()).toString();
    expect(value2).to.equal('20000000000000000000');
  });

  it('should allow staking', async () => {
    await uprToken.transfer(staker.address, '20000000000000000000');

    // approve staking contract for spending
    await uprToken.connect(staker).approve(upfireStaking.address, '20000000000000000000');

    const stakingFromStaker = upfireStaking.connect(staker);

    // actually stake UPR
    await stakingFromStaker.stake('20000000000000000000');

    // check pending reward -> zero
    let pendingReward = (await stakingFromStaker.callStatic.pendingReward()).toString();
    expect(pendingReward).to.equal('0');

    // add first rewards
    await deployer.sendTransaction({
      to: stakingFromStaker.address,
      value: ethers.utils.parseEther('1.0'),
    });

    // check pending reward -> 1
    pendingReward = (await stakingFromStaker.callStatic.pendingReward()).toString();
    expect(pendingReward).to.equal(ethers.utils.parseEther('1.0'));

    // staker balance check before harvest
    const balance = await staker.provider.getBalance(staker.address);

    // harvest rewards
    await stakingFromStaker.harvest();

    // fetch new balance
    const newBalance = await staker.provider.getBalance(staker.address);

    // check if rewards really harvested
    expect(newBalance.gt(balance)).to.equal(true);

    // pending reward -> zero again
    pendingReward = (await stakingFromStaker.callStatic.pendingReward()).toString();
    expect(pendingReward).to.equal(ethers.utils.parseEther('0'));

    // more rewards
    await deployer.sendTransaction({
      to: stakingFromStaker.address,
      value: ethers.utils.parseEther('0.5'),
    });

    // upr balance of staker should be zero
    let uprBalance = await uprToken.balanceOf(staker.address);
    expect(uprBalance.toString()).to.equal('0');

    // withdraw
    await stakingFromStaker.withdraw();

    // upr should be back
    uprBalance = await uprToken.balanceOf(staker.address);
    expect(uprBalance.toString()).to.equal('20000000000000000000');

    // more rewards should be there
    const newBalance2 = await staker.provider.getBalance(staker.address);
    expect(newBalance2.gt(newBalance)).to.equal(true);
  });
});
