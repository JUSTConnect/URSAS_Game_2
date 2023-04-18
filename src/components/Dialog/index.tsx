import css from './index.module.scss'


interface props extends React.HTMLAttributes<HTMLDivElement>
{

}

interface headerProps extends React.HTMLAttributes<HTMLDivElement>
{

}

interface footerProps extends React.HTMLAttributes<HTMLDivElement>
{

}

interface headerProps extends React.HTMLAttributes<HTMLDivElement>
{

}

interface contentProps extends React.HTMLAttributes<HTMLDivElement>
{
    overflowHidden?: boolean
}


const Header = (props: headerProps) => {
    return (
        <div className={ [css.header, props.className].join(' ') }>
            { props.children }
        </div>
    )
}

const HeaderButtons = (props: React.HTMLAttributes<HTMLDivElement>) => {
    return (
        <div className={ [css.headerButtons, props.className].join(' ') }>
            { props.children }
        </div>
    )
}

const Content = (props: contentProps) => {
    return (
        <div className={ [css.content, props.overflowHidden && css.contentOverflowHidden, props.className].join(' ') }>
            <div className={ css.contentInner }>
                { props.children }
            </div>
        </div>
    )
}

const ContentScrollable = (props: contentProps) => {
    return (
        <Content
            { ...props }
            className={ [props.className, css.contentScrollable].join(' ') }
        >
            { props.children }
        </Content>
    )
}

const Footer = (props: footerProps) => {
    return (
        <div className={ [css.footer, props.className].join(' ') }>
            { props.children }
        </div>
    )
}

const FooterButtons = (props: React.HTMLAttributes<HTMLDivElement>) => {
    return (
        <div className={ [css.footerButtons, props.className].join(' ') }>
            { props.children }
        </div>
    )
}

export default (props: props) => {
    return (
        <div className={ [css.dialog, props.className].join(' ') }>
            <div className={ css.inner }>
                { props.children }
            </div>
        </div>
    )
}

export {
    Header,
    HeaderButtons,
    Content,
    ContentScrollable,
    Footer,
    FooterButtons
}