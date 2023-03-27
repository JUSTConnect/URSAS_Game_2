import css from './index.module.css'

import { useContext } from 'react'
import { useDispatch } from 'react-redux'

import { setWalletConnected } from '@/features/game/gameSlice'
import { MainframeContext } from '@components/Mainframe'


export default () => {
    const dispatch = useDispatch()
    const context = useContext(MainframeContext)

    return <div className={ [css.modal, context.disableWalletModal ? css.modalActive : ''].join(' ') }>
        <div className={ css.header }>
            Disable the wallet
        </div>
        <div className={ css.buttons }>
            <div onClick={ ()=> { context.setDisableWalletModal(false); dispatch(setWalletConnected(false)) } } className={ [css.button, 'fixMargin'].join(' ') }>disable</div>
            <div onClick={ () => { context.setDisableWalletModal(false) } } className={ [css.button, css.buttonPrimary, 'fixMargin'].join(' ') }>cancel</div>
        </div>
    </div>
}