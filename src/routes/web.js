const { users, articles } = require('../bootstrap/database').collections;

module.exports = {
  home: {
    path: '/',
    uses: 'Home@index',
    collections: [users, articles],
    exposeAsApi: true,
  },
  user: {
    path: '/users/:id',
    uses: 'User@show',
    exposeAsApi: true,
  },
};
