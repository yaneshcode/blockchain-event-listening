const ethers = require('ethers');
const credentials = require('./credentials/credentials.js');

// Get history from Etherscan DB
// var etherscanProvider = new ethers.providers.EtherscanProvider('kovan');
// let wallet = new ethers.Wallet(credentials.P_KEY, etherscanProvider);

// etherscanProvider.getHistory(wallet.address).then(function(history) {
//     console.log(history);
// });

let provider = new ethers.providers.InfuraProvider("kovan", credentials.INFURA_API_KEY);
let wallet = new ethers.Wallet(credentials.P_KEY, provider);

const amount = ethers.utils.bigNumberify('3');
const gasPrice = ethers.utils.bigNumberify('1000000000');
const gasLimit = ethers.utils.bigNumberify('633355');
const to = "0x1BAceD8724BBE4FB554403cC77D28D551eDc2bdc";

const transaction = async () => {
  const nonce = await wallet.getTransactionCount('pending');

  console.log(nonce);

  const tx = {
    to,
    nonce,
    gasPrice,
    gasLimit
  }

  console.log (tx);
  const raw = await wallet.sign(tx);
  console.log(raw);

  let transactionHash = await wallet.sendTransaction(tx);

  console.log("Just sent this Tx: " + transactionHash.hash);

  let receipt = await provider.waitForTransaction(transactionHash.hash);
  console.log('Transaction Mined: ' + receipt.transactionHash);
  console.log(receipt);

  // // With a timeout. a tx hash that never happened
  // let receipt = new Promise((resolve, reject) => {
  //
  //   setTimeout(() => {
  //       console.log("Timed Out");
  //       reject(new Error('timeout'));
  //   }, 5000)
  //
  //   provider.waitForTransaction("0x455a41412265ac2d1868fec8a4f3c196c646ba1de88844d26957a20066d31fa7").then((receipt) => {
  //       console.log('Transaction Mined: ' + receipt.transactionHash);
  //       console.log(receipt);
  //
  //       resolve({
  //         receipt
  //       });
  //   });
  //
  //
  //
  // });
  //
  // receipt.then((value) => {
  //   console.log(value);
  // });


  // provider.waitForTransaction("0x455a41412265ac2d1868fec8a4f3c196c646ba1de88844d26957a20066d31fa7").then((receipt) => {
  //     console.log('Transaction Mined: ' + receipt.transactionHash);
  //     console.log(receipt);
  // });
}
transaction();
