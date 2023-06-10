import { SuitSymbol } from "@/lib/types/game"

export type Season = {
    trump: 0|1|2|3
}

export type Room = {
    tables: Table[]
    availableTablesCount: number
    roomDuration: number
    roomIncreaseCounter: number
}

export type ActiveTable = {
    roomLevel: number
    tablesId: number[]
}

export type Table = {
    currentGameFinishedAt: number
    currentGameStartedAt: number
    players: Player[]
    placesAvailable: number
    status: number
    internalGameReduction: number
    serialNumber?: number
}

export type Player = {
    address: string
    tokenId: Number
    suit?: SuitSymbol
    timemark: number
}
