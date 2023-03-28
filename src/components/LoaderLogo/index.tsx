import css from './index.module.css'


interface props
{

}


export default (props: props) => {
    return <div className={ css.container }>
        <div className={ css.loaderContainer }>
            <div className={ css.borderContainer }>
                <div className={ css.border }></div>
            </div>
            <div className={ css.loader }>
                <img className={ css.logo } src="/assets/images/texture/loader-logo.png" alt="logo" />
            </div>
        </div>
    </div>
}