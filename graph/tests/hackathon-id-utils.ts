import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import {
  Approval,
  ApprovalForAll,
  CidUpdated,
  EventCreated,
  HackathonIdMinted,
  RoleAdminChanged,
  RoleGranted,
  RoleRevoked,
  Transfer,
  charityCreated
} from "../generated/HackathonID/HackathonID"

export function createApprovalEvent(
  owner: Address,
  approved: Address,
  tokenId: BigInt
): Approval {
  let approvalEvent = changetype<Approval>(newMockEvent())

  approvalEvent.parameters = new Array()

  approvalEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam("approved", ethereum.Value.fromAddress(approved))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return approvalEvent
}

export function createApprovalForAllEvent(
  owner: Address,
  operator: Address,
  approved: boolean
): ApprovalForAll {
  let approvalForAllEvent = changetype<ApprovalForAll>(newMockEvent())

  approvalForAllEvent.parameters = new Array()

  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("operator", ethereum.Value.fromAddress(operator))
  )
  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("approved", ethereum.Value.fromBoolean(approved))
  )

  return approvalForAllEvent
}

export function createCidUpdatedEvent(
  _tokenId: BigInt,
  _newCid: string
): CidUpdated {
  let cidUpdatedEvent = changetype<CidUpdated>(newMockEvent())

  cidUpdatedEvent.parameters = new Array()

  cidUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "_tokenId",
      ethereum.Value.fromUnsignedBigInt(_tokenId)
    )
  )
  cidUpdatedEvent.parameters.push(
    new ethereum.EventParam("_newCid", ethereum.Value.fromString(_newCid))
  )

  return cidUpdatedEvent
}

export function createEventCreatedEvent(
  _eventId: BigInt,
  _hackathonId: BigInt,
  _eventName: string,
  _eventCid: string
): EventCreated {
  let eventCreatedEvent = changetype<EventCreated>(newMockEvent())

  eventCreatedEvent.parameters = new Array()

  eventCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "_eventId",
      ethereum.Value.fromUnsignedBigInt(_eventId)
    )
  )
  eventCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "_hackathonId",
      ethereum.Value.fromUnsignedBigInt(_hackathonId)
    )
  )
  eventCreatedEvent.parameters.push(
    new ethereum.EventParam("_eventName", ethereum.Value.fromString(_eventName))
  )
  eventCreatedEvent.parameters.push(
    new ethereum.EventParam("_eventCid", ethereum.Value.fromString(_eventCid))
  )

  return eventCreatedEvent
}

export function createHackathonIdMintedEvent(
  _hackathonAddress: Address,
  hackathonId: BigInt,
  _hackathonName: string
): HackathonIdMinted {
  let hackathonIdMintedEvent = changetype<HackathonIdMinted>(newMockEvent())

  hackathonIdMintedEvent.parameters = new Array()

  hackathonIdMintedEvent.parameters.push(
    new ethereum.EventParam(
      "_hackathonAddress",
      ethereum.Value.fromAddress(_hackathonAddress)
    )
  )
  hackathonIdMintedEvent.parameters.push(
    new ethereum.EventParam(
      "hackathonId",
      ethereum.Value.fromUnsignedBigInt(hackathonId)
    )
  )
  hackathonIdMintedEvent.parameters.push(
    new ethereum.EventParam(
      "_hackathonName",
      ethereum.Value.fromString(_hackathonName)
    )
  )

  return hackathonIdMintedEvent
}

export function createRoleAdminChangedEvent(
  role: Bytes,
  previousAdminRole: Bytes,
  newAdminRole: Bytes
): RoleAdminChanged {
  let roleAdminChangedEvent = changetype<RoleAdminChanged>(newMockEvent())

  roleAdminChangedEvent.parameters = new Array()

  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam(
      "previousAdminRole",
      ethereum.Value.fromFixedBytes(previousAdminRole)
    )
  )
  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam(
      "newAdminRole",
      ethereum.Value.fromFixedBytes(newAdminRole)
    )
  )

  return roleAdminChangedEvent
}

export function createRoleGrantedEvent(
  role: Bytes,
  account: Address,
  sender: Address
): RoleGranted {
  let roleGrantedEvent = changetype<RoleGranted>(newMockEvent())

  roleGrantedEvent.parameters = new Array()

  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )

  return roleGrantedEvent
}

export function createRoleRevokedEvent(
  role: Bytes,
  account: Address,
  sender: Address
): RoleRevoked {
  let roleRevokedEvent = changetype<RoleRevoked>(newMockEvent())

  roleRevokedEvent.parameters = new Array()

  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )

  return roleRevokedEvent
}

export function createTransferEvent(
  from: Address,
  to: Address,
  tokenId: BigInt
): Transfer {
  let transferEvent = changetype<Transfer>(newMockEvent())

  transferEvent.parameters = new Array()

  transferEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return transferEvent
}

export function createcharityCreatedEvent(
  charityId: BigInt,
  hackathonId: BigInt,
  eventId: BigInt,
  _charityName: string,
  _charityCid: string
): charityCreated {
  let charityCreatedEvent = changetype<charityCreated>(newMockEvent())

  charityCreatedEvent.parameters = new Array()

  charityCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "charityId",
      ethereum.Value.fromUnsignedBigInt(charityId)
    )
  )
  charityCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "hackathonId",
      ethereum.Value.fromUnsignedBigInt(hackathonId)
    )
  )
  charityCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "eventId",
      ethereum.Value.fromUnsignedBigInt(eventId)
    )
  )
  charityCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "_charityName",
      ethereum.Value.fromString(_charityName)
    )
  )
  charityCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "_charityCid",
      ethereum.Value.fromString(_charityCid)
    )
  )

  return charityCreatedEvent
}
