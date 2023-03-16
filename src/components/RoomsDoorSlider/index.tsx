import css from './index.module.css'

import { useRef, useState } from 'react'

import Door from './Door'
import DoorList from '@components/RoomsDoorList'


interface RoomsDoorSliderProps extends React.HTMLAttributes<HTMLDivElement> {
    mode: string
}


const RoomsDoorSlider = (props: RoomsDoorSliderProps) => {
    const doorSlider = useRef<HTMLDivElement>(null)
    const door = useRef<HTMLDivElement>(null)

    const [scrollStage, setScrollStage] = useState(0)
    const [scrollStagePercent, setScrollStagePercent] = useState(0)

    const [currentDoor, setCurrentDoor] = useState(0)
    const [selectedDoor, setSelectedDoor] = useState(0)

    const scrollHandler = () => {
        let
            doorWidth,
            scrollLeft,
            stage,
            stagePercent,
            current,
            selected

        if (null !== door.current) {
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
        if (null !== doorSlider.current) {
            doorSlider.current.scroll({
                left: 
                    doorSlider.current.scrollLeft -
                    scrollStage + 
                    value +
                    1,
                behavior: "smooth",
            })
        }
    }

    const prevSlide = () => {
        if (null !== door.current) {
            scroll(-door.current.offsetWidth)
        }
    }
    const nextSlide = () => {
        if (null !== door.current) {
            scroll(door.current.offsetWidth)
        }
    }

    return <div className={css.container}>
        { props.mode === 'slide' ? (
            <div onScroll={ scrollHandler } ref={ doorSlider } className={ css.doorSlider }>
                <div className={css.doorSliderInner}>
                    { [...Array(16)].map((item, index) => {
                        return (
                            <div 
                                style={{
                                    bottom:
                                        currentDoor - 2 === index ? `${(100 - scrollStagePercent) / 100 * 10}px` :
                                        currentDoor - 1 === index ? `${(100 - scrollStagePercent) / 100 * 40 + 10}px` :
                                        currentDoor === index ? `${(100 - scrollStagePercent) / 100 * 26 + 50}px` :
                                        currentDoor + 1 === index ? `${scrollStagePercent / 100 * 26 + 50}px` :
                                        currentDoor + 2 === index ? `${scrollStagePercent / 100 * 40 + 10}px` :
                                        currentDoor + 3 === index ? `${scrollStagePercent / 100 * 10}px` :
                                        '0',
                                    opacity:
                                        index === selectedDoor ? 1 :
                                        index === selectedDoor + 1 ? 0.9 :
                                        index === selectedDoor - 1 ? 0.9 :
                                        0.5
                                }} 
                                ref={index === 0 ? door : null}
                                key={index}
                                className={css.doorSlide}
                            >
                                <Door
                                    level={index + 1}
                                    active={index === selectedDoor}
                                    go={false}
                                />
                            </div>
                        )
                    })}
                </div>
                <div
                    className={[css.prevButton, css.sliderNavigation].join(' ')}
                    onClick={ prevSlide }
                >
                    <img 
                        className={[css.prevButtonIcon, css.sliderNavigationIcon].join(' ')}
                        src="assets/images/icons/slider-arrow.png"
                        alt="Arrow"
                    />
                </div>

                <div
                    className={[css.nextButton, css.sliderNavigation].join(' ')}
                    onClick={ nextSlide }
                >
                    <img 
                        className={[css.nextButtonIcon, css.sliderNavigationIcon].join(' ')}
                        src="assets/images/icons/slider-arrow.png"
                        alt="Arrow" />
                </div>
            </div>
        ) : (
            <DoorList/>
        )}



        <div className={css.roomsInfo}>
            <img className={css.roomsInfoBg} src="assets/images/texture/rooms-info.png" alt="Rooms info" />
            <div className={css.roomsInfoSection}>
                <div>
                    <div className={css.roomsInfoKey}>available tables</div>
                    <div className={css.roomsInfoValue}>234</div>
                </div>
                <div>
                    <div className={css.roomsInfoKey}>empty tables</div>
                    <div className={css.roomsInfoValue}>102</div>
                </div>
                <div>
                    <div className={css.roomsInfoKey}>time game</div>
                    <div className={css.roomsInfoValue}>24+2</div>
                </div>
            </div>
        </div>
    </div>
}


export default RoomsDoorSlider