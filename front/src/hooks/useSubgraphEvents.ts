import {useSubgraph} from "@/hooks/useSubgraph";


export function useSubgraphEvents(hackathonId: string | null = null) {
    const conditions = hackathonId ? `(where: { _hackathonId:"${hackathonId}" })` : ''
    const selectAllEventsQuery = `
      {
          eventCreateds${conditions} {
            transactionHash
            id
            blockTimestamp
            blockNumber
            _hackathonId
            _eventName
            _eventId
            _eventCid
          }
      }
    `
    const { data, loading, error } = useSubgraph( selectAllEventsQuery);

    const events = data?.eventCreateds || []
    const mapped = events.map((event: any) => ({
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
