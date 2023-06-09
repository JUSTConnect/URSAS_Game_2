import * as gameFunctions from './functions'
import {BigNumber, ethers} from "ethers";
import {ActiveTable, Room} from "@/agents/web3";
import {getRoomDetail} from "@/agents/web3/gameContract/rooms";
import {RoomLevel} from "@lib/types/game";

export async function enterInGameByTokenIds(roomLevel: number, tableIndex: number, tokenIds: number[]) {
  return await gameFunctions.advancedBulkEnterInGame(roomLevel, tableIndex, tokenIds)
}

export async function removeInGameByTokenIds(roomLevel: number, tableIndex: number, tokenIds: number[]) {
  return await gameFunctions.leaveGame(roomLevel, tableIndex, tokenIds)
}

export async function getPlayingTablesInAllRooms(account: string) {
  // получить все столы(можно узнать занятые юзером столы не проходя по массиву мест каждого стола)
  const rooms: BigNumber[][] = await gameFunctions.getActiveTablesForPlayer(account)
  const roomsClaim = rooms?.map((tables, roomIndex) => {
    // массив индексов столов на которых играет юзер
    const tablesId = tables.map((table, tableIndex) => {
      const isActive = !!Number(ethers.utils.formatEther(table))
      // if (isActive && roomData[roomIndex]?.tables[tableIndex]?.currentGameStartedAt > 0) {
      // проверка наличия юзера на столе
      if (isActive) {
        return tableIndex
      }
    }).filter(table => table !== undefined)
    return {
      roomLevel: roomIndex + 1,
      tablesId
    }
  }).filter(tables => tables !== undefined) || []
  return roomsClaim as unknown as ActiveTable[]
}

export async function getClaimTablesReady(tables: ActiveTable[], rooms: Room[]) {
  const claimTablesReady = await Promise.all(tables.map(async (tables, index) => {
    const tablesId = await Promise.all(tables.tablesId.map(async (tableIndex) => {
      if (rooms[index]?.tables[tableIndex]?.currentGameStartedAt > 0) {
        const isTableClaimReady = await gameFunctions.isTableClaimReady(tables.roomLevel, tableIndex)
        if (isTableClaimReady) {
          return tableIndex
        }
      }
    })).then((data) => data.filter(table => table !== undefined))
    if (tablesId.length) {
      return {
        roomLevel: tables.roomLevel,
        tablesId: tablesId.filter(table => table !== undefined)
      }
    }
  })).then((data) => data.filter(tables => tables !== undefined))

  return claimTablesReady as unknown as { roomLevel: number, tablesId: number[] }[]
}

export async function claim(roomLevels: ActiveTable[]) {
  const transactionArray: any[] = []
  await Promise.all(roomLevels.map(async ({roomLevel}) => {
    const transaction = await gameFunctions.claimReadyTablesInRoom(roomLevel, 111)
    transactionArray.push(transaction)
  }))
  return await Promise.all(transactionArray.map(async (transaction: any) => {
    await transaction?.wait().then(async (receipt: any) => {
      if (receipt && receipt.status == 1) {
        return true
      }
    }).catch((e: any) => {
      console.log(e)
      return false
    })
  }))
}

export async function getCurrentTableGameEnd(roomLevel: Number, tableIndex: Number) {
  return await gameFunctions.getTimeWhenTableIsClaimReady(roomLevel, tableIndex)
}

export async function getAmountPlayersInBlackRoom() {
  return await gameFunctions.amountPlayersUntilCurrentRaffle()
}