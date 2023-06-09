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
    const transaction = await getGameContract().advancedBulkEnterInGame(roomLevel, tableIndex, tokenIds, {gasLimit: 3000000})
    return await transaction.wait().then(async (receipt: any) => {
      if (receipt && receipt.status == 1) {
        return true
      }
    }).catch((e: any) => {
      console.log(e)
      return false
    })
  } catch {
    delay(1000)
  }
  // }
}

export async function leaveGame(roomLevel: Number, tableIndex: Number, tokenIds: Number[]) {
  try {
    const transaction = await getGameContract().leaveGame(roomLevel, tableIndex, tokenIds, {gasLimit: 3000000})
    return await transaction.wait().then(async (receipt: any) => {
      if (receipt && receipt.status == 1) {
        return true
      }
    }).catch((e: any) => {
      console.log(e)
      return false
    })
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
    return await getGameContract().claimReadyTablesInRoom(roomLevel, salt, {gasLimit: 3000000})
  } catch (e: any) {
    console.log(e)
  }
}

export async function isTableClaimReady(roomLevel: Number, tableIndex: Number) {
  try {
    return await getGameContract().isTableClaimReady(roomLevel, tableIndex)
  } catch (e: any) {
    console.log(e)
  }
}

export async function amountPlayersUntilCurrentRaffle() {
  try {
    return await getGameContract().amountPlayersUntilCurrentRaffle()
  } catch (e: any) {
    console.log(e)
  }
}

export async function getTimeWhenTableIsClaimReady(roomLevel: Number, tableIndex: Number) {
  try {
    return await getGameContract().getTimeWhenTableIsClaimReady(roomLevel, tableIndex)
  } catch (e: any) {
    console.log(e)
  }
}
