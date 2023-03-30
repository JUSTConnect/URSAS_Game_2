import css from './index.module.css'


interface props extends React.HTMLAttributes<HTMLButtonElement>
{

}


export default (props: props) => {
    return <button onClick={ props.onClick } className={ css.button }>
        { props.children }
    </button>
}