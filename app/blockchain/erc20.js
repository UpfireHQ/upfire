import { TOKEN } from '../constants/blockchain';
import EthClient from './client';
import contractSettings from './contracts/UPR.json';

let _instance;

export default class Erc20 {
  static create(reload = false) {
    return new Erc20(TOKEN);
  }

  static get instance() {
    if (!_instance) {
      _instance = Erc20.create();
    }

    return _instance;
  }

  constructor(address) {
    this._contract = EthClient.instance.getContract(
      contractSettings.abi,
      address
    );
  }

  get address() {
    return this._contract.options.address;
  }

  /**
   * @return {{
   *   decimals: function(*)
   *   approve: function(*)
   *   allowance: function(*)
   *   balanceOf: function(*)
   *   transfer: function(*)
   * }}
   */
  get methods() {
    return this._contract.methods;
  }

  async getDecimals() {
    return EthClient.instance.call(this.methods.decimals()).catch(() => 0);
  }

  async getDecimalsMulti() {
    try {
      return Math.pow(10, await this.getDecimals());
    } catch (e) {
      return 1;
    }
  }

  async approve(wallet, spender, amount, gas = null) {
    const method = this.methods.approve(spender, String(amount));

    return EthClient.instance.sendSignedTransaction(
      wallet,
      method,
      this.address,
      gas
    );
  }

  async estimateApprove(wallet, spender, amount) {
    const method = this.methods.approve(spender, String(amount));

    return EthClient.instance.estimateContractTransaction(wallet, method);
  }

  async allowance(address, contract) {
    return EthClient.instance.call(this.methods.allowance(address, contract));
  }

  async balanceOf(address) {
    return EthClient.instance
      .call(this.methods.balanceOf(address))
      .catch(() => 0);
  }

  async totalSupply() {
    return EthClient.instance
      .call(this.methods.totalSupply())
      .catch(() => 0)
      .then(test => {
        return test;
      });
  }

  async burn(wallet, amount, burnAddress, gas = null) {
    const method = this.methods.burn(burnAddress, String(amount));

    return EthClient.instance.sendSignedTransaction(
      wallet,
      method,
      this.address,
      gas
    );
  }

  async mint(wallet, amount, mintAddress, gas = null) {
    const method = this.methods.mint(mintAddress, String(amount));

    return EthClient.instance.sendSignedTransaction(
      wallet,
      method,
      this.address,
      gas
    );
  }

  async addAdmin(wallet, address, gas = null) {
    const method = this.methods.addAdmin(address);
    return EthClient.instance.sendSignedTransaction(
      wallet,
      method,
      this.address,
      gas
    );
  }

  async renounceAdmin(wallet, address, gas = null) {
    const method = this.methods.renounceAdmin(address);
    return EthClient.instance.sendSignedTransaction(
      wallet,
      method,
      this.address,
      gas
    );
  }

  async getAdmins() {
    const onlyUnique = (value, index, self) => {
      return self.indexOf(value) === index;
    };

    return EthClient.instance
      .call(this.methods.getAdmins())
      .then(addresses =>
        Promise.all(
          addresses.filter(onlyUnique).map(address => {
            return this.isAdmin(address).then(isAdmin => ({
              address,
              isAdmin
            }));
          })
        )
      )
      .then(addresses => {
        return addresses.filter(item => item.isAdmin).map(item => item.address);
      })
      .catch(() => 0);
  }

  async isAdmin(address) {
    return EthClient.instance
      .call(this.methods.isAdmin(address))
      .then(res => {
        return res;
      })
      .catch(() => false);
  }
}
