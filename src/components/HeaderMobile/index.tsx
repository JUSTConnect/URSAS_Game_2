import css from './index.module.css'

import { useContext } from 'react'

import { MainframeContext  } from '@components/Mainframe'


const BurgerButton = (props: React.HTMLAttributes<HTMLButtonElement>) => {
    return <button onClick={props.onClick} className={css.burgerButton}>
        <div className={css.burgerButtonStick}></div>
        <div className={css.burgerButtonStick}></div>
    </button>
}

const HeaderMobile = () => {
    const context = useContext(MainframeContext)

    return <div className={ css.headerMobile }>
        <img src="/assets/images/logo.svg" alt="Logo" className={css.headerMobileLogo} />
        <BurgerButton onClick={()=>{context.setFooterModal(!context.footerModal), context.setMainBlured(!context.mainBlured)}}/>
    </div>
}


export default HeaderMobile