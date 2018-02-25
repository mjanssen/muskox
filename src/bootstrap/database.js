const mongoClient = require('mongodb').MongoClient;
const databaseConfig = require('../config/database');

module.exports = new Promise(resolve => {
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
});
