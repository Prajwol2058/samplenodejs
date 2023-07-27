const { MongoClient } = require("mongodb");
const { connect_DB } = require(".");

async function list_stocks(client) {
  try {
    // Connect to the MongoDB cluster
    // const client = connect_DB();
    // await client.connect();
    // stocks = await client.db.db("sampledb").collections("users").find({});
    // return stocks;
    await client.connect();
    const db = client.db("sample");
    const collection = db.collection("stocks");
    stocks = await collection.find({}).toArray()
    return stocks;
    
    // Make the appropriate DB calls
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

module.exports = { list_stocks };