const BaseController = require('./BaseController');

class User extends BaseController {
  show({ id }) {
    this.res.end(`This is user ${id}`);
  }
}

module.exports = User;
