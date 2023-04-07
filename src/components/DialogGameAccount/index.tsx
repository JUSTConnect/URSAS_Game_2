import css from './index.module.scss'

import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { setDisableWalletModal, setGameAccountDialog } from '@/features/mainframe/mainframeSlice'

import Dialog, {
    Header,
    HeaderButtons,
    Footer,
    FooterButtons,
    Content,
} from '@components/Dialog'
import Button, {
    Color as ButtonColor,
    Variant as ButtonVariant,
    Size as ButtonSize,
} from '@components/UIButton'
import Card, {
    CardRank,
    CardSuit
} from '@components/Card'
import Blur from '../Blur'


interface props extends React.HTMLAttributes<HTMLDivElement>
{
    active?: boolean
}

export default (props: props) => {
    const dispatch = useDispatch()
    const [ selectedCards, setSelectedCards ] = useState<number[]>([])

    const toggleCard = (number: number) => {
        if (selectedCards.includes(number)) {
            setSelectedCards(selectedCards.filter(item=>item!==number))
        } else {
            setSelectedCards([...selectedCards, number])
        }

    }

    return (
        <>
            <Blur
                onClick={ () => dispatch(setGameAccountDialog(false)) }
                isActive={ props.active }
            />
            <div className={
                [
                    css.wrapper,
                    props.active && css.active
                ].join(' ')
            }>
                <Dialog className={ [css.dialog, props.className].join(' ') }>
                    <Header>
                        <div className={ css.balances }>
                            <div className={ css.balance }>
                                <img className={ css.balanceIcon } src="/assets/images/icons/dialog-gameaccount-ursu.png" alt="ursu" />
                                <div className={ 'd-desktop' }>
                                    URSU
                                </div>
                                <span className={ 'textPrimary' }>12</span>
                            </div>
                            <div className={ css.balance }>
                                <img className={ css.balanceIcon } src="/assets/images/icons/dialog-gameaccount-matic.png" alt="matic" />
                                <div className={ 'd-desktop' }>
                                    MATIC
                                </div>
                                <span className={ 'textPrimary' }>12</span>
                            </div>
                        </div>
                        <HeaderButtons>
                            <Button
                                color={ ButtonColor.DARK }
                                variant={ ButtonVariant.NORMAL }
                                size={ ButtonSize.SM }
                                icon={ <i className="fa-solid fa-link"></i> }
                                iconTablet
                            >
                                copy adress
                            </Button>
                            <Button
                                color={ ButtonColor.DARK }
                                variant={ ButtonVariant.NORMAL }
                                size={ ButtonSize.SM }
                                icon={ <i className="fa-solid fa-repeat"></i> }
                                iconTablet
                            >
                                change wallet
                            </Button>
                            <Button
                                color={ ButtonColor.DARK }
                                variant={ ButtonVariant.NORMAL }
                                size={ ButtonSize.SM }
                                icon={ <i className="fa-solid fa-power-off"></i> }
                                iconTablet
                                onClick={ () => dispatch(setDisableWalletModal(true)) }
                            >
                                disconnect
                            </Button>
                            <Button
                                onClick={ () => dispatch(setGameAccountDialog(false)) }
                                color={ ButtonColor.DARK }
                                variant={ ButtonVariant.OUTLINE }
                                size={ ButtonSize.SM }
                            >
                                <i className="fa-solid fa-arrow-left"></i>
                            </Button>
                        </HeaderButtons>
                    </Header>
                    <Content>
                        <div className={ css.container }>
                            <div className={ css.header }>
                                Game account
                            </div>
                            <div className={ css.content }>
                                <div className={ css.cards }>
                                    {
                                        Array.from(Array(100)).map((item, index)=>(
                                            <Card
                                                key={ index }
                                                className={
                                                    [
                                                        css.card,
                                                        selectedCards.includes(index) && css.cardActive
                                                    ].join(' ')
                                                }
                                                onClick={ ()=> toggleCard(index) }
                                                rank={ CardRank.ACE }
                                                suit={ CardSuit.CLUB }
                                            />
                                        ))
                                    }
                                </div>
                            </div>
                            <button className={ css.footer }>
                                <span className={ css.footerText }>
                                    select all
                                </span>
                            </button>
                        </div>
                    </Content>
                    <Footer>
                        <FooterButtons>
                            <Button
                                color={ ButtonColor.LIGHT }
                                size={ ButtonSize.SM }
                                fullWidth
                            >
                                refound
                            </Button>
                            <Button
                                color={ ButtonColor.LIGHT }
                                size={ ButtonSize.SM }
                                fullWidth
                            >
                                refound
                            </Button>
                        </FooterButtons>
                    </Footer>
                </Dialog>
            </div>
        </>
    )
}