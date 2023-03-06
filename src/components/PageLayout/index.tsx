import css from './index.module.css'


interface PageLayoutProps
{
    children: any
}


const PageLayout = (props: PageLayoutProps) => {
    return <div className={ css.pageLayout }>
        { props.children }
    </div>
}


export default PageLayout