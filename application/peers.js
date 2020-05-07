'use strict';
const channel = require('./channel');

const channel_name = 'cpuchannel';

async function main(){

    try {
        console.log("Getting channel");

        let ch = await channel.getChannel("org1",channel_name);

        console.log("Getting Info");

        let info =  ch.getPeers();

        let send = {
            "number-of-peers": info.length,
            "name": info[0]._name,
            "mspid": info[0]._mspid,
            "details": info[0]._peer
        }

        return send;
    } catch (error) {
        console.log(error);
        console.log(error.stack);
    }finally{
        channel.disconnect()
    }
}

module.exports.run = main;