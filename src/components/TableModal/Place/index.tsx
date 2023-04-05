import css from './index.module.scss'


import type { Card } from '@/components/Card'
import Place from '@/components/UIPlace'

interface props extends React.HTMLAttributes<HTMLButtonElement>
{
    number?: number
    card?: Card
    active?: boolean
}


export default (props: props) => {
    return (
        <Place
            className={
                [
                    css.place,
                    props.active && css.active
                ].join(' ')
            }
            onClick={ props.onClick }

            number={ props.number }
            card={ props.card }
        />
    )
}

export type { props }
