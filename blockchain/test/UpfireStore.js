const { expect } = require("chai");

const availableTime = 86400;

describe('UpfireStore', function () {
  let upfireStore;
  let recipient;

  it('should be deploy UpfireStore', async function () {
    const [owner, addr1] = await ethers.getSigners();
    recipient = addr1.address;

    const UpfireStore = await ethers.getContractFactory("UpfireStore");
    upfireStore = await UpfireStore.deploy();

    expect(() => upfireStore.deployed()).not.to.throw;
    expect(() => upfireStore.transferOwnership(owner.address)).not.to.throw;
  });

  it('make payment and check', async function () {
    const hash = '0x0000000000000000000000000000000000000000000000000000000000000001';

    await upfireStore.payment(hash, recipient, 100);
    expect(await upfireStore.check(hash, recipient, availableTime)).to.equal(100);
  });

  it('add balance', async function () {
    await upfireStore.addBalance(recipient, 100);
    expect(await upfireStore.balanceOf(recipient)).to.equal(100);
  });

  it('sub balance', async function () {
    await upfireStore.subBalance(recipient, 50);
    expect(await upfireStore.balanceOf(recipient)).to.equal(50);
  });

  it('sub over balance', async function () {
    expect(() => upfireStore.subBalance(recipient, 500)).throw;
  });
});

