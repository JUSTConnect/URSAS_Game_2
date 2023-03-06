import css from './index.module.css'

interface SubHeaderProps extends React.HTMLAttributes<HTMLDivElement>
{

}

interface SubHeaderButtonProps extends React.HTMLAttributes<HTMLDivElement>
{
    active?: boolean,
    keyName?: string,
    value?: string
}

const SubHeaderButton = (props: SubHeaderButtonProps) => {
    return <button className={ [css.subHeaderButton, props.active ? css.subHeaderButtonActive : ''].join(' ') }>
        { props.keyName } <span className={ css.subHeaderButtonValue }>{ props.value }</span>
    </button>
}

const SubHeader = (props: SubHeaderProps) => {
    return <div className={ css.subHeader }>
        { props.children }
    </div>
}


export default SubHeader
export {
    SubHeaderButton
}