
import fs from "fs";
import { ethers, artifacts } from "hardhat";
import { Bank } from "../src/types/Bank";

async function main() {
  const Bank = await ethers.getContractFactory("Bank");
  const bank = await Bank.deploy();
  console.log("checkBalance:", await bank.checkBalance());
  console.log("Bank deployed to:", bank.address);
  saveContract(bank);
}

function saveContract(bank: Bank) {
  const path = __dirname + '/../frontend/src/contracts';
  if (!fs.existsSync(path))
    fs.mkdirSync(path);
  fs.writeFileSync(`${path}/address.json`,
    JSON.stringify({ address: bank.address }, undefined, 2))
  fs.writeFileSync(`${path}/abi.json`,
    JSON.stringify( artifacts.readArtifactSync('Bank'), undefined ,2) )
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
