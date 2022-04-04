require('dotenv').config();
require('hardhat-contract-sizer');
require('@nomiclabs/hardhat-waffle');
require('@openzeppelin/hardhat-upgrades');
require('./tasks/deployTasks');
require('./tasks/deployApp');
require('./tasks/deployStaking');

const { BSC_PRIVATE_KEY } = process.env;

const optimizeSettings = {
  settings: {
    optimizer: {
      enabled: true,
      runs: 1000
    }
  }
};

const config = {
  contractSizer: {
    alphaSort: true,
    runOnCompile: true,
    disambiguatePaths: false
  },
  defaultNetwork: 'ganache',
  networks: {
    ganache: {
      allowUnlimitedContractSize: true,
      gasLimit: 6721975 * 10, // increase the gas limit by 10
      url: 'http://127.0.0.1:7545'
    }
  },
  solidity: {
    compilers: [
      {
        version: '0.6.12',
        ...optimizeSettings
      },
      {
        version: '0.8.0',
        ...optimizeSettings
      }
    ]
  }
};

if (BSC_PRIVATE_KEY) {
  config.networks = {
    ...config.networks,
    bsctest: {
      accounts: [`0x${BSC_PRIVATE_KEY}`],
      url: 'https://data-seed-prebsc-1-s1.binance.org:8545/'
    },
    bsc: {
      accounts: [`0x${BSC_PRIVATE_KEY}`],
      url: 'https://bsc-dataseed.binance.org/'
    }
  };
}

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = config;
