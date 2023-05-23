import css from './index.module.css'


interface props extends React.HTMLAttributes<HTMLButtonElement>
{
    active?: number
}


export default (props: props) => {
    return <button onClick={ props.onClick } className={ [css.button, props.active ? css.active : ''].join(' ') } disabled={!props.active}>
        { props.children }
    </button>
}