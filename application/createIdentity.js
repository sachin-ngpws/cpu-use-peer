'use strict';

const fs = require('fs');
const { FileSystemWallet, X509WalletMixin } = require('fabric-network');
const path = require('path');

async function main(org,certificatePath, privateKeyPath){
    try {
    // wallet
    const wallet = new FileSystemWallet('./identity/'+org);

    // reading the required files
    const certificate = fs.readFileSync(certificatePath).toString();
    const privatekey = fs.readFileSync(privateKeyPath).toString();

    const identityLabel = org+'_admin';
    const msp = org+'MSP'
    const identity = X509WalletMixin.createIdentity(msp,certificate,privatekey);

    await wallet.import(identityLabel, identity);
    } catch (e) {
        console.log(e);
        console.log(e.stack);
        return e;
    }
}

let certificatePath ="/home/sachin/block-cpu/network/crypto-config/peerOrganizations/org1.cpu-use.com/users/Admin@org1.cpu-use.com/msp/signcerts/Admin@org1.cpu-use.com-cert.pem";

let privateKeyPath = "/home/sachin/block-cpu/network/crypto-config/peerOrganizations/org1.cpu-use.com/users/Admin@org1.cpu-use.com/msp/keystore/b8e36bb71c2e153a736d5caf525dd765a8243036cce4c2c354060104a05b1e1d_sk";

main("org1",certificatePath,privateKeyPath).then(() =>{
    console.log('Identity Created');
});

module.exports.run = main;