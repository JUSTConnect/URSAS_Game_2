import css from './index.module.css'

interface props extends React.HTMLAttributes<HTMLButtonElement>
{

}


export default (props: props) => {
    return <button
        className={[props.className, css.navigation].join(' ')}
        onClick={ props.onClick }
    >
        <i className="fa-solid fa-play"></i>
    </button>
}