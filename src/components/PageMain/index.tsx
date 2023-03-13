import css from './index.module.css'

interface PageMainProps extends React.HTMLAttributes<HTMLDivElement>
{
    
}


const PageMain = (props: PageMainProps) => {
    return <div { ...props } className={ [props.className, css.pageMain].join(' ') }>
        { props.children }
    </div>
}

export default PageMain
