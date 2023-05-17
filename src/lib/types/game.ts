// TODO Написать интерфейс для игры

export interface Room
{
    level: number
    over?: boolean
}

export interface Table
{
    tableNumber: number
    freePlaces?: number
    gameEnd?: string
    cooldown?: boolean
}

export enum Rank
{
    N1 = 'POT',
    N2 = 'CLOCK',
    N3 = 'JO',
    N4 = 'A',
    N5 = 'K',
    N6 = 'Q',
    N7 = 'J',
    N8 = '10',
    N9 = '9',
    N10 = '8',
    N11 = '7',
    N12 = '6',
    N13 = '5',
    N14 = '4',
    N15 = '3',
    N16 = '2',
}

export enum Suit
{
    d = 1,
    h = 2,
    c = 3,
    s = 4
}

export interface Card
{
    rank: Rank,
    suit: Suit
}
