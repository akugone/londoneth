import {
  Approval as ApprovalEvent,
  ApprovalForAll as ApprovalForAllEvent,
  CidUpdated as CidUpdatedEvent,
  EventCreated as EventCreatedEvent,
  HackathonIdMinted as HackathonIdMintedEvent,
  RoleAdminChanged as RoleAdminChangedEvent,
  RoleGranted as RoleGrantedEvent,
  RoleRevoked as RoleRevokedEvent,
  Transfer as TransferEvent,
  charityCreated as charityCreatedEvent,
} from "../generated/HackathonID/HackathonID";
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
  charityCreated,
} from "../generated/schema";

export function handleApproval(event: ApprovalEvent): void {
  let entity = new Approval(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.owner = event.params.owner;
  entity.approved = event.params.approved;
  entity.tokenId = event.params.tokenId;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleApprovalForAll(event: ApprovalForAllEvent): void {
  let entity = new ApprovalForAll(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.owner = event.params.owner;
  entity.operator = event.params.operator;
  entity.approved = event.params.approved;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleCidUpdated(event: CidUpdatedEvent): void {
  let entity = new CidUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity._tokenId = event.params._tokenId;
  entity._newCid = event.params._newCid;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleEventCreated(event: EventCreatedEvent): void {
  let entity = new EventCreated(event.params._eventId.toString());
  entity._eventId = event.params._eventId;
  entity._hackathonId = event.params._hackathonId;
  entity._eventName = event.params._eventName;
  entity._eventCid = event.params._eventCid;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleHackathonIdMinted(event: HackathonIdMintedEvent): void {
  let entity = new HackathonIdMinted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity._hackathonAddress = event.params._hackathonAddress;
  entity.hackathonId = event.params.hackathonId;
  entity._hackathonName = event.params._hackathonName;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleRoleAdminChanged(event: RoleAdminChangedEvent): void {
  let entity = new RoleAdminChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.role = event.params.role;
  entity.previousAdminRole = event.params.previousAdminRole;
  entity.newAdminRole = event.params.newAdminRole;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleRoleGranted(event: RoleGrantedEvent): void {
  let entity = new RoleGranted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.role = event.params.role;
  entity.account = event.params.account;
  entity.sender = event.params.sender;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleRoleRevoked(event: RoleRevokedEvent): void {
  let entity = new RoleRevoked(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.role = event.params.role;
  entity.account = event.params.account;
  entity.sender = event.params.sender;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleTransfer(event: TransferEvent): void {
  let entity = new Transfer(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.from = event.params.from;
  entity.to = event.params.to;
  entity.tokenId = event.params.tokenId;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handlecharityCreated(event: charityCreatedEvent): void {
  let entity = new charityCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.charityId = event.params.charityId;
  entity.hackathonId = event.params.hackathonId;
  entity.eventId = event.params.eventId;
  entity._charityName = event.params._charityName;
  entity._charityCid = event.params._charityCid;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}
