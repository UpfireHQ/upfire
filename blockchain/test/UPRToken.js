const { expect, assert } = require("chai");
const minter = '0xAF1248EA2D517Dc4E9EB94103936acecCcF7A580';

describe("UPR Token", async function() {
  let uprToken;

  it("Should be deploy token", async function() {
    const UPRToken = await ethers.getContractFactory("UPR");
    uprToken = await UPRToken.deploy();

    expect(await uprToken.deployed()).not.to.throw;
  });

  it('Should be check minter return false', async function () {
    try {
      await uprToken.isAdmin(minter);
      assert.fail('Expected revert not received');
    } catch (error) {
      const revertFound = error.message.search('revert') >= 0;
      assert(revertFound, `Expected "revert", got ${error} instead`);
    }
  });

  it('Should be add minter', async function () {
    await uprToken.addAdmin(minter);
    expect(await uprToken.isAdmin(minter)).to.equal(true);
  });

  it('Should be renounce minter', async function () {
    await uprToken.renounceAdmin(minter);
    try {
      await uprToken.isAdmin(minter);
      assert.fail('Expected revert not received');
    } catch (error) {
      const revertFound = error.message.search('revert') >= 0;
      assert(revertFound, `Expected "revert", got ${error} instead`);
    }
  });
});
