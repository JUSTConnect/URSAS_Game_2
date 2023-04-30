import css from './index.module.scss'

import { useRef, useState, useEffect, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEthers } from '@usedapp/core'

import { RootState } from '@/app/store'
import { setCurrentRoom } from '@/features/game/gameSlice'
import { setGameAccountDialog } from '@/features/mainframe/mainframeSlice'
import { tabs as gameAccountDialogTabs } from '../DialogGameAccount'
import Door from './Door'
import NavigationButton from './NavigationButton'
import Info from './Info'
import DoorList from '@components/RoomsDoorList'
import LoaderLogo from '@components/LoaderLogo'


interface RoomsDoorSliderProps extends React.HTMLAttributes<HTMLDivElement> {
    mode: string
}

interface SliderFragmentProps
{
    indexAdd: number
    currentDoor: number
    scrollStagePercent: number
    selectedDoor: number
    doorRef: any
    over: number
    scroll: Function
}


const SliderFragment = (props: SliderFragmentProps) => {
    const dispatch = useDispatch()
    const { account } = useEthers()

    return (
        <>
            { [...Array(16)].map((item, index) => {
                let level = index + 1
                index += props.indexAdd
                return (
                    <div 
                        style={{
                            bottom: (() => {
                                let c = props.currentDoor
                                let l = 100 - props.scrollStagePercent
                                let r = props.scrollStagePercent

                                switch (-(props.currentDoor - index)) {
                                    case -2: return l / 100 * 10
                                    case 3 : return r / 100 * 10

                                    case -1: return l / 100 * 40 + 10
                                    case 2: return r / 100 * 40 + 10 

                                    case 0: return l / 100 * 26 + 50
                                    case 1: return r / 100 * 26 + 50
                                }
                            })(),
                            opacity: (() => {
                                switch (index) {
                                    case props.selectedDoor: return 1
                                    case props.selectedDoor + 1: 
                                    case props.selectedDoor - 1:
                                        return .9
                                    default: return 0.5
                                }
                            })()
                        }} 
                        ref={index === 0 ? props.doorRef : null}
                        key={index}
                        className={css.slide}
                        onClick={ 
                            ()=> {
                                props.scroll(
                                    (index - props.currentDoor) *
                                    props.doorRef.current.offsetWidth - props.scrollStagePercent/100 *
                                    props.doorRef.current.offsetWidth
                                )
                                if (props.currentDoor + 1 === index) {
                                    dispatch(setCurrentRoom(level))
                                }
                            }
                        }
                    >
                        <Door
                            href={ Boolean(account) && index === props.selectedDoor ? `/tables/${level}` : null }
                            active={ Boolean(account) && index === props.selectedDoor}
                            onClick={ level === 1 ? () => dispatch(setGameAccountDialog([true, gameAccountDialogTabs.STAKE])) : () => {} }
                            level={level}
                            go={false}
                            over={ index-props.indexAdd === props.over-1 }
                        />
                    </div>
                )
            })}
        </>
    )
} 


const RoomsDoorSlider = (props: RoomsDoorSliderProps) => {
    const doorSlider = useRef<HTMLDivElement>(null)
    const doorSliderInner = useRef<HTMLDivElement>(null)
    const door = useRef<HTMLDivElement>(null)

    const [scrollStage, setScrollStage] = useState(0)
    const [scrollStagePercent, setScrollStagePercent] = useState(0)

    const [currentDoor, setCurrentDoor] = useState(0)
    const [selectedDoor, setSelectedDoor] = useState(0)

    const [currentDoorList, setCurrentDoorList] = useState(0)

    const game = useSelector((state: RootState) => state.game)

    useEffect(()=>{
        if (doorSliderInner.current && doorSlider.current && door.current) {
            doorSlider.current.scroll({
                left: doorSliderInner.current.offsetWidth / 3
            })
        }
    },[])


    const scrollHandler = () => {
        let
            doorWidth,
            scrollLeft,
            stage,
            stagePercent,
            current,
            selected

        if (door.current) {
            doorWidth = door.current.offsetWidth
        }
        if (null !== doorSlider.current) {
            scrollLeft = doorSlider.current.scrollLeft
        }
        if (scrollLeft && doorWidth) {

            stage = scrollLeft % doorWidth
            stagePercent = stage / doorWidth * 100
            
            setScrollStagePercent(stagePercent)
            setScrollStage(stage)
            
            current = Math.floor(scrollLeft / doorWidth)
            selected = Math.floor(scrollLeft / doorWidth + (stage > doorWidth / 2 ? 1 : 0))
            
            setCurrentDoor(current)
            setSelectedDoor(selected)
        }
    }

    const scroll = (value: number) => {
        if (null !== doorSlider.current && null !== door.current) {
            doorSlider.current.scroll({
                left: 
                    doorSlider.current.scrollLeft +
                    value,
                behavior: "smooth",
            })
        }
    }

    const prevSlide = () => {
        if (null !== door.current) {
            if (scrollStage>1){
                scroll(-(scrollStage))
            } else {
                scroll(-(door.current.offsetWidth-scrollStage))
            }
        }
    }
    const nextSlide = () => {
        if (null !== door.current) {
            scroll(door.current.offsetWidth-scrollStage)
        }
    }

    return (
        <>
            <div className={
                [
                    css.container,
                    game.loadingRooms && css.containerLoading
                ].join(' ')
            }>
                <div
                    onScroll={ scrollHandler }
                    ref={ doorSlider }
                    className={ [css.slider, props.mode !== 'slide' ? css.sliderHidden: ''].join(' ') }
                >
                    <div ref={ doorSliderInner } className={css.inner}>
                        { [...Array(3)].map((item, index)=>(
                            <SliderFragment
                                key={ index }
                                scroll={ scroll }
                                indexAdd={index*16}
                                currentDoor={currentDoor}
                                selectedDoor={selectedDoor}
                                scrollStagePercent={scrollStagePercent}
                                doorRef={door}
                                over={game.gameOver}
                            />
                        )) }
                    </div>
                    <NavigationButton
                        className={ css.prevButton }
                        onClick={ prevSlide }
                    />
                    <NavigationButton
                        className={ css.nextButton }
                        onClick={ nextSlide}
                    />
                </div> 
                
                { props.mode === 'list' ? (
                    <DoorList currentDoor={ currentDoorList } setCurrentDoor={ setCurrentDoorList }/>
                ) : ''}


                <Info
                    available={234}
                    empty={102}
                    timeGame={'24+2'}
                    hidden={ props.mode === 'list' ? !currentDoorList : props.mode === 'list' }
                />
            </div>
            { game.loadingRooms &&
                <div className={ css.loader }>
                    <LoaderLogo/>
                </div>
            }
        </>
    )
}


export default RoomsDoorSlider