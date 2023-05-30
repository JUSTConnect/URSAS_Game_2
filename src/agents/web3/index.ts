import { SuitSymbol } from "@/lib/types/game"

export type Season = {
    trump: number
}

export type Room = {
    tables: Table[]
    availableTablesCount: number
    roomDuration: number
    roomIncreaseCounter: number
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
    tokenId: number
    suit?: SuitSymbol
    timemark: number
}