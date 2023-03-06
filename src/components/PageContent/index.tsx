import css from './index.module.css'


interface PageContentProps
{
    children?: any;
}


const PageContent = (props: PageContentProps) => {
    return <div className={ css.pageContent }>
        { props.children }
    </div>
}

export default PageContent