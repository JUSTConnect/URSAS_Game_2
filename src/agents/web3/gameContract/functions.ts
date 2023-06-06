import {RoomLevel} from "@/lib/types/game";
import {getGameContract} from "@/lib/utils/web3";
import {BigNumber} from "ethers";
import delay from 'delay';

export type GetWholeRoomResponse = Array<{
  currentGameFinishedAt: BigNumber
  currentGameStartedAt: BigNumber
  internalGameReduction: BigNumber
  players: string[]
  playersNow: number
  playersTimeMarks: BigNumber[]
  playingSuits: BigNumber[]
  playingTokenIds: BigNumber[]
  serialNumber: BigNumber
  status: 0 | 1 | 2 // waiting players, playing, cooldown
}>

export async function GetWholeRoom(roomNumber: RoomLevel): Promise<GetWholeRoomResponse> {
  while (true) {
    try {
      return await getGameContract().GetWholeRoom(roomNumber)
    } catch {
      delay(1000)
    }
  }
}


export async function currentRoomGameDuration(roomNumber: RoomLevel): Promise<BigNumber> {
  while (true) {
    try {
      return await getGameContract().currentRoomGameDuration(roomNumber)
    } catch {
      delay(1000)
    }
  }
}

export async function roomGameDurationIncreaseCounter(roomNumber: RoomLevel): Promise<number> {
  while (true) {
    try {
      return await getGameContract().roomGameDurationIncreaseCounter(roomNumber)
    } catch {
      delay(1000)
    }
  }
}

export async function trump(): Promise<0 | 1 | 2 | 3> {
  while (true) {
    try {
      return await getGameContract().trump()
    } catch {
      delay(1000)
    }
  }
}

export async function advancedBulkEnterInGame(roomLevel: Number, tableIndex: Number, tokenIds: Number[]) {
  // while (true) {
  try {
    return await getGameContract().advancedBulkEnterInGame(roomLevel, tableIndex, tokenIds, {gasLimit: 3000000})
  } catch {
    delay(1000)
  }
  // }
}

export async function leaveGame(roomLevel: Number, tableIndex: Number, tokenIds: Number[]) {
  try {
    return await getGameContract().leaveGame(roomLevel, tableIndex, tokenIds)
  } catch (e: any) {
    console.log(e)
  }
}

export async function getActiveTablesForPlayer(account: string) {
  try {
    return await getGameContract().getActiveTablesForPlayer(account)
  } catch (e: any) {
    console.log(e)
  }
}

export async function claimReadyTablesInRoom(roomLevel: Number, salt: Number) {
  try {
    return await getGameContract().claimReadyTablesInRoom(roomLevel, salt)
  } catch (e: any) {
    console.log(e)
  }
}

export async function isTableClaimReady (roomLevel: Number, tableIndex: Number) {
  try {
    return await getGameContract().isTableClaimReady (roomLevel, tableIndex)
  } catch (e: any) {
    console.log(e)
  }
}