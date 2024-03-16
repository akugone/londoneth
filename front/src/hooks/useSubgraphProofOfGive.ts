import {ApolloClient, ApolloQueryResult, gql, InMemoryCache} from "@apollo/client";
import {useEffect, useState} from "react";
import {useSubgraph} from "@/hooks/useSubgraph";

const client = new ApolloClient({
    uri: 'https://api.thegraph.com/subgraphs/name/akugone/nodnol',
    cache: new InMemoryCache(),
})

const selectAllProofOfGiveQuery = `
  query {
      pogMinteds {
        userAddress
        transactionHash
        id
        handle
        hackathonId
        eventId
        donationId
        dataUri
        charityId
      }
  }
`

export function useSubgraphProofOfGive() {
    const { data, loading, error } = useSubgraph(selectAllProofOfGiveQuery);

    const minteds = data?.pogMinteds || []
    const mapped = minteds.map((event: any) => ({
        // transactionHash: event.transactionHash,
        id: event.id,
        name: event._eventName,
        // id: event._eventId,
        cid: event._eventCid,
        block: {
            timestamp: event.blockTimestamp,
            number: event.blockNumber,
        },
        hackathon: {
            id: event._hackathonId
        },
    }))

    return {
        data: mapped,
        loading: loading,
        error: error
    }
}
