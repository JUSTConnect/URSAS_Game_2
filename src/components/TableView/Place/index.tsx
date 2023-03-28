import css from './index.module.css'


interface props
{
    number: number
    active?: boolean
    empty?: boolean
}


export default (props: props) => {
    return <div className={ 
        [
            css.place,
            css[`place${props.number}`],
            props.active ? css.active : '',
            props.empty ? css.empty : ''
        ].join(' ')  
    }>
        <img className={ css.card } src="/assets/images/texture/example-card.png" alt="Card example" />
        <div className={ css.info }>
            place
            <br />
            <span className={ [css.number, 'fontSpecial'].join(' ') }>№ { props.number }</span>
        </div>
    </div>
}