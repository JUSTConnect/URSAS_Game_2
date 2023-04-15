import css from './index.module.scss'

import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { setMintDialog } from '@/features/mainframe/mainframeSlice'
import Dialog, {
    Header,
    HeaderButtons,
    ContentScrollable as Content,
} from '@components/Dialog'
import Button, {
    Color as ButtonColor,
    Variant as ButtonVariant,
    Size as ButtonSize,
} from '@components/UIButton'
import Blur from '../Blur'
import MintCard from './MintCard'


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
                onClick={ () => dispatch(setMintDialog(false)) }
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
                        <div className={ css.heading }>
                            Mint level
                            &nbsp;
                            <img className={ css.headingIcon } src="/assets/images/icons/dialog-gameaccount-matic.png" alt="matic" />
                        </div>
                        <HeaderButtons>
                            <Button
                                onClick={ () => dispatch(setMintDialog(false)) }
                                color={ ButtonColor.DARK }
                                variant={ ButtonVariant.OUTLINE }
                                size={ ButtonSize.SM }
                            >
                                <i className="fa-solid fa-arrow-left"></i>
                            </Button>
                        </HeaderButtons>
                    </Header>
                    <Content>
                        <div className={ css.mintCards }>
                            { Array.from(Array(16)).map((item, index) => (
                                <MintCard
                                    key={ index }
                                    price={ (index+1) * 2 }
                                    level={16-index}
                                />
                            )) }
                        </div>
                    </Content>
                </Dialog>
            </div>
        </>
    )
}