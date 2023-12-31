import {getGameContract, getMintContract} from "@/lib/utils/web3"

import {BigNumber} from "ethers"
import {RoomLevel} from "@/lib/types/game"
import {CardNFT} from "@/lib/types/game"
import {getRoomDetailMintCost} from "./rooms"

import * as mintFunctions from './functions'

export async function getCardListUserNew(hash: string): Promise<CardNFT[]> {
  try {
    await new Promise(resolve => setTimeout(resolve, 1000));
    let ids = await mintFunctions.tokensOfOwner(hash)
    if (ids) {
      let data = await mintFunctions.viewCardsInfo(ids)
      return ids.map((id, index) => Object({
        tokenId: Number(id),
        rank: Number(data[0][index]),
        suit: data[1][index] ? data[1][index] : 's',
        playing: data[2][index]
      }))
    } else return []
  } catch (e) {
    console.log(e, 'error')
    await new Promise(resolve => setTimeout(resolve, 1000));
    let ids = await mintFunctions.tokensOfOwner(hash)
    if (ids) {
      let data = await mintFunctions.viewCardsInfo(ids)
      return ids.map((id, index) => Object({
        tokenId: Number(id),
        rank: Number(data[0][index]),
        suit: data[1][index] ? data[1][index] : 's',
        playing: data[2][index]
      }))
    } else return []
    // return []
  }
}

export async function getCardListUser(hash: string): Promise<CardNFT[]> {
  let cardIds = await mintFunctions.tokensOfOwner(hash)
  return await Promise.all(cardIds?.map(async (cardId: BigNumber) => {
    let suit = await getCardDetailSuit(Number(cardId))
    return {
      tokenId: Number(cardId),
      suit: suit ? suit : 's',
      rank: await getCardDetailRank(Number(cardId)),
      playing: await getCardDetailTransferable(Number(cardId))
    }
  }))
}

export async function getCardDetailSuit(tokenId: Number) {
  return await mintFunctions.suits(tokenId)
}

export async function getCardDetailRank(tokenId: Number) {
  return await mintFunctions.NFTRoomLevel(tokenId)
}

export async function getCardDetailTransferable(tokenId: Number) {
  return await mintFunctions.viewNotTransferable(tokenId)
}

export const cardMint = async (level: RoomLevel, amount: number) => {
  let mintCost = await getRoomDetailMintCost(level)
  return await getMintContract().newSmartMint(amount, level, {gasLimit: 3000000, value: mintCost * amount})
}

export const cardBurn = async (tokenId: Number[]) => {
  try {
    const transaction = await getMintContract().burn(tokenId[0])
    return await transaction.wait().then(async (receipt: any) => {
      if (receipt && receipt.status == 1) {
        return true
      }
    }).catch((e: any) => {
      console.log(e)
      return false
    })
  } catch (e) {
    console.log(e)
  }
}

export const cardRefund = async (tokenId: Number[]) => {
  try {
    const transaction = await getGameContract().refundYourNFT(tokenId, {gasLimit: 3000000})
    return await transaction.wait().then(async (receipt: any) => {
      if (receipt && receipt.status == 1) {
        return true
      }
    }).catch((e: any) => {
      console.log(e)
      return false
    })
  } catch (e) {
    console.log(e)
  }
}