# How to use this setup as a template

1. Clone, install the dependencies and the [Apollo GraphQL](https://marketplace.visualstudio.com/items?itemName=apollographql.vscode-apollo) extension

2. Write your custom types and resolvers in [/graphql/](graphql/)

3. Run `npm run codegen` to generate your types in /graphql/types/

<br/>

# Quick summary of the tutorial

1. [Codegen](./codegen.ts)

```bash
npx create-next-app@latest . --ts
  # √ Would you like to use App Router? [Yes]

# Dependencies
npm i @apollo/client @apollo/server @as-integrations/next graphql encoding

npm i -D @graphql-codegen/cli @graphql-codegen/typescript @graphql-codegen/typescript-resolvers

# Configure codegen on @/graphql/
npx graphql-code-generator init
npm install
```

2. [Apollo Server](app/graphql/route.ts)
3. [Apollo Client](app/layout.tsx)
4. [Apollo GraphQL Extension](./apollo.config.js)

<br/>

# Tutorial

<br/>

`1. Install the dependencies`

```bash
npx create-next-app@latest . --ts
  # √ Would you like to use App Router? [Yes]

npm i @apollo/client @apollo/server @as-integrations/next graphql encoding
```

`2. Create your type definitions and their resolvers`<br/>

[<p align="right">/graphql/<b>schemas</b>/queries.ts</p>](graphql/schemas/queries.ts)

```ts
import { gql } from '@apollo/client';

const queries = gql`
  type Query {
    hello: String!
  }
`;
export default queries;
```

[<p align="right">/graphql/<b>resolvers</b>/queryResolvers.ts</p>](graphql/resolvers/queryResolvers.ts)

```ts
const resolvers = {
  Query: {
    hello: () => 'Apollo Server is up & running on /graphql',
  },
};
export default resolvers;
```

`3. Run the Apollo Server on localhost:3000/graphql`

[<p align="right">/app/graphql/route.ts</p>](app/graphql/route.ts)

```ts
import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';

import queryResolvers from '@/graphql/resolvers/queryResolvers';
import queries from '@/graphql/schemas/queries';

const server = new ApolloServer({
  resolvers: [queryResolvers /*...*/],
  typeDefs: [queries /*...*/],
  introspection: true,
});

const handler = startServerAndCreateNextHandler(server);
export const GET = handler;
export const POST = handler;
```

<br/>

`6. Configure the Apollo GraphQL extension for query IntelliSense`
[<p align="right">/apollo.config.js</p>](apollo.config.js)

```javascript
module.exports = {
  client: {
    tagName: `graphql.`, // matches graphql(`...`)
    service: {
      name: 'local schema',
      url: 'http://localhost:3000/graphql',
    },
    includes: ['./app/**/*.ts{,x}' /*...*/],
    excludes: ['**/__tests__/**', 'graphql/**', 'node_modules/**', '*'],
  },
};
```

### IntelliSense should be working now 👍

```bash
npm run dev
```

![](/public/intellisense.png)

<br/>

### <b> Making a query - set up the Apollo Client </b>

[<p align="right">/app/layout.tsx</p>](app/layout.tsx)

```ts
//...
const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

//...
<ApolloProvider client={client}>
  <body>{children}</body>
</ApolloProvider>;
//...
```

[<p align="right">/app/page.tsx</p>](app/page.tsx)

```ts
//...
const GET_DATA = gql`
  query Query {
    hello
  }
`;

export default function Home() {
  const { loading, error, data } = useQuery(GET_DATA);
  //...
  return (
    //...
    <a href="/graphql">{data.hello}</a>
  );
}
```

<br/>
<br/>

## Generate types from your schema

```bash
npm install -D @graphql-codegen/cli @graphql-codegen/typescript @graphql-codegen/typescript-resolvers
```

<br/>

Set up a [configuration file](./codegen.ts) to tell GraphQL Code Generator where and how to generate types

```bash
npx graphql-code-generator init
npm install
npm run codegen
```

<br/>

### Finally, type safety for the queried data 🥰

![](/public/data-intellisense.png)

## Tips

- You can import your generated types from /graphql/types/graphql.ts
- If you need the schema to be private, you should probably upload it to [Apollo Studio](https://studio.apollographql.com) and use that instead of the local schema, and disable introspection.
- This configuration works well with Vercel, if you're thinking of deploying there.
- Leave codegen in watch mode as you write the graphql-related stuff to get an instant feedback on the validity of it.
- Sometimes the Apollo GraphQL extension takes too long to load the schema. If you run into that, reloading the window or re-saving its config file will probably take care of it.
- Note that this extension configuration expects the apollo server _to be running_ on [localhost:3000/graphql]().
