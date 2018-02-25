const BaseController = require('./BaseController');

class Home extends BaseController {
  index() {
    this.collection.users.findOne({}, (err, result) => {
      this.res.end(JSON.stringify(result));
    });
  }
}

module.exports = Home;
