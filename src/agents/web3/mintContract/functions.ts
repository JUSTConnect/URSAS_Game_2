import { getMintContract } from "@/lib/utils/web3"
import { BigNumber } from "ethers"
import delay from "delay"
import { RoomLevel, SuitSymbol } from "@/lib/types/game"
import { RoomLevelArray as RLArray } from "@/lib/types/game"

export async function tokensOfOwner(hash: String) : Promise<BigNumber[]> {
    while (true) {
        try {
            return await getMintContract().tokensOfOwner(hash)
        } catch {
            delay(1000)
        }
    }
}

export async function suits(tokedId: Number) : Promise<SuitSymbol> {
    while (true) {
        try {
            return await getMintContract().suits(tokedId)
        } catch {
            delay(1000)
        }
    }
}

export async function NFTRoomLevel(tokenId: Number) : Promise<RoomLevel> {
    while (true) {
        try {
            return await getMintContract().NFTRoomLevel(tokenId)
        } catch {
            delay(1000)
        }
    }
}

export async function viewNotTransferable(tokenId: Number) : Promise<Boolean> {
    while (true) {
        try {
            return await getMintContract().viewNotTransferable(tokenId)
        } catch {
            delay(1000)
        }
    }
}

export async function getDataAboutCostsForRooms() : Promise<RLArray<BigNumber>> {
    while (true) {
        try {
            return await getMintContract().getDataAboutCostsForRooms()
        } catch {
            delay(1000)
        }
    }
}

export async function getDataAboutLimitsForRooms() : Promise<[RLArray<number>, RLArray<number>]> {
    while (true) {
        try {
            return await getMintContract().getDataAboutLimitsForRooms()
        } catch {
            delay(1000)
        }
    }
}

export async function costs(level: RoomLevel) : Promise<number> {
    while (true) {
        try {
            return await getMintContract().costs(level)
        } catch {
            delay(1000)
        }
    }
}