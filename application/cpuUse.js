'use strict';

const gateway = require('./gateway');
const os = require('os');
const contract_name = "org.cpu-use.cpu";

async function main(){
    try {
    let cpus = os.cpus()
    console.log('Getting contract');
    let contract = await gateway.getContractInstance('org1',contract_name);
    console.log('Submitting transaction');
    let asset = await contract.submitTransaction('addUsage','peer1',"speed :"+cpus[0].speed.toString()+" mem :"+os.freemem(),cpus[1].speed.toString());

    // console.log(JSON.parse(asset.toString()));
    return JSON.parse(asset.toString())
    } catch (e) {
        console.log(e);
    }finally{
        gateway.disconnect();
    }
}

main().then(res => {
        console.log(res);
});