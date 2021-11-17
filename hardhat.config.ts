import { task } from "hardhat/config";
import "@nomiclabs/hardhat-waffle";
import { HardhatUserConfig } from "hardhat/config";

import '@typechain/hardhat'
import '@nomiclabs/hardhat-ethers' 

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

const privatekey = 'b83202ddc3eb2725e0460eb0c8b291499c111ca35479d6955df251cf91bf8cb2'
/**
 * @type import('hardhat/config').HardhatUserConfig
 */
export default {
  solidity: "0.8.4",
  networks: {
    hardhat: {
      chainId: 1337
    },
    localhost: {
      url: "http://localhost:8545",
      chainId: 1337
    },
    rinkeby: {
      url: 'https://eth-rinkeby.alchemyapi.io/v2/ldhl6jul_qsaYYpFQ3QcFGL6jK6pSMK4',
      accounts: [privatekey],
      gas: 2100000,
      gasPrice: 8000000000
    }
  },
  typechain: {
    outDir: 'src/types',
    target: 'ethers-v5',
    alwaysGenerateOverloads: false, // should overloads with full signatures like deposit(uint256) be generated always, even if there are no overloads?
    externalArtifacts: ['externalArtifacts/*.json'], // optional array of glob patterns with external artifacts to process (for example external libs from node_modules)
  },
 } as HardhatUserConfig ;
