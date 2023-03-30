import css from './index.module.css'

interface props
{
    bg?: string
}

export default (props: props) => {
    return <div className={ css.loader }>
        <div className={ css.border }></div>
        <div style={{background: props.bg}} className={ css.inner }>
        </div>
    </div>
}