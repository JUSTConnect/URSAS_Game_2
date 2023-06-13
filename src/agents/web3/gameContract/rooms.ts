import { Room, Table } from ".."

import * as gameFunctions from './functions'
import type * as gameTypes from './functions'
import { RoomLevel } from "@/lib/types/game"

export async function getRoomDetailTableList (roomNumber: RoomLevel) {
    let roomTables = await gameFunctions.GetWholeRoom(roomNumber)
    return roomTables?.map(
        function (table: gameTypes.GetWholeRoomResponse[0]) : Table {
            let players = table.players?.map(
                (address: string, index: number) => {
                    return {
                        address: address,
                        tokenId: Number(table.playingTokenIds[index]),
                        timemark: Number(table.playersTimeMarks[index])
                    }
                }
            )
            return {
                currentGameFinishedAt: Number(table.currentGameFinishedAt),
                currentGameStartedAt: Number(table.currentGameStartedAt),
                internalGameReduction: Number(table.internalGameReduction),
                players: players,
                serialNumber: 0,
                status: table.status,
                placesAvailable: players.map(a=>Boolean(a.tokenId))
                    // отфильтровать места с валидными токенами
                    .filter(a => !a)
                    // вернуть количество занятых мест
                    .length
            }
        }
    )
}


export async function getRoomDetailGameDuration (roomNumber: RoomLevel) {
    return await gameFunctions.currentRoomGameDuration(roomNumber)
}

export async function getRoomDetailGameDurationIncreaseCounter (roomNumber: RoomLevel) {
    return await gameFunctions.roomGameDurationIncreaseCounter(roomNumber) 
}

export async function getRoomDetail (roomNumber: RoomLevel) : Promise<Room[]> {
    let tables = await getRoomDetailTableList(roomNumber)
    return Object({
        tables: tables,
        roomDuration: Number(await getRoomDetailGameDuration(roomNumber)),
        roomIncreaseCounter: await getRoomDetailGameDurationIncreaseCounter(roomNumber),
        availableTablesCount: 
            tables
                ?.map(
                    table => table.players
                        // получить id токенов мест
                        .map(a=>Boolean(a.tokenId))
                        // отфильтровать места с валидными токенами
                        .filter(a => a)
                        // вернуть количество занятых мест
                        .length
                )
                // отфильтровать столы с players.length < 10
                .filter(
                    i => i < 10
                )
                .length
    })
}