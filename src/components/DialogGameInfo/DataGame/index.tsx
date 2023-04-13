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
                Time elapsed: <span className={ 'textPrimary' }>32 h 17 min</span>
            </div>
            <div className={ css.row }>
                Percent visitor{"'"}s Black room: <span className={ 'textPrimary' }>3%</span>
            </div>
            <div className={ css.row }>
                Senior suit: <span className={ 'textPrimary' }>Heart</span>
            </div>
            <div className={ css.row }>
                Base time of game: <span className={ 'textPrimary' }>24 h</span>
            </div>
            <div className={ css.row }>
                Increase time: <span className={ 'textPrimary' }>1 h</span>
            </div>
        </>
    )
}