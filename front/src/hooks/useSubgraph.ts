import {ApolloClient, gql, InMemoryCache} from "@apollo/client";
import {useEffect, useState} from "react";

const client = new ApolloClient({
    uri: 'https://api.thegraph.com/subgraphs/name/akugone/nodnol',
    cache: new InMemoryCache(),
})

export function useSubgraph(query: string, variables = {}) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData(){
            try {
                const res = await client.query({
                    query: gql(query),
                    variables: variables
                })
                setData(res.data)
            } catch (err) {
                console.log('Error fetching data: ', err)
                setError(err);
            }
            setLoading(false)
        }

        fetchData();
    }, []);

    return {
        data: data,
        loading: loading,
        error: error
    }
}
