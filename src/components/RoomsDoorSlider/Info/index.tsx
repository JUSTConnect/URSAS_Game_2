import css from './index.module.css'
import {SuitsGetName} from "@lib/types/game";
import { Room } from '@/agents/web3';

import { useSelector } from 'react-redux';

import { RootState } from '@/app/store';
import {formatTime} from "@lib/utils/formatTime";


interface props {
    roomsInfo: Room
    hidden?: boolean
    room: number
}

export default ({roomsInfo, hidden, room}: props) => {

    const season = useSelector((state: RootState) => state.game)

    return <div className={[css.info, hidden ? css.infoHidden : ''].join(' ')}>
        <img className={css.bg} src="/assets/images/texture/rooms-info.png" alt="Rooms info"/>
        <div className={css.section}>
            <div>
                <div className={css.key}>available tables</div>
                <div className={css.value}>{roomsInfo?.tables?.length}</div>
            </div>
            <div>
                <div className={css.key}>empty tables</div>
                <div className={css.value}>{roomsInfo?.availableTablesCount}</div>
            </div>
            { room !== 0 && <>
            <div>
                <div className={css.key}>suit</div>
                <div className={css.value}>{ season.season && SuitsGetName[season.season.trump] }</div>
            </div>
            <div>
                <div className={css.key}>time game</div>
                <div className={css.value}>
                    {(!!roomsInfo?.roomDuration && formatTime(roomsInfo.roomDuration)) || '0s'}
                    +
                    {(!!roomsInfo?.roomIncreaseCounter && formatTime(roomsInfo.roomIncreaseCounter)) || '0s'}</div>
            </div>
                </>
            }
        </div>
    </div>
}