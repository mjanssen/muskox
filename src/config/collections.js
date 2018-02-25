const collections = ['users'];

module.exports = collections.reduce(
  (map, key) => ({
    [key]: {
      collection: key,
    },
  }),
  {}
);
