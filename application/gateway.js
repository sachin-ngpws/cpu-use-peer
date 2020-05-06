'use strict';

const fs = require('fs');
const yaml = require('js-yaml');
const { FileSystemWallet, Gateway } = require('fabric-network');
let gateway;

async function getContractInstance(org,contractName){
    gateway = new Gateway()

    const wallet = new FileSystemWallet('./identity/'+org);

    const fabricUserName = org+'_admin';

    const ccp = yaml.safeLoad(fs.readFileSync('./commonConnectionProfile.yaml','utf8'));

    let connectionOptions = {
        wallet: wallet,
        identity: fabricUserName,
        discovery: {enabled: false,asLocalhost: true}
      };

    await gateway.connect(ccp,connectionOptions);

    const channel = await gateway.getNetwork('cpuchannel');

    return channel.getContract('cpu-use',contractName);
}

function disconnect(){
    console.log("Disconnecting...");
    gateway.disconnect();
  }

  module.exports.getContractInstance = getContractInstance;
  module.exports.disconnect = disconnect;