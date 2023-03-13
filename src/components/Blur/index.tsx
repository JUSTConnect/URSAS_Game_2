import css from './index.module.css'

interface BlurProps
{
    active?: boolean
}

const Blur = (props: BlurProps) => {
    return (
        <div className={ [css.blur, props.active? css.active : ''].join(' ') }>

        </div>
    )
}


export default Blur