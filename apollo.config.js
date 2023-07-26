// https://www.apollographql.com/docs/devtools/apollo-config/
module.exports = {
  client: {
    tagName: `graphql.`, // matches graphql(`...`)
    service: {
      name: 'localhost',
      url: 'http://localhost:3000/graphql',
    },
    includes: ['./app/**/*.ts{,x}', './src/**/*.ts{,x}'],
    excludes: ['**/__tests__/**', 'graphql/**', 'node_modules/**', '*'],
  },
};
