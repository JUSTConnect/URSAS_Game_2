import css from './index.module.scss'

import sofaBg from '@assets/images/texture/table-sofa-modal.png'

import Image from 'next/image'

import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEthers } from '@usedapp/core'

import { AppDispatch, RootState } from '@/app/store'
import {
    addBasketPlace,
    clearBasketPlaces,
    clearStakedPlaces,
    submitPlaces,
    removeStakedPlaces,
    removeBasketPlaces,
} from '@/features/table/tableSlice'
import { fetchWalletCards } from '@/features/game/gameSlice'
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
import Blur from '../Blur'
import Card, { randomCard } from '@components/Card'

import Place from './Place'
import PlaceButton from './PlaceButton'


interface props extends React.HTMLAttributes<HTMLDivElement>
{
    active: boolean
    setActive: Function
}

export default (props: props) => {
    const dispatch = useDispatch<AppDispatch>()
    const table = useSelector((state: RootState) => state.table)
    const game = useSelector((state: RootState) => state.game)
    const { account } = useEthers()
    const [selectedBasketPlaces, setSelectedBasketPlaces] = useState<number[]>([])
    const [selectedStakedPlaces, setSelectedStakedPlaces] = useState<number[]>([])
    const [submitTimer, setSubmitTimer] = useState<[number, number]>([2, 0])
    
    useEffect(() => {
        account && dispatch(fetchWalletCards(account))
    }, [])

    const randomCards = [...Array(10)].map(()=>randomCard())

    return (
        <>
            <Blur
                onClick={ () => props.setActive(false) }
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
                        {
                            table.choosingCardPlace ? (
                                <div>
                                    Choose cart <span className={ 'textPrimary' }>place n.{ table.choosingCardPlace }</span>
                                </div>
                            ) : table.basketPlaces.length ? (
                                <div>
                                    Confirm places <span className={ 'textPrimary' }>
                                        { String(submitTimer[0]).padStart(2, '0') }
                                        :
                                        { String(submitTimer[1]).padStart(2, '0') }
                                    </span>
                                </div>
                            ) : 'Basket places'
                        }
                        <HeaderButtons>
                            { Boolean(table.basketPlaces.length) &&
                                <Button
                                    color={ ButtonColor.LIGHT }
                                    size={ ButtonSize.SM }
                                    onClick={ () => dispatch(submitPlaces()) }
                                >
                                    submit
                                </Button>
                            }
                            <Button
                                onClick={ () => props.setActive(false) }
                                color={ ButtonColor.DARK }
                                variant={ ButtonVariant.OUTLINE }
                                size={ ButtonSize.SM }
                            >
                                <i className="fa-solid fa-arrow-right"></i>
                            </Button>
                        </HeaderButtons>
                    </Header>
                    <Content
                        overflowHidden={ !(table.stakedPlaces.length || table.basketPlaces.length) }
                    >
                    { table.choosingCardPlace ? (    
                        <div className={ css.cards }>
                            { game.walletCards.map((item,index) => 
                                <Card
                                    key={ index }
                                    className={ css.card }
                                    rank={ item.rank }
                                    suit={ item.suit }
                                    onClick={ () => {
                                        dispatch(
                                            addBasketPlace(
                                                {
                                                    number: table.choosingCardPlace,
                                                    card: {
                                                        rank: randomCards[index][0],
                                                        suit: randomCards[index][1] 
                                                    }
                                                }
                                            )
                                        )
                                    }}
                                />
                            ) }
                        </div>
                    ) : table.stakedPlaces.length || table.basketPlaces.length ? (
                        <div className={ css.places }>
                            { table.basketPlaces.map((place, index) => (
                                    <Place
                                        key={ index }
                                        number={place.number}
                                        card={ place.card ? {
                                            rank: place.card.rank,
                                            suit: place.card.suit
                                        } : undefined }
                                        active={ selectedBasketPlaces.includes(place.number||0) }
                                        onClick={
                                            () =>
                                                selectedBasketPlaces.includes(place.number||0)
                                                ?
                                                setSelectedBasketPlaces(selectedBasketPlaces.filter(number=>number!==place.number))
                                                :
                                                setSelectedBasketPlaces([...selectedBasketPlaces, place.number||0])
                                        }
                                    />
                                )
                            ) }
                            { Boolean(table.basketPlaces.length) && (
                                <PlaceButton active={ selectedBasketPlaces.length } onClick={ () => {
                                    dispatch(removeBasketPlaces(selectedBasketPlaces))
                                    setSelectedBasketPlaces([])
                                } }>
                                    clear
                                </PlaceButton>
                            ) }
                            { Boolean(table.stakedPlaces.length) && (
                                <PlaceButton active={ selectedStakedPlaces.length } onClick={ () => {
                                    dispatch(removeStakedPlaces(selectedStakedPlaces))
                                    setSelectedStakedPlaces([])
                                } }>
                                    return
                                </PlaceButton>
                            ) }
                            { table.stakedPlaces.map((place, index) => (
                                    <Place
                                        key={ index }
                                        number={place.number}
                                        card={ place.card ?{
                                            rank: place.card.rank,
                                            suit: place.card.suit
                                        } : undefined }
                                        active={ selectedStakedPlaces.includes(place.number) }
                                        onClick={
                                            () => 
                                                selectedStakedPlaces.includes(place.number)
                                                ?
                                                setSelectedStakedPlaces(selectedStakedPlaces.filter(number=>number!==place.number))
                                                :
                                                setSelectedStakedPlaces([...selectedStakedPlaces, place.number||0])
                                        }
                                    />
                                )
                            ) }
                        </div>
                    ) : (
                        <div className={ css.basketEmptyContainer }>
                            <div className={ css.basketEmptyContent }>
                                <div className={ css.basketEmptyTitle }>
                                    Your basket  is empty
                                </div>
                                <div className={ css.basketEmptyDescription }>
                                    Please choose places
                                </div>
                                <div className={ css.basketEmptyCircle }></div>
                                <Image
                                    src={sofaBg}
                                    alt={'sofa'}
                                    width={ 327 }
                                    height={ 220 }
                                    placeholder={ 'blur' }
                                    className={ css.basketEmptySofa }
                                />
                            </div>
                        </div>
                    ) }
                    </Content>
                    { Boolean(table.stakedPlaces.length || table.basketPlaces.length) && !table.choosingCardPlace &&
                        <Footer>
                            <FooterButtons>
                                { Boolean(table.stakedPlaces.length) &&
                                    <Button
                                        onClick={ () => dispatch(clearStakedPlaces()) }
                                        color={ ButtonColor.DARK }
                                        size={ ButtonSize.SM }
                                        variant={ ButtonVariant.NORMAL }
                                        fullWidth
                                    >
                                        <img className={ css.footerButtonIcon } src="/assets/images/icons/clear.png" alt="Icon" />
                                        &nbsp;
                                        return all
                                    </Button>
                                }
                                { Boolean(table.basketPlaces.length) &&
                                    <Button
                                        onClick={ () => dispatch(clearBasketPlaces()) }
                                        color={ ButtonColor.DARK }
                                        size={ ButtonSize.SM }
                                        variant={ ButtonVariant.NORMAL }
                                        fullWidth
                                    >
                                        <img className={ css.footerButtonIcon } src="/assets/images/icons/return.png" alt="Icon" />
                                        &nbsp;
                                        clear all
                                    </Button>
                                }
                            </FooterButtons>
                        </Footer>
                    }
                </Dialog>
            </div>
        </>
    )
}