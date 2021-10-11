/* eslint-disable no-unused-expressions */
/* global beforeEach, describe, it, ethers */
const { expect, assert } = require('chai');

const TORRENT_HASH = 'YDRDIYTDTFKKUDFYTDITOUYGUYFUYFYTDURDTSYRESUTRER';

describe('Upfiring', () => {
  let store;
  let upfiring;

  it('deploy Upfiring', async () => {
    const UpfireStore = await ethers.getContractFactory('UpfireStore');
    store = await UpfireStore.deploy();
    await store.initialize();

    const Upfiring = await ethers.getContractFactory('Upfiring');
    upfiring = await Upfiring.deploy();
    await upfiring.initialize(store.address, 50, 3, 0);

    expect(await store.transferOwnership(upfiring.address)).not.to.throw;
  });

  it('check owner', async () => {
    expect(await upfiring.owner()).not.to.throw;
  });

  it('refill', async () => {
    const [,other] = await ethers.getSigners();
    expect(await upfiring.connect(other).refill({ value: 10000000 })).not.to.throw;
    expect(await upfiring.balanceOf(other.address)).to.equal(10000000);
  });

  it('withdraw if enough', async () => {
    const [,other] = await ethers.getSigners();
    await upfiring.connect(other).withdraw(2000000);

    expect(await upfiring.balanceOf(other.address)).to.equal(8000000);
  });

  it('withdraw if not enough', async () => {
    try {
      const [,other] = await ethers.getSigners();
      await upfiring.connect(other).withdraw(20000000);
      assert.fail('Expected revert not received');
    } catch (error) {
      const revertFound = error.message.search('revert') >= 0;
      assert(revertFound, `Expected "revert", got ${error} instead`);
    }
  });
});

describe('Upfiring Pay', () => {
  let upfiring;
  let store;
  let uprToken;

  beforeEach(async () => {
    const UpfireStore = await ethers.getContractFactory('UpfireStore');
    store = await UpfireStore.deploy();
    await store.initialize();

    // const UpfireStaking = await ethers.getContractFactory('UpfireStaking');
    // staking = await UpfireStaking.deploy();
    // expect(await staking.deployed()).not.to.throw;

    const UPRToken = await ethers.getContractFactory('UPR');
    uprToken = await UPRToken.deploy();
    await uprToken.deployed();

    const Upfiring = await ethers.getContractFactory('Upfiring');
    upfiring = await Upfiring.deploy();
    await upfiring.initialize(store.address, 50, 3, 0);

    expect(await store.transferOwnership(upfiring.address)).not.to.throw;
    expect(await uprToken.approve(upfiring.address, 10000000)).not.to.throw;
    expect(await upfiring.refill({ value: 10000000 })).not.to.throw;
  });

  it('when owner && seeders && free seeders', async () => {
    const [owner, recipient, address1, address2] = await ethers.getSigners();
    await upfiring.pay(
      TORRENT_HASH,
      85000,
      recipient.address,
      [address1.address],
      [address2.address],
    );

    expect(await upfiring.check(TORRENT_HASH, owner.address)).to.equal(85000);

    const balanceRecipient = await upfiring.balanceOf(recipient.address);
    expect(balanceRecipient).to.equal(42500);

    const balanceAddress1 = await upfiring.balanceOf(address1.address);
    expect(balanceAddress1).to.equal(31875);

    const balanceAddress2 = await upfiring.balanceOf(address2.address);
    expect(balanceAddress2).to.equal(10625);

    expect(await upfiring.totalReceivingOf(recipient.address)).to.equal(42500);
    expect(await upfiring.totalReceivingOf(address1.address)).to.equal(31875);
    expect(await upfiring.totalReceivingOf(address2.address)).to.equal(10625);

    expect(await upfiring.totalSpendingOf(owner.address)).to.equal(85000);
  });

  it('when owner && seeders', async () => {
    const [
      owner,
      recipient,
      ,
      ,
      address3
    ] = await ethers.getSigners();

    await upfiring.pay(
      TORRENT_HASH,
      102,
      recipient.address,
      [address3.address],
      []
    );

    expect(await upfiring.check(TORRENT_HASH, owner.address)).to.equal(102);
    expect(await upfiring.balanceOf(recipient.address)).to.equal(51);
    expect(await upfiring.balanceOf(address3.address)).to.equal(51);
  });

  it('when owner && free seeders', async () => {
    const [
      owner,
      recipient,
      ,
      ,
      address3
    ] = await ethers.getSigners();
    await upfiring.pay(
      TORRENT_HASH,
      102,
      recipient.address,
      [],
      [address3.address]
    );

    expect(await upfiring.check(TORRENT_HASH, owner.address)).to.equal(102);
    expect(await upfiring.balanceOf(recipient.address)).to.equal(51);
    expect(await upfiring.balanceOf(address3.address)).to.equal(51);
  });

  it('when only owner', async () => {
    const [owner, recipient] = await ethers.getSigners();

    await upfiring.pay(TORRENT_HASH, 50, recipient.address, [], []);

    expect(await upfiring.check(TORRENT_HASH, owner.address)).to.equal(50);
    expect(await upfiring.balanceOf(recipient.address)).to.equal(50);
  });

  it('setAvailablePaymentTime', async () => {
    await upfiring.setAvailablePaymentTime(2);
    expect(await upfiring.availablePaymentTime()).to.equal(2);

    await upfiring.setAvailablePaymentTime(10);
    expect(await upfiring.availablePaymentTime()).to.equal(10);
  });

  it('setSeedersProfitMargin', async () => {
    await upfiring.setSeedersProfitMargin(2);
    expect(await upfiring.seedersProfitMargin()).to.equal(2);
  });

  it('setTorrentOwnerPercent', async () => {
    await upfiring.setTorrentOwnerPercent(10);
    expect(await upfiring.torrentOwnerPercent()).to.equal(10);
  });

  it('check payment available time = 0', async () => {
    const [owner, recipient] = await ethers.getSigners();
    await upfiring.setAvailablePaymentTime(0);

    await upfiring.pay(TORRENT_HASH, 50, recipient.address, [], []);

    expect(await upfiring.check(TORRENT_HASH, owner.address)).to.equal(0);
    expect(await upfiring.balanceOf(recipient.address)).to.equal(50);
  });
});
