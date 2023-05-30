import { getGameContract } from "@/lib/utils/web3";

import * as gameFunctions from './functions'
import type * as gameTypes from '..'

export async function getSeasonDetailTrump() {
    return Number(await gameFunctions.trump())
}

export async function getSeasonDetail() : Promise<gameTypes.Season> {
    return {
        trump: await getSeasonDetailTrump()
    }
}