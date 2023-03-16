import { useState } from 'react'
import Image from 'next/image'

import css from './index.module.css'


import Badge from '@components/Badge'


type controller = {
    id: number
    currentId: number
    setId: Function
}


interface DropdownProps extends React.HTMLAttributes<HTMLDivElement>
{
    text: React.ReactElement
    badgeValue: number
    callback?: Function
    controller?: controller
    values: Array<Array<Number>>
    rooms?: boolean
    tables?: boolean
}


const Dropdown = (props: DropdownProps) => {
    const [active, setActive] = useState(false)

    const isCurrent = () => {
        if (props.controller) {
            let c = props.controller
            return c.id === c.currentId
        }
    }

    const isActive = () => {
        return isCurrent() ? true : active 
    }

    return <div className={ css.dropdown }>
        <button
            className={ css.dropdown__button }
            onClick={
                () => {
                    if (props.controller) {
                        let c = props.controller
                        props.callback ? props.callback(!isCurrent()) : null
                        isCurrent() ? c.setId(0) : c.setId(c.id)
                    } else {
                        props.callback ? props.callback(!active) : null
                        setActive(!active)
                    }
                } 
            }>
            { props.text }       
            <div className={ css.dropdownBadge }>{ props.badgeValue }</div>
            <svg className={ [css.arrowIcon, isActive() ? css.arrowIconActive : '' ].join(' ') } viewBox="0 0 8 6" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.43301 5.25C4.24056 5.58333 3.75944 5.58333 3.56699 5.25L0.968911 0.75C0.776461 0.416667 1.01702 6.10471e-07 1.40192 5.76822e-07L6.59808 1.2256e-07C6.98298 8.8911e-08 7.22354 0.416667 7.03109 0.75L4.43301 5.25Z" fill="#B5C4E3"/>
            </svg>
        </button>
        <div className={ [css.dropdown__data, isActive() ? css.dropdown__dataActive : ''].join(' ') }>
            <img className={ css.dataAngleLeft } src="assets/images/texture/dropdown-angle-left.png" alt="" />
            <img className={ css.dataAngleRight } src="assets/images/texture/dropdown-angle-right.png" alt="" />
            { props.rooms ? (
                <>
                    { props.values.map((item, index)=>{
                        return <div key={ index } className={css.dataItem}>
                            <><span className={ 'textMuted' }>Room</span> { item[0] } level</>
                        </div>
                    }) }
                </>
            ) : '' }
            { props.tables ? (
                <>
                    { props.values.map((item, index)=>{
                        return <div key={ index } className={css.dataItem}>
                            <><span className={ 'textMuted' }>Table</span> №{ item[0] } - <span className={ 'textMuted' }>Place</span> №{ item[1] }</>
                        </div>
                    }) }
                </>
            ) : '' }
        </div>
    </div>
}

export default Dropdown