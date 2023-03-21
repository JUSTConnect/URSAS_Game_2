import css from './index.module.css'


interface props
{
    available: number
    empty: number
    timeGame: string
    hidden?: boolean
}

export default (props: props) => {
    return <div className={ [css.info, props.hidden ? css.infoHidden: ''].join(' ') }>
        <img className={css.bg} src="assets/images/texture/rooms-info.png" alt="Rooms info" />
        <div className={css.section}>
            <div>
                <div className={css.key}>available tables</div>
                <div className={css.value}>{ props.available }</div>
            </div>
            <div>
                <div className={css.key}>empty tables</div>
                <div className={css.value}>{ props.empty }</div>
            </div>
            <div>
                <div className={css.key}>time game</div>
                <div className={css.value}>{ props.timeGame }</div>
            </div>
        </div>
    </div>
}