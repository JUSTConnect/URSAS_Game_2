import { BigNumber } from "ethers"

import { getMintContract } from "@/lib/utils/web3"
import { RoomLevel, RoomLevelArray as RLArray } from "@/lib/types/game"

import { RoomMintData } from "./types"

// комната - стоимость минта 
export async function getRoomDetailMintCost (level: RoomLevel) : Promise<RLArray<number>> {
    return await getMintContract().costs(level)
}

// комнаты - стоимость минта
export async function getRoomListMintCost () : Promise<RLArray<number>> {
    let costs: RLArray<BigNumber> = await getMintContract().getDataAboutCostsForRooms()   
    return costs.map((i: BigNumber) => Number(i)).reverse() as RLArray<number>
}

// комнаты - дневной лимит и счётчик
export async function getRoomListMintSupplyNMinted() : Promise<[RLArray<number>, RLArray<number>]> {
    let result: [RLArray<number>, RLArray<number>] = await getMintContract().getDataAboutLimitsForRooms()
    return [[...result[0]].reverse(), [...result[1]].reverse()] as [RLArray<number>, RLArray<number>]
}

// комнаты - доступно минтов
export async function getRoomListMintAvailable () : Promise<RLArray<number>> {
    let _ = await getRoomListMintSupplyNMinted()
    return _[0].map((i: number, index) => i - _[1][index] ) as RLArray<number>
}

// комнаты - информация о минте (RoomMintData)
export async function getRoomListMintData () : Promise<RoomMintData[]> {
    let costs = await getRoomListMintCost()
    let available = await getRoomListMintAvailable()

    return costs.map(
        (i, index) => (
            {
                cost: i,
                available: available[index]
            }
        )
    )
}
