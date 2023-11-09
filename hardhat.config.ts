// require("dotenv").config();
import "hardhat-contract-sizer"
import "@nomiclabs/hardhat-waffle"
import "solidity-coverage"
import "hardhat-gas-reporter"
import "hardhat-deploy"
import "hardhat-deploy-ethers"
import "@nomiclabs/hardhat-web3"
import "@layerzerolabs/ua-utils"
import { getNetworks } from './utils/hardhatConfigHelpers'
import "./tasks"


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
    ...getNetworks(),
  }
};
export default config