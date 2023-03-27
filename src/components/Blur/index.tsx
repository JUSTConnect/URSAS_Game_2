import css from './index.module.css'

interface BlurProps extends React.HTMLAttributes<HTMLButtonElement>
{
    isActive?: boolean
}

const Blur = (props: BlurProps) => {
    return (
        <button onClick={ props.onClick }  className={ [css.blur, props.isActive? css.active : ''].join(' ') }>

        </button>
    )
}


export default Blur