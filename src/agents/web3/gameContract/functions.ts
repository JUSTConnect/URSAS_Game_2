import {RoomLevel} from "@/lib/types/game";
import {getGameContract, getMintContract} from "@/lib/utils/web3";
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

async function testDecorator(name: String, func: Function, args: any[]) {
  while (true) {
    try {
      return await func(...args)
    } catch (e: any) {
      if (e.error?.code === '-32603') {
        delay(1000)
      } else {
        console.log(window.ethereum.providers?.length)
        console.log('Game Contract:', name)
        console.dir(e)
        return
      }
    }
  }
}

export async function GetWholeRoom(roomNumber: RoomLevel): Promise<GetWholeRoomResponse> {
  return testDecorator('GetWholeRoom', getGameContract().GetWholeRoom, [roomNumber])
}


export async function currentRoomGameDuration(roomNumber: RoomLevel): Promise<BigNumber> {
  return testDecorator('currentRoomGameDuration', getGameContract().currentRoomGameDuration, [roomNumber])
}

export async function roomGameDurationIncreaseCounter(roomNumber: RoomLevel): Promise<number> {
  return testDecorator('roomGameDurationIncreaseCounter', getGameContract().roomGameDurationIncreaseCounter, [roomNumber])
}

export async function trump(): Promise<0 | 1 | 2 | 3> {
  return testDecorator('trump', getGameContract().trump, [])
}

export async function advancedBulkEnterInGame(roomLevel: Number, tableIndex: Number, tokenIds: Number[]) {
  return testDecorator('advancedBulkEnterInGame', getGameContract().advancedBulkEnterInGame, [roomLevel, tableIndex, tokenIds, {gasLimit: 3000000}])
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
  return testDecorator('getActiveTablesForPlayer', getGameContract().getActiveTablesForPlayer, [account])
}

export async function claimReadyTablesInRoom(roomLevel: Number, salt: Number) {
  return testDecorator('claimReadyTablesInRoom', getGameContract().claimReadyTablesInRoom, [roomLevel, salt, {gasLimit: 3000000}])
}

export async function isTableClaimReady(roomLevel: Number, tableIndex: Number) {
  return testDecorator('isTableClaimReady', getGameContract().isTableClaimReady, [roomLevel, tableIndex])
}

export async function amountPlayersUntilCurrentRaffle() {
  return testDecorator('amountPlayersUntilCurrentRaffle', getGameContract().amountPlayersUntilCurrentRaffle, [])
}

export async function getTimeWhenTableIsClaimReady(roomLevel: Number, tableIndex: Number) {
  return testDecorator('getTimeWhenTableIsClaimReady', getGameContract().getTimeWhenTablesIsClaimReady, [roomLevel, tableIndex])
}
