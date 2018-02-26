const polka = require('polka');
const router = require('./router');
const database = require('./database');
const appConfig = require('../config/app');

module.exports = async function bootstrap() {
  const app = polka();

  const mongo = await database.getMongoClient.catch(err => console.log('err', err));

  app.use(router.attachRoutes({ app, mongo }));

  app.listen(appConfig.port).then(result => {
    console.log(`Listening on :${appConfig.port}`);
  });
};
