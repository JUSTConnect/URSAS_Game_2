import css from './index.module.css'

import Info from './Info'

interface SubHeaderProps extends React.HTMLAttributes<HTMLDivElement>
{

}

interface SubHeaderButtonProps extends React.HTMLAttributes<HTMLButtonElement>
{
    active?: boolean,
    keyName?: string,
    value?: React.ReactElement|string|number
}

const SubHeaderSection = (props: React.HTMLAttributes<HTMLDivElement>) => {
    return <div className={ css.section }>
        { props.children }
    </div>
}

const Buttons = (props: React.HTMLAttributes<HTMLDivElement>) => {
    return <div className={ css.buttons }>
        { props.children }
    </div>
}

const SubHeaderButton = (props: SubHeaderButtonProps) => {
    return <button onClick={ props.onClick } className={ [css.subHeaderButton, props.active ? css.subHeaderButtonActive : ''].join(' ') }>
        <div className={ 'fixMargin' }>
            { props.keyName } <span className={ css.subHeaderButtonValue }>{ props.value }</span>
        </div>
    </button>
}

const SubHeader = (props: SubHeaderProps) => {
    return <div className={ css.subHeader }>
        { props.children }
    </div>
}


export default SubHeader
export {
    Buttons,
    SubHeaderButton,
    SubHeaderSection,
    Info
}