'use strict';

const channel = require('./channel');

const channel_name = 'cpuchannel';

async function main(){

    try {
        console.log("Getting channel");

        let ch = await channel.getChannel("org1",channel_name);

        console.log("Getting Info");

        let info = await ch.queryInfo();

        return info;
    } catch (error) {
        console.log(error);
    }finally{
        channel.disconnect()
    }
}

main().then((res) => {
    console.log(res);
});
