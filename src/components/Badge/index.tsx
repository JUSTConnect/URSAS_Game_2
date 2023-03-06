import css from './index.module.css'

const Badge = (props: React.HTMLAttributes<HTMLDivElement>) => {
    return <div  {...props } className={ css.badge }>
        { props.children }
    </div>
}

export default Badge