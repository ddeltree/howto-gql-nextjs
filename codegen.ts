import type { CodegenConfig } from '@graphql-codegen/cli';
import fs from 'fs';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'graphql/schemas/**/*.{ts,tsx,gql,graphql}',
  documents: [
    'app/**/*.{ts,tsx,gql,graphql,}',
    'src/**/*.{ts,tsx,gql,graphql,}',
    'graphql/**/*.{ts,tsx,gql,graphql}',
  ],
  generates: {
    'graphql/types/': {
      preset: 'client',
      plugins: [
        // 'typescript' results in duplication error in /graphql/types/graphql.ts
        // 'typescript',
        'typescript-resolvers',
      ],
    },
  },
  watch: true,
  hooks: {
    afterAllFileWrite: forceReloadApolloExtension,
  },
};

// usually there's a big delay to update the query intellisense
function forceReloadApolloExtension() {
  const p = './apollo.config.js';
  fs.writeFileSync(p, fs.readFileSync(p));
}

export default config;
