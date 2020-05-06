'use strict';

const {Contract} = require('fabric-contract-api');
const Usage = require('./Usage');

class Cpu extends Contract{
    constructor(){
        super('org.cpu-use.cpu');
    }

    async instantiate(ctx){
        console.log("CPU UP!!")
    }

    async addCpu(ctx,id){
        try{
            let date = new Date();
        let usage = {
            date: date.getDate(),
            hours: date.getHours(),
            minutes: date.getMinutes(),
            seconds: date.getSeconds(),
            cpu: null
        };
        let compKey = ctx.stub.createCompositeKey(Usage.getClass(),[id]);

        let usageObject = Usage.createInstance(usage);

        await ctx.stub.putState(compKey,usageObject.toBuffer());

        return usageObject;
        } catch(e){
            console.log(e);
            console.log(e.stack);
            return e;
        }
    }

    async addUsage(ctx,id,cpu1,cpu2){
        try{
        let compKey = ctx.stub.createCompositeKey(Usage.getClass(),[id]);

        let usageBuffer = await ctx.stub.getState(compKey);

        let usage = Usage.fromBuffer(usageBuffer);

        if(usage == null){
            throw new Error('Empty object');
        }

        let date = new Date()
        usage.date = date.getDate()
        usage.hours = date.getHours()
        usage.minutes = date.getMinutes()
        usage.seconds = date.getSeconds()
        usage.cpu = [cpu1,cpu2];

        await ctx.stub.putState(compKey,usage.toBuffer());

        return usage;

        }catch(e){
            console.log(e);
            console.log(e.stack);
            return e;
        }
    }

    async getUsage(ctx,id){
        try {
        let compKey = ctx.stub.createCompositeKey(Usage.getClass(),[id]);

        let usageBuffer = await ctx.stub.getState(compKey);

        let usage = Usage.fromBuffer(usageBuffer);

        if(usage == null){
            throw new Error('Empty object');
        }

        return usage;
        } catch (e) {
            console.log(e);
            console.log(e.stack);
            return e;
        }
    }

    async getHist(ctx,id){
        try {
            let compKey = ctx.stub.createCompositeKey(Usage.getClass(),[id]);

            let iterator = await ctx.stub.getHistoryForKey(compKey);

            let result = await getAllResults(iterator);

            return result;
        } catch (e) {
            console.log(e);
            console.log(e.stack);
            return e;
        }
    }

}
// helper fuunction from fabric documentation
async function getAllResults(iterator) {
    console.log("inside iterator");
    const allResults = [];
    while (true) {
        const res = await iterator.next();
  
        if (res.value) {
            // if not a getHistoryForKey iterator then key is contained in res.value.key
            allResults.push(res.value.value.toString('utf8'));
        }
  
        // check to see if we have reached then end
        if (res.done) {
            // explicitly close the iterator
            await iterator.close();
            return allResults;
        }
    }
  }

module.exports = Cpu;