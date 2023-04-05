import css from './index.module.scss'
import loader from './loader.module.scss'


import Loader from '@components/UILoader'


interface props extends React.HTMLAttributes<HTMLDivElement>
{
    mobileTransparrent?: boolean
    loading?: boolean
}

export default (props: props) => {
    return (
        <div className={
            [
                css.badge,
                props.loading && css.loading,
                props.mobileTransparrent && css.mobileTransparrent
            ].join(' ')
        }>
            <div className={ css.inner }>
            { props.loading ? (
                <div className={ loader.loader }>
                    <span></span>
                </div>
            ) : (
                    <div className={ 'fixMargin' }>
                        { props.children }
                    </div>
            ) }
            </div>
        </div>
    )
}