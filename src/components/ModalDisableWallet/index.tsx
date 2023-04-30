import css from './index.module.scss'

import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { useEthers } from '@usedapp/core';

import { AppDispatch, RootState } from '@/app/store'
import { setDisableWalletModal } from '@/features/mainframe/mainframeSlice'
import Blur from '@components/Blur'



export default () => {
    const router = useRouter()
    const dispatch = useDispatch<AppDispatch>()
    const mainframe = useSelector((state: RootState) => state.mainframe)
    const { deactivate } = useEthers()

    return (
        <>
            <Blur
                isActive={ mainframe.disableWalletModal }
                onClick={ () => dispatch(setDisableWalletModal(false)) }
            />
            <div className={ [css.modal, mainframe.disableWalletModal ? css.modalActive : ''].join(' ') }>
                <div className={ css.header }>
                    Disable the wallet
                </div>
                <div className={ css.buttons }>
                    <div
                        onClick={ ()=> { router.push('/'); dispatch(setDisableWalletModal(false)); deactivate() } }
                        className={ [css.button, 'fixMargin'].join(' ') }
                    >
                        <i className="fa-solid fa-right-from-bracket"></i>&nbsp;
                        disable
                    </div>
                    <div onClick={ () => { dispatch(setDisableWalletModal(false)) } } className={ [css.button, css.buttonPrimary, 'fixMargin'].join(' ') }>cancel</div>
                </div>
            </div>
        </>
    ) 
}