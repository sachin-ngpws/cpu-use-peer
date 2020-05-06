class Usage{
    constructor(usageObject){
        Object.assign(this,usageObject);
      }
      static getClass(){
        return 'org.cpu-use.cpu.Usage';
      }
      static fromBuffer(buffer){
        let json = JSON.parse(buffer.toString());
        return new Usage(json);
      }
      toBuffer(){
          return Buffer.from(JSON.stringify(this));
      }

      static createInstance(usageObject){
          return new Usage(usageObject);
      }
}

module.exports = Usage;