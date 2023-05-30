import { getMintContract } from "@/lib/utils/web3"

import { BigNumber } from "ethers"
import { RoomLevel } from "@/lib/types/game"
import { CardNFT } from "@/lib/types/game"
import { getRoomDetailMintCost } from "./rooms"


export const getCardListUser = async function getCardListUser (hash: string) : Promise<CardNFT[]> {
    let cardIds: BigNumber[] = await getMintContract().tokensOfOwner(hash)
    return await Promise.all(cardIds.map(async (cardId: BigNumber)=>{
        let suit = await getMintContract().suits(cardId) 
        return {
            tokenId: String(cardId),
            suit: suit ? suit : 's',
            rank: await getMintContract().NFTRoomLevel(cardId)
        }
    }))
}  


export const cardMint = async (level: RoomLevel, amount: number) => {
    let mintCost = await getRoomDetailMintCost(level)
    return await getMintContract().smartMint(amount, level, {gasLimit: 3000000, value: mintCost * amount})
}