# How to setup Apollo Server & GraphQL on a NextJS API route

<br/>

`1. Install the dependencies`

```bash
# NextJS with App Router
npx create-next-app@canary . --ts
npm i @apollo/client @apollo/server @as-integrations/next graphql encoding
```

`2. Create your type definitions and their resolvers`<br/>

[<p align="right">/graphql/<b>schemas</b>/hello.ts</p>](graphql/schemas/hello.ts)

```ts
import { gql } from '@apollo/client';

const typeDefs = gql`
  type Query {
    hello: String
  }
`;
export default typeDefs;
```

[<p align="right">/graphql/<b>resolvers</b>/hello.ts</p>](graphql/resolvers/hello.ts)

```ts
const resolvers = {
  Query: {
    hello: () => 'Apollo Server is up & running on /graphql',
  },
};
export default resolvers;
```

`3. Run Apollo Server on /graphql`

[<p align="right">/app/graphql/route.ts</p>](app/graphql/route.ts)

```ts
import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import typeDefs from '@/graphql/schemas/hello';
import resolvers from '@/graphql/resolvers/hello';

const server = new ApolloServer({
  resolvers,
  typeDefs,
});

const handler = startServerAndCreateNextHandler(server);

export async function GET(request: Request) {
  const response = await handler(request);
  return response;
}

export async function POST(request: Request) {
  const response = await handler(request);
  return response;
}
```

`4. Enable introspection` - getting the schema on prod, after deploying to Vercel

[<p align="right">/app/graphql/route.ts</p>](app/graphql/route.ts)

```ts
//...

const server = new ApolloServer({
  resolvers,
  typeDefs,
  introspection: true,
});

/** Enable CORS to be able to query on Apollo Studio or elsewhere */
export async function OPTIONS(request: Request) {
  const response = new Response(undefined, { status: 200 });
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Credentials', 'true');
  response.headers.set(
    'Access-Control-Allow-Methods',
    'GET,OPTIONS,PATCH,DELETE,POST,PUT',
  );
  response.headers.set(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
  );
  return response;
}

// Add these lines to GET and POST
response.headers.set('Access-Control-Allow-Origin', '*');
response.headers.set('Access-Control-Allow-Credentials', 'true');
```

`5. Deploy to` [Vercel](vercel.com) ` and create your supergraph on` [Apollo Studio](studio.apollographql.com) `using your vercel graphql endpoint`

<br/>

`6. Install the Apollo GraphQL vscode extension to get Intellisense in your queries`

<br/>

`7. Create` [/apollo.config.js](apollo.config.js)

```javascript
module.exports = {
  client: {
    // your supergraph's ID@variant
    service: 'davi-alexandres-team-rsnxw@main',
    // where intellisense will work
    includes: ['./app/**/*.ts{,x}'],
    excludes: ['./graphql/schemas/**'],
  },
};
```

`8. Create an API key on Apollo Studio`

- Go to Personal Settings --> API Keys
- Create <b>/.env</b> and put it on .gitignore
- Put the created key into <b>/.env</b> as:

```
APOLLO_KEY=...
```

<br/>

## IntelliSense should be working now 👍

![](/public/intellisense.png)

<br/>

## <b> Making a query </b>

<hr/>

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
