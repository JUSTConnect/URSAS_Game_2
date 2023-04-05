import css from './index.module.scss'


enum Variant
{
    h1 = 'h1',
    h2 = 'h2',
    p = 'p',
    small = 'small'
}


interface props extends React.HTMLAttributes<HTMLDivElement>
{
    inline?: boolean
    variant?: Variant
    muted?: boolean
}


export default (props: props) => {
    return (
        <div className={
            [
                css.text,
                css[props.variant || Variant.p],
                props.inline && css.inline,
                props.muted && css.muted
            ].join(' ')
        }>
            { props.children }
        </div>
    ) 
}

export { Variant }