import css from './index.module.css'
import {SuitsGetName} from "@lib/types/game";
import { Room } from '@/agents/web3';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import { AppDispatch, RootState } from '@/app/store';
import { getSeasonDetail, getSeasonDetailTrump } from '@/agents/web3/gameContract/season';
import { setSeason } from '@/features/game/gameSlice';
import { isNumber, isUndefined } from 'util';
import { NumericLiteral } from 'typescript';

interface props {
    roomsInfo: Room
    hidden?: boolean
}

export default ({roomsInfo, hidden}: props) => {
    const dispatch = useDispatch<AppDispatch>()

    const season = useSelector((state: RootState) => state.game)

    useEffect(() => {
        const fetchData = async () => {
            dispatch(setSeason(await getSeasonDetail()))
        }
        fetchData()
    }, [])

    return <div className={[css.info, hidden ? css.infoHidden : ''].join(' ')}>
        <img className={css.bg} src="/assets/images/texture/rooms-info.png" alt="Rooms info"/>
        <div className={css.section}>
            <div>
                <div className={css.key}>available tables</div>
                <div className={css.value}>{roomsInfo?.tables.length}</div>
            </div>
            <div>
                <div className={css.key}>empty tables</div>
                <div className={css.value}>{roomsInfo?.availableTablesCount}</div>
            </div>
            <div>
                <div className={css.key}>suit</div>
                <div className={css.value}>{ season.season && SuitsGetName[season.season.trump] }</div>
            </div>
            <div>
                <div className={css.key}>time game</div>
                <div className={css.value}>
                    {roomsInfo?.roomDuration && roomsInfo.roomDuration / 3600}
                    +
                    {roomsInfo?.roomIncreaseCounter && roomsInfo.roomIncreaseCounter / 3600}</div>
            </div>
        </div>
    </div>
}