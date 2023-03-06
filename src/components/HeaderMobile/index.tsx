import css from './index.module.css'


interface HeaderMobileProps extends React.HTMLAttributes<HTMLDivElement>
{

}

const BurgerButton = () => {
    return <button className={css.burgerButton}>
        <div className={css.burgerButtonStick}></div>
        <div className={css.burgerButtonStick}></div>
    </button>
}

const HeaderMobile = (props: HeaderMobileProps) => {
    return <div className={ css.headerMobile }>
        <img src="/assets/images/logo.svg" alt="Logo" className={css.headerMobileLogo} />
        <BurgerButton/>
    </div>
}


export default HeaderMobile