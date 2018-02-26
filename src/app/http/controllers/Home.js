const BaseController = require('./BaseController');

class Home extends BaseController {
  async index() {
    const users = await this.collection.users.find({}).toArray();
    const articles = await this.collection.articles.find({}).toArray();

    this.send('home.index', { users, articles });
  }
}

module.exports = Home;
