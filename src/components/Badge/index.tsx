import css from './index.module.css'

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>
{
    transparentMobile?: boolean
}

const Badge = (props: BadgeProps) => {
    return <div className={ [css.badge, props.transparentMobile ? css.transparentMobile : ''].join(' ') }>
        { props.children }
    </div>
}

export default Badge