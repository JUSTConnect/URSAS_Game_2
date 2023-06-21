import { getMintContract } from "@/lib/utils/web3"
import { BigNumber } from "ethers"
import delay from "delay"
import { RoomLevel, SuitSymbol } from "@/lib/types/game"
import { RoomLevelArray as RLArray } from "@/lib/types/game"

async function testDecorator(name: String, func: Function, args: any[])
{
    while (true) {
        try {
            return await func(...args)
        } catch (e: any) {
            if (e.error?.code==='-32603') {
                console.log('MintContract:', name)
                console.dir(e)
                delay(1000)
            } else {
                return
            }
        }
    }
}

export async function tokensOfOwner(hash: String) : Promise<BigNumber[]> {
    return await testDecorator('tokensOfOwner', getMintContract().tokensOfOwner, [hash])
}

export async function suits(tokedId: Number) : Promise<SuitSymbol> {
    return await testDecorator('suits', getMintContract().suits, [tokedId])
}

export async function NFTRoomLevel(tokenId: Number) : Promise<RoomLevel> {
    return await testDecorator('NFTRoomLevel', getMintContract().NFTRoomLevel, [tokenId])
}

export async function viewNotTransferable(tokenId: Number) : Promise<Boolean> {
    return await testDecorator('viewNotTransferable', getMintContract().viewNotTransferable, [tokenId])
}

export async function getDataAboutCostsForRooms() : Promise<RLArray<BigNumber>> {
    return await testDecorator('getDataAboutCostsForRooms', getMintContract().getDataAboutCostsForRooms, [])
}

export async function getDataAboutLimitsForRooms() : Promise<[RLArray<number>, RLArray<number>]> {
    return await testDecorator('getDataAboutLimitsForRooms', getMintContract().getDataAboutLimitsForRooms, [])    
}

export async function costs(level: RoomLevel) : Promise<number> {
    return await testDecorator('costs', getMintContract().costs, [level])        
}

export async function viewCardsInfo(cardIds: BigNumber[]){
    return await testDecorator('viewCardsInfo', getMintContract().viewCardsInfo, [cardIds])
}