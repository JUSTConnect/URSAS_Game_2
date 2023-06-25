import css from './index.module.css'

import {useDispatch, useSelector} from 'react-redux'
import {useEthers} from '@usedapp/core'

import {RootState} from '@/app/store'
import Item from './Item'
import {setGameAccountDialog, setRefetch} from "@/features/mainframe/mainframeSlice";
import {tabs as gameAccountDialogTabs} from "@components/DialogGameAccount";
import {setLoaderButton} from "@/features/table/tableSlice";
import {enterInGameByTokenIds} from "@/agents/web3/gameContract/tables";


interface DoorListProps extends React.HTMLAttributes<HTMLDivElement> {
  currentDoor: number
  setCurrentDoor: Function
}


const DoorList = (props: DoorListProps) => {
  const {account} = useEthers()
  const dispatch = useDispatch()
  const firstRoomCards = useSelector((state: RootState) => state.game.walletCards.filter(card => card.rank === 1 && !card.playing))

  return <div className={css.container}>
    <div className={css.doorItemList}>
      {/*<Item*/}
      {/*    level={1}*/}
      {/*    go={ Boolean(account) && props.currentDoor === 1 }*/}
      {/*    onClick={ ()=> props.setCurrentDoor(1) }*/}
      {/*/>*/}
      {/*<Item*/}
      {/*    level={2}*/}
      {/*    over={ Boolean(account) &&  true}*/}
      {/*    go={ Boolean(account) && props.currentDoor === 2 }*/}
      {/*    onClick={ ()=> props.setCurrentDoor(2) }*/}
      {/*/>*/}
      {[...Array(16)].map((item, index) => {
        return <Item
          level={index + 1}
          go={Boolean(account) && props.currentDoor === index + 1}
          key={index}
          onClick={() => {
            props.setCurrentDoor(index + 1)
            if (index === 0) {
              dispatch(setGameAccountDialog([true, gameAccountDialogTabs.STAKE]))
              dispatch(setLoaderButton(true))
              if (firstRoomCards.length) {
                enterInGameByTokenIds(1, 0, firstRoomCards.map(card => card.tokenId) as number[]).then(() => {
                  dispatch(setLoaderButton(false))
                  dispatch(setRefetch(true))
                }).catch(() => {
                  dispatch(setLoaderButton(false))
                })
              }
            }
          }}
        />
      })}
    </div>
  </div>
}


export default DoorList