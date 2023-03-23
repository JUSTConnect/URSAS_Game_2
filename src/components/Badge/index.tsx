import css from './index.module.css'

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>
{
    transparentMobile?: boolean
}

const Badge = (props: BadgeProps) => {
    return <div className={ [css.badge, props.transparentMobile ? css.transparentMobile : ''].join(' ') }>
        <span className={ css.value }>
            { props.children }
        </span>
    </div>
}

export default Badge