import css from './index.module.css'

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement>
{
    children: any
    primary?: boolean
}

const Button = (props: ButtonProps) => {
    return <button onClick={ props.onClick } className={ [css.button, props.primary ? css.buttonPrimary : 'k', props.className].join(' ') }>
        <span className={ css.text }>
            { props.children }
        </span>
    </button>
}

export default Button