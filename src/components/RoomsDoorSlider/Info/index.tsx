import css from './index.module.css'
import {IRoomsInfo} from "@/features/rooms/roomsSlice";
import {SuitsGetName} from "@lib/types/game";

interface props {
    roomsInfo: IRoomsInfo
    hidden?: boolean
}

export default ({roomsInfo, hidden}: props) => {
    return <div className={[css.info, hidden ? css.infoHidden : ''].join(' ')}>
        <img className={css.bg} src="/assets/images/texture/rooms-info.png" alt="Rooms info"/>
        <div className={css.section}>
            <div>
                <div className={css.key}>available tables</div>
                <div className={css.value}>{roomsInfo?.availableTables}</div>
            </div>
            <div>
                <div className={css.key}>empty tables</div>
                <div className={css.value}>{roomsInfo?.emptyTables}</div>
            </div>
            <div>
                <div className={css.key}>suit</div>
                <div className={css.value}>{SuitsGetName[roomsInfo?.trump]}</div>
            </div>
            <div>
                <div className={css.key}>time game</div>
                <div className={css.value}>{roomsInfo?.roomDuration} + {roomsInfo?.roomIncreaseCounter}</div>
            </div>
        </div>
    </div>
}