import css from './index.module.css'

import Place from '@components/UIPlace'
import type { PlaceProps } from '@/components/UIPlace'


export default (props: PlaceProps) => {
    return (
        <Place
            { ...props }
            onClick={ !props.loading ? props.onClick : () => {} }
            className={
                [
                    css.place,
                    css[`place${props.number}`]
                ].join(' ')
            }
        />
    )
}