import css from './index.module.scss'

import { CardNFT } from '@/lib/types/game'
import Place from '@/components/UIPlace'

interface props extends React.HTMLAttributes<HTMLButtonElement>
{
    number?: number
    card?: CardNFT
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
