import css from './index.module.css'

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>
{
    transparentMobile?: boolean
    loading?: boolean
}

const Loader = () => {
    return <div className={ css.loaderContainer }>
        <div className={ css.loaderContainerInner }>
            <div className={ css.loaderBorder }>
                <div className={ css.loaderBorderInner }>

                </div>
            </div>
            <div className={ css.loader }>
                <div className={ css.loaderInner }></div>
            </div>
        </div>
    </div>
}

const Badge = (props: BadgeProps) => {
    return <div className={ [css.badge, props.transparentMobile ? css.transparentMobile : ''].join(' ') }>
        { props.loading ? (
            <Loader/>
        ) : (
            <span className={ css.value }>
                { props.children }
            </span>
        ) }
    </div>
}

export default Badge