const EC = require('elliptic').ec;
const ec = new EC('secp256k1');
const {Blockchain, Transaction} = require('./blockchain');



const myKey = ec.keyFromPrivate('a6413f72c42959347f6cd9f9b80f51e80fa0c90291a82772d4f5cc2a23b3bd52');
const myWalletAddress = myKey.getPublic('hex');

const someOtherWalletAddress = 'dsdsf';
//const someOtherWalletAddress = ec.keyFromPublic('04be9e0f1d433c015c612ed0c623f6834a7646423c5dde42d55591bd6ef0fb58892d4cdf4b92115cd1f45953f0e00951a1b82b1cb97eeb858f70428f0514d4ec11', 'hex');
// private key for this is d89d4bb4514759da7aaf1194a769c5b6cedc5f1827ce58864430fc710dd9cbdd


let coin = new Blockchain();

const tx1 = new Transaction(myWalletAddress, someOtherWalletAddress, 10);
tx1.signTransaction(myKey);
coin.addTransaction(tx1);

console.log("Starting the miner..");

coin.minePendingTransactions(myWalletAddress);

console.log("Balance of wallet: ", coin.getBalanceOfAddress(myWalletAddress));

coin.chain[1].transactions[0].amount = 1;

console.log("Is chain valid? ", coin.isChainValid());
