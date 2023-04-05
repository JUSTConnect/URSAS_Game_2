import css from './index.module.scss'


enum Variant
{
    NORMAL = 'normal',
    GRADIENT = 'gradient',
    OUTLINE = 'outline',
}

enum Color
{
    LIGHT = 'light',
    DARK = 'dark',
    // PRIMARY = 'primary',
    // PRIMARY = 'danger',
}

enum Size
{
    SM = 'sm',
    MD = 'md',
    LG = 'lg'
}

interface props extends React.HTMLAttributes<HTMLButtonElement>
{
    disabled?: boolean
    variant?: Variant
    size?: Size
    color?: Color
    minWidth?: boolean
    fullWidth?: boolean
    circle?: boolean
}


export default (props: props) => {
    return (
        <button
            onClick={ props.onClick }
            className={
            [
                css.button,
                css[`button-${props.size || Size.LG}`],
                css[props.variant || Variant.GRADIENT],
                css[props.color || Color.LIGHT],
                props.disabled && css.disabled,
                props.minWidth && css.minWidth,
                props.fullWidth && css.fullWidth,
                props.circle && css.circle,
                props.className
            ].join(' ')
        }>
            <div className={ css.inner }>
                { props.children }
            </div>
        </button>
    )
}

export {
    Variant,
    Color,
    Size
}