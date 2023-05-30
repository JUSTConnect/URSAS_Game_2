import css from './index.module.scss'

import { RoomLevel } from '@/lib/types/game'

import { AppDispatch } from '@/app/store'
import { useSelector, useDispatch } from 'react-redux'
import { useEthers } from '@usedapp/core'

import { RootState } from '@/app/store'
import { setCurrentRoom } from '@/features/game/gameSlice'
import { setGameAccountDialog } from '@/features/mainframe/mainframeSlice'

import {tabs as gameAccountDialogTabs} from '@components/DialogGameAccount'


import Door from './Door'

interface SliderFragmentProps {
    indexAdd: number
    currentDoor: number
    scrollStagePercent: number
    selectedDoor: number
    doorRef: any
    over: number
    scroll: Function
}


export default (props: SliderFragmentProps) => {
    const dispatch = useDispatch<AppDispatch>()
    const {account} = useEthers()

    return (
      <>
          {[...Array(16)].map((item, index) => {
              let level: RoomLevel = index + 1 as RoomLevel
              index += props.indexAdd
              return (
                <div
                  style={{
                      bottom: (() => {
                          let c = props.currentDoor
                          let l = 100 - props.scrollStagePercent
                          let r = props.scrollStagePercent

                          switch (-(props.currentDoor - index)) {
                              case -2:
                                  return l / 100 * 10
                              case 3 :
                                  return r / 100 * 10

                              case -1:
                                  return l / 100 * 40 + 10
                              case 2:
                                  return r / 100 * 40 + 10

                              case 0:
                                  return l / 100 * 26 + 50
                              case 1:
                                  return r / 100 * 26 + 50
                          }
                      })(),
                      opacity: (() => {
                          switch (index) {
                              case props.selectedDoor:
                                  return 1
                              case props.selectedDoor + 1:
                              case props.selectedDoor - 1:
                                  return .9
                              default:
                                  return 0.5
                          }
                      })()
                  }}
                  ref={index === 0 ? props.doorRef : null}
                  key={index}
                  className={css.slide}
                  onClick={
                      () => {
                          props.scroll(
                            (index - props.currentDoor) *
                            props.doorRef.current.offsetWidth - props.scrollStagePercent / 100 *
                            props.doorRef.current.offsetWidth
                          )
                          if (props.currentDoor + 1 === index) {
                              dispatch(setCurrentRoom(level))
                          }
                      }
                  }
                >
                    <Door
                      href={Boolean(account) && index === props.selectedDoor ? `/tables/${level}` : null}
                      active={Boolean(account) && index === props.selectedDoor}
                      onClick={level === 1 ? () => dispatch(setGameAccountDialog([true, gameAccountDialogTabs.STAKE])) : () => {
                      }}
                      level={level}
                      go={false}
                      over={index - props.indexAdd === props.over - 1}
                    />
                </div>
              )
          })}
      </>
    )
}

