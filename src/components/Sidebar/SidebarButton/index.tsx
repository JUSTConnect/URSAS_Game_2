import css from './index.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router';


interface SidebarButtonProps extends React.HTMLAttributes<HTMLLinkElement>
{
    icon: any,
    href: string|{},
    active?: boolean
}

const SidebarButton = (props: SidebarButtonProps) => {
    const router = useRouter()

    return <Link href={props.href} className={ [css.sidebarButton, router.asPath === props.href ? css.sidebarButton__active : '', (props.href instanceof Object) ? css.disabled : ''].join(' ') }>
        { props.icon }
    </Link>
}

export default SidebarButton