'use strict';

const fs = require('fs');
const yaml = require('js-yaml');
const { FileSystemWallet, Gateway } = require('fabric-network');
let gateway;
// cpuchannel

async function getChannel(org,channelName){
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

    const channel = await gateway.getNetwork(channelName);

    return channel.getChannel()
}

function disconnect(){
    console.log("Disconnecting...");
    gateway.disconnect();
  }

  module.exports.getChannel = getChannel;
  module.exports.disconnect = disconnect;