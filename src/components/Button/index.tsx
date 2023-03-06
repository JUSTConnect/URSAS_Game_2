import css from './index.module.css'

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement>
{
    children: any
}

const Button = (props: ButtonProps) => {
    return <button { ...props } className={ [css.button, props.className].join(' ') }>
        { props.children }
    </button>
}

export default Button