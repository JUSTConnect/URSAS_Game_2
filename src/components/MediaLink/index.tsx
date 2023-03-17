import css from './index.module.css'

import Link from 'next/link'


interface MediaLinkProps extends React.HTMLAttributes<HTMLAnchorElement>
{
    href: string
}

const MediaLink = (props: MediaLinkProps) => {
    return <Link {...props} className={ css.mediaLink } href={ props.href }>
        { props.children }
    </Link>
}

export default MediaLink