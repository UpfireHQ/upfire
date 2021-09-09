const { expect } = require('chai');

describe('UPR Swap', async function() {
  let ufrToken;
  let uprToken;
  let uprSwap;

  it('Should be deploy token', async function() {
    const [, admin] = await ethers.getSigners();
    const UFRToken = await ethers.getContractFactory('UPR');
    ufrToken = await UFRToken.deploy();
    await ufrToken.deployed();

    const UPRToken = await ethers.getContractFactory('UPR');
    uprToken = await UPRToken.deploy();
    await uprToken.deployed();
    await uprToken.addAdmin(admin.address);

    const UPRSwap = await ethers.getContractFactory('UPRSwap');
    uprSwap = await UPRSwap.deploy(ufrToken.address, uprToken.address);

    expect(uprSwap.deployed()).not.to.throw;
  });

  it('should set swap rate', async function() {
    const [, admin] = await ethers.getSigners();
    await uprSwap.connect(admin).setSwapRate(50);
    expect(await uprSwap.getSwapRate()).to.equal(50);
  });

  it('should set UPRSwap to minter UPR token', async function() {
    await uprToken.addAdmin(uprSwap.address);
    expect(await uprToken.isAdmin(uprSwap.address)).to.equal(true);
  });

  it('should be staking with UPR', async function() {
    const [owner] = await ethers.getSigners();
    await ufrToken.approve(uprSwap.address, 10000);
    expect(await ufrToken.allowance(owner.address, uprSwap.address)).to.equal(
      10000
    );

    const totalSupplyUPR = await uprToken.totalSupply();
    const balance = await uprToken.balanceOf(owner.address);
    await uprSwap.swap(10000);

    expect(await ufrToken.balanceOf(uprSwap.address)).to.equal(10000);
    expect(totalSupplyUPR.add(10000 * 50)).to.equal(
      await uprToken.totalSupply()
    );
    expect(balance.add(10000 * 50)).to.equal(
      await uprToken.balanceOf(owner.address)
    );
  });
});
