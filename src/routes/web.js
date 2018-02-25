const { users } = require('../config/collections');

module.exports = {
  home: {
    path: '/',
    uses: 'Home@index',
    collections: [users],
  },
  user: {
    path: '/user/:id',
    uses: 'User@show',
  },
};
