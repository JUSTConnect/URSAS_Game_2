import * as gameFunctions from './functions'

export async function enterInGameByTokenIds(roomLevel: number, tableIndex: number, tokenIds: number[]) {
    return await gameFunctions.bulkEnterInGame(roomLevel, tableIndex, tokenIds)
}