import { RoomLevel } from "@/lib/types/game";
import { getGameContract } from "@/lib/utils/web3";
import { BigNumber } from "ethers";

export type GetWholeRoomResponse = Array<{
    currentGameFinishedAt: BigNumber
    currentGameStartedAt: BigNumber
    internalGameReduction: BigNumber
    players: string[]
    playersNow: number
    playersTimeMarks: BigNumber[]
    playingSuits: BigNumber[]
    playingTokenIds: BigNumber[]
    serialNumber: BigNumber
    status: 0 | 1 | 2 // waiting players, playing, cooldown
}>

export async function GetWholeRoom(roomNumber: RoomLevel): Promise<GetWholeRoomResponse> {
    return await getGameContract().GetWholeRoom(roomNumber)
}


export async function currentRoomGameDuration(roomNumber: RoomLevel): Promise<BigNumber> {
    return await getGameContract().currentRoomGameDuration(roomNumber)
}

export async function roomGameDurationIncreaseCounter(roomNumber: RoomLevel): Promise<number> {
    return await getGameContract().roomGameDurationIncreaseCounter(roomNumber)
}

export async function trump() : Promise<BigNumber> {
    return await getGameContract().trump()
}

export async function bulkEnterInGame(roomLevel: Number, tableIndex: Number, tokenIds: Number[]) {
    return await getGameContract().BulkEnterInGame(roomLevel, tableIndex, tokenIds, {gasLimit: 3000000})
}