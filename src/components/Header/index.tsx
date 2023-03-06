import css from './index.module.css'


interface HeaderProps extends React.HTMLAttributes<HTMLDivElement>
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


const Header = (props: HeaderProps) => {
    return <div className={ css.header }>
        { props.children }
    </div>
}


export default Header
export { HeaderSection }