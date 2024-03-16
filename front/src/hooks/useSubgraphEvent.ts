import {useSubgraph} from "@/hooks/useSubgraph";

export function useSubgraphEvent(eventId: string) {
    const selectSingleEventQuery = `
      {
          eventCreateds(where: { _eventId: "${eventId}" }) {
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

    const { data, loading, error } = useSubgraph( selectSingleEventQuery );

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
        data: mapped[0],
        loading: loading,
        error: error
    }
}
