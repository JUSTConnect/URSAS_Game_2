// TODO Написать интерфейс для игры

export type RoomLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16

export type SuitSymbol = 'd' | 'h' | 'c' | 's' // diamond | heart | club | spade


export type RoomLevelArray<T> = [
    T, T, T, T,
    T, T, T, T,
    T, T, T, T,
    T, T, T, T
]

export interface Room
{
    level: RoomLevel
    over?: boolean
}

export interface TableData {
    currentGameFinishedAt: string,
    currentGameStartedAt: string,
    internalGameReduction: string,
    players: string[],
    playersNow: number,
    playingSuits: string[],
    playingTokenIds: string[],
    serialNumber: string,
    status: number,
    cards: CardNFT[]
}

export interface Table
{
    tableNumber: number
    freePlaces?: number
    gameEnd?: string
    cooldown?: boolean
}

export enum SuitsGetName {
    Spades = 0,
    Heart = 1,
    Diamond = 2,
    Club = 3,
}

export enum SuitsFilter {
    Heart = 0,
    Club = 1,
    Diamond = 2,
    Spades = 3,
}

export interface Card
{
    rank: RoomLevel,
    suit: SuitSymbol,
}

export interface CardNFT extends Card
{
    tokenId: Number
    playing?: Boolean
}

export enum StatusTable {
    WAITING = 0,
    PLAYING = 1,
    COOLDOWN = 2
}
