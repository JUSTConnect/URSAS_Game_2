import css from './index.module.css'


interface props
{
    number: number
    active?: boolean
}


export default (props: props) => {
    return <img
        className={ 
            [
                css.sofa, css[`sofa${ props.number }`],
                props.active ? css.sofaActive : ''
            ].join(' ') 
        } src="assets/images/texture/table-sofa.png" alt="Sofa" 
    />
}