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

    const values = [
        'Table №12 - Place №10',
        'Table №12 - Place №11'
    ] 
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
            <Image
                src="/assets/images/icons/arrow.png"
                width={ 8 }
                height={ 6 }
                alt='arrow'
            />
        </button>
        <div className={ [css.dropdown__data, isActive() ? css.dropdown__dataActive : ''].join(' ') }>
            <img className={ css.dataAngleLeft } src="assets/images/texture/dropdown-angle-left.png" alt="" />
            <img className={ css.dataAngleRight } src="assets/images/texture/dropdown-angle-right.png" alt="" />
            { values.map(item=>{
                return <div key={ item } className={css.dataItem}>{ item }</div>
            }) }
        </div>
    </div>
}

export default Dropdown