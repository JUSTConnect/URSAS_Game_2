import css from './index.module.scss'


interface props extends React.HTMLAttributes<HTMLDivElement>
{

}

export default (props: props) => {
    return (
        <div className={ [css.container, props.className].join(' ') }>
            <div className={ css.inner }>
                { props.children }
            </div>
        </div>
    )
}