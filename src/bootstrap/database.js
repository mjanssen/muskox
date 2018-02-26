const mongoClient = require('mongodb').MongoClient;
const databaseConfig = require('../config/database');
const collectionConfig = require('../config/collections');

function buildCollectionData(_collections) {
  const collections = {};
  _collections.forEach(key => (collections[key] = { collection: key }));
  return collections;
}

module.exports = {
  getMongoClient: new Promise(resolve => {
    if (
      databaseConfig.mongodb.user === 'USERNAME' &&
      databaseConfig.mongodb.password === 'PASSWORD'
    ) {
      resolve(false);
    }

    mongoClient.connect(
      `mongodb://${databaseConfig.mongodb.host}:${databaseConfig.mongodb.port}`,
      (err, client) => {
        if (err) resolve(false);

        resolve(client.db(databaseConfig.mongodb.database));
      }
    );
  }),
  collections: buildCollectionData(collectionConfig),
};
