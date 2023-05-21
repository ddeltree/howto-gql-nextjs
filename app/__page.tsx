'use client';
import client from '@/src/apollo-client';
import { ApolloQueryResult } from '@apollo/client';
import gql from 'graphql-tag';
import { useEffect, useState } from 'react';

export default function Home() {
  const [data, setData] = useState<ApolloQueryResult<any>>();

  useEffect(() => {
    const getData = async () => {
      const _data = await client.query({
        query: gql`
          query Query {
            hello
          }
        `,
      });
      setData(_data);
    };
    getData();
  }, []);

  return <main>{data?.data.hello}</main>;
}
