async function listdbs(client) {
try {
    // Connect to the MongoDB cluster
    await client.connect();
    databasesList = await client.db().admin().listDatabases();
    return databasesList
    // Make the appropriate DB calls

} catch (e) {
    console.error(e);
} finally {
    await client.close();
}
}
module.exports = {listdbs};