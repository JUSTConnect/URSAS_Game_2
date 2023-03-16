import css from './index.module.css'


interface HeaderMobileProps extends React.HTMLAttributes<HTMLDivElement>
{
    footerModal: boolean
    setFooterModal: Function
}

const BurgerButton = (props: React.HTMLAttributes<HTMLButtonElement>) => {
    return <button onClick={props.onClick} className={css.burgerButton}>
        <div className={css.burgerButtonStick}></div>
        <div className={css.burgerButtonStick}></div>
    </button>
}

const HeaderMobile = (props: HeaderMobileProps) => {
    return <div className={ css.headerMobile }>
        <img src="/assets/images/logo.svg" alt="Logo" className={css.headerMobileLogo} />
        <BurgerButton onClick={()=>props.setFooterModal(!props.footerModal)}/>
    </div>
}


export default HeaderMobile