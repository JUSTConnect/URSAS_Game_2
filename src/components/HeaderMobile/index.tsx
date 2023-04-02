import css from './index.module.css'

import { useDispatch, useSelector } from 'react-redux'

import { RootState } from '@/app/store'
import { setFooterModal, setMainBlured } from '@/features/mainframe/mainframeSlice'

const BurgerButton = (props: React.HTMLAttributes<HTMLButtonElement>) => {
    return <button onClick={props.onClick} className={css.burgerButton}>
        <div className={css.burgerButtonStick}></div>
        <div className={css.burgerButtonStick}></div>
    </button>
}

const HeaderMobile = () => {
    const main = useSelector((state: RootState) => state.mainframe)
    const dispatch = useDispatch()

    return <div className={ css.headerMobile }>
        <img src="/assets/images/logo.svg" alt="Logo" className={css.logo} />
        <BurgerButton onClick={()=>{dispatch(setFooterModal(false)), dispatch(setMainBlured(false))}}/>
    </div>
}


export default HeaderMobile