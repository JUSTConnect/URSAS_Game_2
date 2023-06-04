import * as gameFunctions from './functions'
import {BigNumber, ethers} from "ethers";
import {Room} from "@/agents/web3";
import {tablesClaim} from "@/features/game/gameSlice";

export async function enterInGameByTokenIds(roomLevel: number, tableIndex: number, tokenIds: number[]) {
  return await gameFunctions.bulkEnterInGame(roomLevel, tableIndex, tokenIds)
}

export async function removeInGameByTokenIds(roomLevel: number, tableIndex: number, tokenIds: number[]) {
  return await gameFunctions.leaveGame(roomLevel, tableIndex, tokenIds)
}

export async function getTablesClaimReady(account: string, roomData: Room[]) {
  // получить все столы(можно узнать занятые столы пользователем не проходя через массив мест на каждого стола)
  const rooms: BigNumber[][] = await gameFunctions.getActiveTablesForPlayer(account)
  const roomsClaim = rooms.map((tables, roomIndex) => {
    // массив индексов столов на которых играет юзер
    const tablesClaim = tables.map((table, tableIndex) => {
      const isActive = !!Number(ethers.utils.formatEther(table))
      // проверка наличия юзера и окончания игры на столе
      if (isActive && roomData[roomIndex]?.tables[tableIndex]?.currentGameStartedAt > 0) {
        return tableIndex
      }
    }).filter(table => table !== undefined)
    if (tablesClaim.length) {
      return {
        roomLevel: roomIndex + 1,
        tablesClaim
      }
    }
  }).filter(tables => tables !== undefined)
  return roomsClaim as unknown as tablesClaim[]
}

export async function claimSingleGame() {
  // return await gameFunctions.claimSingleGame(16, 1, 0)
}