import * as gameFunctions from './functions'
import {BigNumber, ethers} from "ethers";
import {ActiveTable, Room} from "@/agents/web3";

export async function enterInGameByTokenIds(roomLevel: number, tableIndex: number, tokenIds: number[]) {
  return await gameFunctions.bulkEnterInGame(roomLevel, tableIndex, tokenIds)
}

export async function removeInGameByTokenIds(roomLevel: number, tableIndex: number, tokenIds: number[]) {
  return await gameFunctions.leaveGame(roomLevel, tableIndex, tokenIds)
}

export async function getPlayingTablesInAllRooms(account: string) {
  // получить все столы(можно узнать занятые юзером столы не проходя через массив мест каждого стола)
  const rooms: BigNumber[][] = await gameFunctions.getActiveTablesForPlayer(account)
  console.log(rooms)
  const roomsClaim = rooms.map((tables, roomIndex) => {
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
  }).filter(tables => tables !== undefined)
  return roomsClaim as unknown as ActiveTable[]
}

export async function claimSingleGame() {
  // return await gameFunctions.claimSingleGame(16, 1, 0)
}