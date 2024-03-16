import {
    ApolloClient,
    ApolloQueryResult,
    gql,
    InMemoryCache,
} from '@apollo/client';
import { useEffect, useState } from 'react';
import { useSubgraph } from '@/hooks/useSubgraph';

const client = new ApolloClient({
    uri: 'https://api.thegraph.com/subgraphs/name/akugone/nodnol',
    cache: new InMemoryCache(),
});

const selectAllProofOfGiveQuery = `
  query {
      charityCreateds {
        _charityCid
        _charityName
        blockNumber
        blockTimestamp
        charityId
        hackathonId
        id
        transactionHash
      }
  }
`;

export function useSubgraphCharities() {
    const { data, loading, error } = useSubgraph(selectAllProofOfGiveQuery);

    const events = data?.eventCreateds || [];
    const mapped = events.map((event: any) => ({
        id: event.id,
        name: event._eventName,
        cid: event._eventCid,
        block: {
            timestamp: event.blockTimestamp,
            number: event.blockNumber,
        },
        hackathon: {
            id: event._hackathonId,
        },
    }));

    return {
        data: mapped,
        loading: loading,
        error: error,
    };
}
