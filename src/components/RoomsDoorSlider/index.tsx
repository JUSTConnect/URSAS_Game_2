import css from './index.module.scss'

import { useRef, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { AppDispatch, RootState } from '@/app/store'
import { setRooms } from '@/features/rooms/roomsSlice'
import NavigationButton from './NavigationButton'
import Info from './Info'
import DoorList from '@components/RoomsDoorList'
import LoaderLogo from '@components/LoaderLogo'

import SliderFragment from './sliderFragment'

import { SuitsGetName } from '@/lib/types/game'
import { getSeasonDetailTrump } from '@/agents/web3/gameContract/season'
import { getRoomDetail } from '@/agents/web3/gameContract/rooms'
import { RoomLevel } from '@/lib/types/game'
import { Room } from '@/agents/web3'

interface RoomsDoorSliderProps extends React.HTMLAttributes<HTMLDivElement> {
    mode: string
}

const RoomsDoorSlider = (props: RoomsDoorSliderProps) => {
    const dispatch = useDispatch<AppDispatch>()

    const doorSlider = useRef<HTMLDivElement>(null)
    const doorSliderInner = useRef<HTMLDivElement>(null)
    const door = useRef<HTMLDivElement>(null)

    const [scrollStage, setScrollStage] = useState(0)
    const [scrollStagePercent, setScrollStagePercent] = useState(0)

    const [currentDoor, setCurrentDoor] = useState(0)
    const [selectedDoor, setSelectedDoor] = useState(0)

    const [currentDoorList, setCurrentDoorList] = useState(0)

    const game = useSelector((state: RootState) => state.game)
    const rooms = useSelector((state: RootState) => state.rooms)

    useEffect(() => {
        if (doorSliderInner.current && doorSlider.current && door.current) {
            doorSlider.current.scroll({
                left: doorSliderInner.current.offsetWidth / 3
            })
        }
    }, [])


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
            if (scrollStage > 1) {
                scroll(-(scrollStage))
            } else {
                scroll(-(door.current.offsetWidth - scrollStage))
            }
        }
    }
    const nextSlide = () => {
        if (null !== door.current) {
            scroll(door.current.offsetWidth - scrollStage)
        }
    }

    return (
        <>
            <div className={
                [
                    css.container,
                    !rooms.rooms.length && css.containerLoading
                ].join(' ')
            }>
                <div
                    onScroll={scrollHandler}
                    ref={doorSlider}
                    className={[css.slider, props.mode !== 'slide' ? css.sliderHidden : ''].join(' ')}
                >
                    <div ref={doorSliderInner} className={css.inner}>
                        {[...Array(3)].map((item, index) => (
                            <SliderFragment
                                key={index}
                                scroll={scroll}
                                indexAdd={index * 16}
                                currentDoor={currentDoor}
                                selectedDoor={selectedDoor}
                                scrollStagePercent={scrollStagePercent}
                                doorRef={door}
                                over={game.gameOver}
                            />
                        ))}
                    </div>
                    <NavigationButton
                        className={css.prevButton}
                        onClick={prevSlide}
                    />
                    <NavigationButton
                        className={css.nextButton}
                        onClick={nextSlide}
                    />
                </div>

                {props.mode === 'list' ? (
                    <DoorList currentDoor={currentDoorList} setCurrentDoor={setCurrentDoorList} />
                ) : ''}


                <Info
                    roomsInfo={rooms.rooms[selectedDoor % 16]}
                    hidden={props.mode === 'list' ? !currentDoorList : props.mode === 'list'}
                />
            </div>
            {!rooms.rooms.length &&
                <div className={css.loader}>
                    <LoaderLogo />
                </div>
            }
        </>
    )
}


export default RoomsDoorSlider