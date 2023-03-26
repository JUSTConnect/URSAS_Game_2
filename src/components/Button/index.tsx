import css from './index.module.css'

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement>
{
    children: any
    primary?: boolean
}

const Button = (props: ButtonProps) => {
    return <button 
        onClick={ props.onClick }
        className={ [
            css.button,
            props.primary ? css.buttonPrimary : '', props.className
        ].join(' ') }
    >
        <div className={ [css.text, 'fixMargin'].join(' ') }>
            { props.children }
        </div>
    </button>
}

export default Button