const routes = require('../routes/web');

const controllers = {};
const collections = {};

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

      app.get(data.path, (req, res) => {
        controllers[controller].req = req;
        controllers[controller].res = res;

        controllers[controller][action](req.params);
      });
    }
  });

  return function(req, res, next) {
    next();
  };
}

module.exports = { attachRoutes };
