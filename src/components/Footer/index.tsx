import css from './index.module.css'


interface FooterProps extends React.HTMLAttributes<HTMLDivElement>
{

}

interface MediaIconProps extends React.HTMLAttributes<HTMLDivElement>
{
    href: string
}


const MediaIcon = (props: MediaIconProps) => {
    return <a className={ css.mediaIcon } href={ props.href }>
        { props.children }
    </a>
}





const Footer = (props: FooterProps) => {
    return <div className={ css.footer }>
        <div>
            Markets link: &nbsp;&nbsp;
            <img src="/assets/images/icons/market1.svg" alt="Market Icon"/>&nbsp;&nbsp;
            <img src="/assets/images/icons/market2.svg" alt="Market Icon"/>&nbsp;&nbsp;
            <img src="/assets/images/icons/market3.svg" alt="Market Icon"/>&nbsp;&nbsp;
            <img src="/assets/images/icons/market4.svg" alt="Market Icon"/>&nbsp;&nbsp;
            <img src="/assets/images/icons/market5.svg" alt="Market Icon"/>&nbsp;&nbsp;
        </div>
        <div>
            <MediaIcon href='#'>
                <img src="/assets/images/icons/twitter.svg" alt="Twitter Icon" />
            </MediaIcon>
            <MediaIcon href='#'>
                <img src="/assets/images/icons/discord.svg" alt="Discord Icon" />
            </MediaIcon>
        </div>
    </div>
}


export default Footer
