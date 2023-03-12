import css from './index.module.css'
import "swiper/css";
import "swiper/css/pagination";

import { useRef, useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from 'swiper'

import Door from '@components/RoomsDoor'


interface RoomsDoorSliderProps extends React.HTMLAttributes<HTMLDivElement>
{
  
}


const RoomsDoorSlider = (props: RoomsDoorSliderProps) => {
  const doorSlider = useRef(0)
  const doorSliderInner = useRef(0)
  const door = useRef(0)

  const [doors, setDoors] = useState([1,1,1,1,1,1,1,1,1,1,1])

  const [scrollStage, setScrollStage] = useState(0)
  const [currentDoor, setCurrentDoor] = useState(0)
  const [selectedDoor , setSelectedDoor] = useState(0)
  const [stagePercent, setStagePercent] = useState(0)

  return <div className={ css.container }>
    <div onScroll={ (e)=>{
      let doorWidth = door.current.offsetWidth
      let sliderInnerWidth = doorSliderInner.current.offsetWidth 
      let scrollLeft = e.target.scrollLeft
      let stage = scrollLeft % doorWidth
      let stagePercent = stage / doorWidth * 100
      let currentDoor = Math.floor(scrollLeft / doorWidth)
      let selectedDoor = Math.floor(scrollLeft / doorWidth + (stage > doorWidth / 2 ? 1 : 0) )

      setStagePercent(stagePercent)
      setCurrentDoor(currentDoor)
      setSelectedDoor(selectedDoor)
      setScrollStage(stage)
      console.log(stage)
    } } ref={ doorSlider } className={ css.doorSlider }>
      <div className={ css.doorSliderInner } ref={ doorSliderInner }>
        { doors.map((index,item)=>{
          return (
            <div style={ {
              bottom: 
                currentDoor-2 === item ? `${(100 - stagePercent)/100 * 10}px` :              
                currentDoor-1 === item ? `${(100 - stagePercent)/100 * 40 + 10}px` :
                currentDoor === item ? `${(100 - stagePercent)/100 * 26 + 50}px` : 
                currentDoor+1 === item ? `${stagePercent/100 * 26 + 50}px` :
                currentDoor+2 === item ? `${stagePercent/100 * 40 + 10}px` :
                currentDoor+3 === item ? `${stagePercent/100 * 10}px` :
                '0',
              opacity: 
                item === selectedDoor ? 1 : 
                item === selectedDoor + 1 ? 0.9 :
                item === selectedDoor - 1 ? 0.9 :
                0.3
            } } ref={ item === 0 ? door : null  } key={item} className={ css.doorSlide }>
              <Door
                level={item}
                active={ item === selectedDoor }
                go={false}
              />
            </div>
          )
        }) }
      </div>
    </div>

    <div 
      className={ [css.prevButton, css.sliderNavigation].join(' ') }
      onClick={
        () => {
          doorSlider.current.scroll({
            left: 
              doorSlider.current.scrollLeft -
              scrollStage -
              door.current.offsetWidth ,
            behavior: "smooth",
          })
        } 
      }
      >
      <img className={ [css.prevButtonIcon, css.sliderNavigationIcon].join(' ') } src="assets/images/icons/slider-arrow.png" alt="" />
    </div>

    <div 
      className={ [css.nextButton, css.sliderNavigation].join(' ') }
      onClick={
        () => {
          doorSlider.current.scroll({
            left: 
              doorSlider.current.scrollLeft +
              door.current.offsetWidth -
              scrollStage,
            behavior: "smooth",
          })
        } 
      }
    >
      <img className={ [css.nextButtonIcon, css.sliderNavigationIcon].join(' ') } src="assets/images/icons/slider-arrow.png" alt="" />
    </div>

    <div className={ css.roomsInfo }>
      <img className={ css.roomsInfoBg } src="assets/images/texture/rooms-info.png" alt="Rooms info" />
      <div className={ css.roomsInfoSection }>
        <div>
          <div className={ css.roomsInfoKey }>available tables</div>
          <div className={ css.roomsInfoValue }>102</div>
        </div>
        <div>
          <div className={ css.roomsInfoKey }>empty tables</div>
          <div className={ css.roomsInfoValue }>102</div>
        </div>
        <div>
          <div className={ css.roomsInfoKey }>time game</div>
          <div className={ css.roomsInfoValue }>102</div>
        </div>
      </div>
    </div>
  </div>
}


export default RoomsDoorSlider