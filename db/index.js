const { MongoClient } = require("mongodb");
 async function connect_DB(){
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
     */
    const uri = process.env.MONGO_URI;
  
  
    const client = new MongoClient(uri);
  
    return client
}
module.exports = { connect_DB};