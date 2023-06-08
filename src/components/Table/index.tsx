import css from './index.module.scss'

import {useRouter} from 'next/router';

import Link from 'next/link'
import {ethers} from "ethers";
import {StatusTable, TableData} from "@lib/types/game";
import {Table} from '@/agents/web3';
import {query} from '@/pages/tables/[room]';
import {useEffect, useState} from "react";
import {getCurrentTableGameEnd} from "@/agents/web3/gameContract/tables";
import Countdown, {zeroPad} from "react-countdown";

export interface props extends Table, React.HTMLAttributes<HTMLDivElement> {
  index: number
  id: string
}

export default (props: props) => {
  const router = useRouter()
  const {room} = router.query as query
  const [time, setTime] = useState(0)

  useEffect(() => {
    getCurrentTableGameEnd(Number(room), props.index - 1).then((data) => {
      if (ethers.BigNumber.isBigNumber(data)) {
        const date = Number(ethers.utils.formatEther(data)) * (10 ** 21)
        setTime(date)
      }
    })
  }, [])

  return (
    <Link
      href={props.placesAvailable ? `/tables/${room}/table/${props.index}` : {}}
      className={
        [
          css.table,
          props.placesAvailable === 0 ? css.disabled : '', props.status === StatusTable.COOLDOWN ? css.cooldown : ''
        ].join(' ')
      }
    >
      <div className={css.bg}>
        <div className={css.layer1}>
          <div className={css.layer2}>
          </div>
        </div>
      </div>
      <div className={css.info}>
        <div className={css.header}>
          <span className={'textMuted'}>table</span>
          <div className={[css.number, 'fontSpecial'].join(' ')}>
            <div className="d-desktop">№ {props.index}</div>
            <div className="d-mobile">Level {props.index}</div>
          </div>
        </div>
        <div className={css.badge}>
          {props.status === StatusTable.COOLDOWN ? (
            <span className={[css.badgeCooldown].join(' ')}>cooldown</span>
          ) : props.status === StatusTable.PLAYING ? (
            <>
              game end
              <div className={css.number}>
                <Countdown
                  date={time}
                  renderer={({hours, minutes, completed}) => {
                    if (completed) {
                      return "00:00";
                    } else {
                      return <span>{zeroPad(hours)}:{zeroPad(minutes)}</span>;
                    }
                  }}
                />
              </div>
            </>
          ) : Number.isInteger(props.placesAvailable) ? (
            <>
              free places
              <div className={css.free}>
                {props.placesAvailable}/10
              </div>
            </>
          ) : ''}
        </div>
      </div>
    </Link>
  )
}