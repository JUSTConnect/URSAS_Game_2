import css from './index.module.css'

interface BlurProps
{
    isActive?: boolean
}

const Blur = (props: BlurProps) => {
    return (
        <div className={ [css.blur, props.isActive? css.active : ''].join(' ') }>

        </div>
    )
}


export default Blur