import css from './index.module.css'


interface SidebarButtonProps
{
    icon: any,
    active?: boolean
}


const SidebarButton = (props: SidebarButtonProps) => {
    return <a href={'#'} className={ [css.sidebarButton, props.active ? css.sidebarButton__active : ''].join(' ') }>
        { props.icon }
    </a>
}

export default SidebarButton