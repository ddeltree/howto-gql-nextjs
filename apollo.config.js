module.exports = {
  client: {
    tagName: '', // matches graphql(``)
    // for prod, use graphID@variant (e.g. davi-alexandres-team-rsnxw@main)
    service: {
      name: 'davi-alexandres-team-rsnxw', // service ID
      url: 'http://localhost:3000/graphql',
    },
    includes: ['./app/**/*.ts{,x}'],
    excludes: ['**/__tests__/**', './app/graphql/**'],
  },
};
