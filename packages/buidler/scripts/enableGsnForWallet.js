const fs = require('fs');

async function main() {
  let forwarderGsnArtifact = fs.readFileSync('../react-app/src/build/gsn/Forwarder.json').toString()
  let forwarderAddress = JSON.parse(forwarderGsnArtifact).address
  let walletAddress = fs.readFileSync("./artifacts/SmartContractWallet.address").toString()
  let walletArtifact = artifacts.require("SmartContractWallet")
  let walletInstance = await walletArtifact.at(walletAddress)
  await walletInstance.setTrustedForwarder(forwarderAddress)
  console.log(`Successfully set Trusted Forwarder (${forwarderAddress}) on Recipient (${walletAddress})`)
}
main()
.then(() => process.exit(0))
.catch(error => {
  console.error(error);
  process.exit(1);
});
