module.exports = {
  client: {
    tagName: '', // matches graphql(``)
    service:
      process.env.NODE_ENV === 'development'
        ? {
            name: 'davi-alexandres-team-rsnxw',
            url: 'http://localhost:3000/graphql',
          }
        : 'davi-alexandres-team-rsnxw@main',
    includes: ['./app/**/*.ts{,x}'],
    excludes: ['**/__tests__/**', './app/graphql/**'],
  },
};
