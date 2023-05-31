import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000/graphql'
      : 'https://graph-ql-nextjs.vercel.app/graphql',
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
