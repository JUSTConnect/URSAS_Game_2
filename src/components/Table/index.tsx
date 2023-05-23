import css from './index.module.scss'

import Link from 'next/link'
import {ethers} from "ethers";
import {StatusTable, TableData} from "@lib/types/game";

export interface props extends TableData, React.HTMLAttributes<HTMLDivElement> {
    index: number
    id: string
}

export default (props: props) => {
    return (
      <Link
        href={props.playersNow === 10 ? {} : `/tables/${props.id}/table/${props.index}`}
        className={
            [
                css.table,
                (props.playersNow) === 10 ? css.disabled : '', props.status === StatusTable.COOLDOWN ? css.cooldown : ''
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
                            {+ethers.utils.formatEther(props.currentGameFinishedAt) * 1000}
                        </div>
                    </>
                  ) : Number.isInteger(10 - props.playersNow) ? (
                    <>
                        free places
                        <div className={css.free}>
                            {10 - props.playersNow}/10
                        </div>
                    </>
                  ) : ''}
              </div>
          </div>
      </Link>
    )
}