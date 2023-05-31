import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'http://localhost:3000/graphql',
  // schema: 'graphql/schemas/*.ts',
  documents: 'app/**/*.tsx',
  generates: {
    'graphql/types/': {
      preset: 'client',
      plugins: ['typescript', 'typescript-resolvers'],
    },
  },
  watch: true,
};

export default config;
