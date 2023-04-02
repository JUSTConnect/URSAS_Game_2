import css from './index.module.css'

import { useDispatch, useSelector } from 'react-redux'

import { RootState } from '@/app/store'
import { setWalletConnected } from '@/features/game/gameSlice'
import { setDisableWalletModal } from '@/features/mainframe/mainframeSlice'


export default () => {
    const dispatch = useDispatch()
    const mainframe = useSelector((state: RootState) => state.mainframe)

    return <div className={ [css.modal, mainframe.disableWalletModal ? css.modalActive : ''].join(' ') }>
        <div className={ css.header }>
            Disable the wallet
        </div>
        <div className={ css.buttons }>
            <div onClick={ ()=> { dispatch(setDisableWalletModal(false)); dispatch(setWalletConnected(false)) } } className={ [css.button, 'fixMargin'].join(' ') }>disable</div>
            <div onClick={ () => { dispatch(setDisableWalletModal(false)) } } className={ [css.button, css.buttonPrimary, 'fixMargin'].join(' ') }>cancel</div>
        </div>
    </div>
}