const routes = require('../routes/web');
const routerConfig = require('../config/router');

const controllers = {};
const collections = {};

function attachControllerAction(controller, action, req, res, api) {
  controllers[controller].req = req;
  controllers[controller].res = res;
  controllers[controller].api = api;

  controllers[controller][action](req.params);
}

function attachRoutes({ app, mongo }) {
  Object.entries(routes).forEach(([name, data]) => {
    if (data.uses.indexOf('@')) {
      const [controller, action] = data.uses.split('@');
      if (typeof controllers[controller] === 'undefined') {
        const controllerClass = require(`../app/http/controllers/${controller}`);
        controllers[controller] = new controllerClass();
      }

      if (typeof data.collections !== 'undefined' && mongo) {
        controllers[controller].collection = {};

        data.collections.map(({ collection }) => {
          if (typeof collections[collection] === 'undefined') {
            collections[collection] = mongo.collection(collection);
          }

          controllers[controller].collection[collection] = collections[collection];
        });
      }

      if (data.exposeAsApi) {
        app.get(`/${routerConfig.apiPathBase}${data.path}`, (req, res) => {
          attachControllerAction(controller, action, req, res, true);
        });
      }

      app.get(data.path, (req, res) => {
        attachControllerAction(controller, action, req, res, false);
      });
    }
  });

  return function(req, res, next) {
    next();
  };
}

module.exports = { attachRoutes };
