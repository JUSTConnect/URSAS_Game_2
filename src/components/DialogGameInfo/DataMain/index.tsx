import css from './index.module.scss'

import type { info } from '..'

interface props
{
    data?: info
}

export default (props: props) => {
    return (
        <>
            <div className={ css.row }>
                Game start date: <span className={ 'textPrimary' }>13 March 2023 00:01</span>
            </div>
            <div className={ css.row }>
                Game finish date: <span className={ 'textPrimary' }>23 March 2023 00:01</span>
            </div>
            <div className={ css.row }>
                Game duration time: <span className={ 'textPrimary' }>6 Days 12 Hours 43 Minutes</span>
            </div>
            <div className={ css.row }>
                Announcement of results: <span className={ 'textPrimary' }>32:17</span>
            </div>
            <div className={ css.row }>
                Prize chain: <span className={ 'textPrimary' }>Polygon</span>
            </div>
            <div className={ css.row }>
                Type Prize: <span className={ 'textPrimary' }>{ props.data?.typePrize }</span>
            </div>
            <div className={ css.row }>
                Prize: <span className={ 'textPrimary' }>Y00TOS </span>
            </div>
            <div className={ css.row }>
                Distribution participants: <span className={ 'textPrimary' }>100</span>
            </div>
            <div className={ css.row }>
                Distribution system: <span className={ 'textPrimary' }>Raffle</span>
            </div>
            <div className={ css.row }>
                Winners: <span className={ 'textPrimary' }>1</span>
            </div>
            <div className={ css.row }>
                Total game complete: <span className={ 'textPrimary' }>12320</span>
            </div>
        </>
    )
}