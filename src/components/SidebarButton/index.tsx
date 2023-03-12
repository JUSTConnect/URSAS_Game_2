import css from './index.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router';


interface SidebarButtonProps extends React.HTMLAttributes<HTMLDivElement>
{
    icon: any,
    href: string,
    active?: boolean
}

const SidebarButton = (props: SidebarButtonProps) => {
    const router = useRouter();
    return <Link href={props.href} className={ [css.sidebarButton, router.pathname == props.href ? css.sidebarButton__active : ''].join(' ') }>
        { props.icon }
    </Link>
}

export default SidebarButton