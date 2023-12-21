import "hardhat-contract-sizer"
import "@nomiclabs/hardhat-waffle"
import "solidity-coverage"
import "hardhat-gas-reporter"
import "hardhat-deploy"
import "hardhat-deploy-ethers"
import "@nomiclabs/hardhat-web3"
import "@layerzerolabs/ua-utils"
import "./tasks"
import {HardhatUserConfig} from "hardhat/config";

function getMnemonic(networkName) {
  if (networkName) {
    const mnemonic = process.env["MNEMONIC_" + networkName.toUpperCase()]
    if (mnemonic && mnemonic !== "") {
      return mnemonic
    }
  }

  const mnemonic = process.env.MNEMONIC
  if (!mnemonic || mnemonic === "") {
    return "test test test test test test test test test test test junk"
  }

  return mnemonic
}

function accounts(chainKey?) {
  return { mnemonic: getMnemonic(chainKey) }
}

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
const config: HardhatUserConfig = {

  solidity: {
    compilers: [
      {
        version: "0.8.17",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        }
      }    
    ]
  },
  contractSizer: {
    alphaSort: false,
    runOnCompile: true,
    disambiguatePaths: false,
  },

  namedAccounts: {
    deployer: {
      default: 0    // wallet address 0, of the mnemonic in .env
    }
  },
  networks: {
    'ethereum-mainnet': {
      url: "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
      chainId: 1,
      accounts: accounts(),
    },
    'bsc-mainnet': {
      url: "https://bsc-dataseed1.binance.org",
      chainId: 56,
      accounts: accounts(),
    },
    'avalanche-mainnet': {
      url: "https://api.avax.network/ext/bc/C/rpc",
      chainId: 43114,
      accounts: accounts(),
    },
    'polygon-mainnet': {
      url: "https://rpc-mainnet.maticvigil.com",
      chainId: 137,
      accounts: accounts(),
    },
    'arbitrum-mainnet': {
      url: `https://arb1.arbitrum.io/rpc`,
      chainId: 42161,
      accounts: accounts(),
    },
    'optimism-mainnet': {
      url: `https://mainnet.optimism.io`,
      chainId: 10,
      accounts: accounts(),
    },
    'fantom-mainnet': {
      url: `https://rpcapi.fantom.network`,
      chainId: 250,
      accounts: accounts(),
    },
    'ethereum-testnet': {
      url: "https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
      chainId: 5,
      accounts: accounts(),
    },
    "bsc-testnet": {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545/",
      chainId: 97,
      accounts: accounts(),
    },
    'avalanche-testnet': {
      url: `https://api.avax-test.network/ext/bc/C/rpc`,
      chainId: 43113,
      accounts: accounts(),
    },
    'polygon-testnet': {
      url: "https://rpc-mumbai.maticvigil.com/",
      chainId: 80001,
      accounts: accounts(),
    },
    "arbitrum-testnet": {
      url: `https://goerli-rollup.arbitrum.io/rpc/`,
      chainId: 421613,
      accounts: accounts(),
    },
    "optimism-testnet": {
      url: `https://goerli.optimism.io/`,
      chainId: 420,
      accounts: accounts(),
    },
    "fantom-testnet": {
      url: `https://rpc.ankr.com/fantom_testnet`,
      chainId: 4002,
      accounts: accounts(),
    },
  }
};
export default config