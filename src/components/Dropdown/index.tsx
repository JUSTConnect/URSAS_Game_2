import { useState } from 'react'
import Image from 'next/image'

import css from './index.module.css'


import Badge from '@components/Badge'


interface DropdownProps extends React.HTMLAttributes<HTMLDivElement>
{
    text: React.ReactElement;
    badgeValue: number;
}


const Dropdown = (props: DropdownProps) => {
    const [active, setActive] = useState(false)

    const values = [
        'Table №12 - Place №10',
        'Table №12 - Place №11'
    ] 
    return <div className={ css.dropdown }>
        <button className={ css.dropdown__button } onClick={ () => setActive(!active) }>
            { props.text }       
            <Badge>{ props.badgeValue }</Badge>
            <Image
                src="/assets/images/icons/arrow.png"
                width={ 8 }
                height={ 6 }
                alt='arrow'
            />
        </button>
        <div className={ [css.dropdown__data, active ? css.dropdown__dataActive : ''].join(' ') }>
            { values.map(item=>{
                return <div key={ item } className="dropdown__dataItem">{ item }</div>
            }) }
        </div>
    </div>
}

export default Dropdown