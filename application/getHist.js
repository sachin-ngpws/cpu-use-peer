const gateway = require('./gateway');
const contract_name = "org.cpu-use.cpu";

async function main(){
    try {
    console.log('Getting contract');
    let contract = await gateway.getContractInstance('org1',contract_name);
    console.log('Submitting transaction');
    let asset = await contract.submitTransaction('getHist','peer1');

    console.log(JSON.parse(asset.toString()));

    return JSON.parse(asset.toString())

    } catch (e) {
        console.log(e);
    }finally{
        gateway.disconnect();
    }
}

module.exports.run = main;