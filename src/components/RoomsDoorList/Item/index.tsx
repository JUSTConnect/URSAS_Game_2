import css from './index.module.css'

import Link from 'next/link'
import {useSelector} from "react-redux";
import {RootState} from "@/app/store";
import {RoomLevel} from "@lib/types/game";

interface ItemProps extends React.HTMLAttributes<HTMLButtonElement> {
  level: number
  go: boolean
  onClick?: any
  over?: boolean
}


const Item = (props: ItemProps) => {
  const game = useSelector((state: RootState) => state.game)
  const available = game.walletCards.map(card => card.rank).includes(props.level as RoomLevel)
  const go = available ? props.go : false

  return <Link href={go && available && props.level !== 1 ? `/tables/${props.level}` : {}} onClick={!props.over ? props.onClick : null}
               className={css.doorItem}>
    {
      go ? <img className={css.bg} src="/assets/images/texture/door-item-active-bg.png" alt="Door Item BG"/> :
        props.over ? <img className={css.bg} src="/assets/images/texture/door-item-over-bg.png" alt="Door Item BG"/> :
          <img className={css.bg} src="/assets/images/texture/door-item-bg.png" alt="Door Item BG"/>
    }
    <div className={[css.doorItemInfo, props.over ? css.doorItemInfoOver : ''].join(' ')}>
      {!go ? (
        <div className={[css.doorInfoPokerRoom, 'textMuted'].join(' ')}>
          {props.over ? (
            'game over'
          ) : (
            'poker room'
          )}
        </div>
      ) : ('')}
      <div className={[css.level, 'fontSpecial'].join(' ')}>
        {props.level} level
      </div>
      {go ? (
        <div className={[css.go, 'textMuted'].join(' ')}>
          go
        </div>
      ) : ('')}
    </div>
  </Link>
}

export default Item