import css from './index.module.css'


interface HeaderBaseProps extends React.HTMLAttributes<HTMLDivElement>
{

}

interface HeaderSectionProps extends React.HTMLAttributes<HTMLDivElement>
{

}


const HeaderSection = (props: HeaderSectionProps) => {
    return <div className={ [css.header__section].join(' ') }>
        { props.children }
    </div>
}


const HeaderBase = (props: HeaderBaseProps) => {
    return <div className={ css.header }>
        { props.children }
    </div>
}


export default HeaderBase
export { HeaderSection }