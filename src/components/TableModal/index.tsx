import css from './index.module.css'

import { useState } from 'react'

import type { PlaceProps as PlaceData } from './Place'

import Place from './Place'
import PlaceButton from './PlaceButton'
import Card, { CardRank, CardSuit, randomCard } from '@components/Card'


interface TableModalProps extends React.HTMLAttributes<HTMLDivElement>
{
    basketPlaces: PlaceData[]
    setBasketPlaces: Function
    stakedPlaces: PlaceData[]
    setStakedPlaces: Function
    choosingCardPlace: number
    setChoosingCardPlace: Function
    active?: boolean  
    setActive: Function
}


const TableModal = (props: TableModalProps) => {
    const [step, setStep] = useState('basket_empty')
    const [alert, setAlert] = useState('')

    return <div className={ [css.modalContainer, props.active ? css.modalContainerActive : ''].join(' ') }>
        <div className={ css.modal }>
            { alert ? (
                <div className={ css.modalAlert }>
                    <img className={ css.modalAlertIcon } src="/assets/images/icons/alert.png" alt="Alert" />
                    { alert }
                </div>
            ) : (
                <></>
            ) }
            <div className={ css.modalHeader }>
                { props.choosingCardPlace ? (
                    <>
                        <div>
                            <div className={ css.headerTitle }>
                                Сhoose cart <span className={ css.textLight }>place n.3</span>
                            </div>
                            <div className={ css.headerSubTitle }>
                                you seat has been taken, please select another
                            </div>
                        </div>
                        <div>
                            <button onClick={ () => {props.setActive(false);setAlert('Places not sbbmit - clear/confirm or press exit again')} } className={ css.modalButtonNext }>
                                <img className={ css.modalButtonNextIcon } src="/assets/images/icons/arrow-right.png" alt="Arrow Right" />
                            </button>
                        </div>
                    </>
                ) : props.basketPlaces.length || props.stakedPlaces.length ? (
                    <>
                        <div>
                            Confirm places <span className={ css.textLight }>01:56</span>
                        </div>
                        <div className={ css.modalHeaderButtons }>
                            <button className={ css.modalHeaderButton }>
                                submit
                            </button>
                            <button onClick={ () => {props.setActive(false)} } className={ css.modalButtonNext }>
                                <img className={ css.modalButtonNextIcon } src="/assets/images/icons/arrow-right.png" alt="Arrow Right" />
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <div>
                            Basket places
                        </div>
                        <div>
                            <button onClick={ () => props.setActive(false) } className={ css.modalButtonNext }>
                                <img className={ css.modalButtonNextIcon } src="/assets/images/icons/arrow-right.png" alt="Arrow Right" />
                            </button>
                        </div>
                    </>
                ) }
                {/* {{
                    confirm_places: (
                        <>
                            <div>
                                Confirm places <span className={ css.textLight }>01:56</span>
                            </div>
                            <div className={ css.modalHeaderButtons }>
                                <button className={ css.modalHeaderButton }>
                                    submit
                                </button>
                                <button onClick={ () => {setStep('confirm_places2');setAlert('')} } className={ css.modalButtonNext }>
                                    <img className={ css.modalButtonNextIcon } src="/assets/images/icons/arrow-right.png" alt="Arrow Right" />
                                </button>
                            </div>
                        </>
                    ),
                    confirm_places2: (
                        <>
                            <div>
                                Confirm places <span className={ css.textLight }>01:56</span>
                            </div>
                            <div className={ css.modalHeaderButtons }>
                                <button className={ css.modalHeaderButton }>
                                    submit
                                </button>
                                <button onClick={ () => {setStep('finish');setAlert('')} } className={ css.modalButtonNext }>
                                    <img className={ css.modalButtonNextIcon } src="/assets/images/icons/arrow-right.png" alt="Arrow Right" />
                                </button>
                            </div>
                        </>
                    ),
                    finish: (
                        <>
                            <div>
                                Basket places
                            </div>
                            <div>
                                <button onClick={ () => setStep('basket_empty') } className={ css.modalButtonNext }>
                                    <img className={ css.modalButtonNextIcon } src="/assets/images/icons/arrow-right.png" alt="Arrow Right" />
                                </button>
                            </div>
                        </>
                    )
                } [step] || 'not_found' } */}
            </div>
            <div className={ [(props.choosingCardPlace||(props.stakedPlaces || props.basketPlaces)) ? css.modalContent : '', css.modalContentRaw].join(' ') }>
                { props.choosingCardPlace ? (    
                    <div className={ css.cards }>
                        { [...Array(20)].map((item,index) => 
                            <Card
                                key={ index }
                                className={ css.card }
                                rank={ randomCard()[0] }
                                suit={ randomCard()[1] }
                                onClick={ () => props.setBasketPlaces([...props.basketPlaces, {number: props.choosingCardPlace, rank: CardRank.N2, suit: CardSuit.HEART}]) }
                            />
                        ) }
                    </div>
                ) : props.stakedPlaces || props.basketPlaces ? (
                    <div className={ css.places }>
                        { props.basketPlaces.map((place, index) =>
                            <Place
                                key={ index }
                                number={place.number}
                                rank={ place.rank }
                                suit={ place.suit }
                            />
                        ) }
                        <PlaceButton>
                            clear
                        </PlaceButton>
                        <PlaceButton>
                            return
                        </PlaceButton>
                        { props.stakedPlaces.map((place, index) =>
                            <Place
                                key={ index }
                                number={place.number}
                                rank={ place.rank }
                                suit={ place.suit }
                            />
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
                            <img className={ css.basketEmptySofa } src="/assets/images/texture/table-sofa-modal.png" alt="" />
                        </div>
                    </div>
                ) }
                {/* {{
                    confirm_places: (
                        
                    ),
                    confirm_places2: (
                        <div className={ css.dialog }>
                            <div className={ css.dialogContent }>
                                <div className={ [css.dialogPlace, 'textMuted'].join(' ') }>
                                    place
                                </div>
                                <div className={ [css.dialogNumber, 'fontSpecial'].join(' ') }>
                                    №3
                                </div>
                                <div className={ css.dialogButtons }>
                                    <Place
                                        return={true}
                                    />
                                    <Place
                                        cancel={true}
                                    />
                                </div>
                            </div>
                        </div>
                    ),
                    finish: (
                        <div className={ css.loading }>
                            <img className={ css.loadingIcon } src="/assets/images/icons/logo-loading.png" alt="Loading" />
                        </div>
                    )
                } [step] || 'not_found' } */}
            </div>
            { step !== 'basket_empty' && step !== 'confirm_places2' && step !== 'choose_card' ? (
                <div className={ css.modalFooter }>
                    <div className={ css.modalFooterButtons }>
                        <div className={ css.modalFooterButton }>
                            <img className={ css.modalFooterButtonIcon } src="/assets/images/icons/return.png" alt="Icon" />
                            return all
                        </div>
                        <div className={ css.modalFooterButton }>
                            <img className={ css.modalFooterButtonIcon } src="/assets/images/icons/clear.png" alt="Icon" />
                            clear all
                        </div>
                    </div>
                </div>       
            ) : (
                <></>
            ) }
        </div>
    </div>
}


export default TableModal