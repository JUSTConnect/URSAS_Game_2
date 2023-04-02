import css from './index.module.css'

import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import type { PlaceProps as PlaceData } from './Place'
import { RootState } from '@/app/store'
import {
    addBasketPlace,
    clearBasketPlaces,
    clearStakedPlaces,
    submitPlaces,
    removeStakedPlaces,
    removeBasketPlaces,
    setChoosingCardPlace,
} from '@/features/table/tableSlice'
import Place from './Place'
import PlaceButton from './PlaceButton'
import Card, { randomCard } from '@components/Card'


interface TableModalProps extends React.HTMLAttributes<HTMLDivElement>
{
    active?: boolean  
    setActive: Function
}


const TableModal = (props: TableModalProps) => {
    const dispatch = useDispatch()
    const table = useSelector((state: RootState) => state.table)
    const [selectedBasketPlaces, setSelectedBasketPlaces] = useState<number[]>([])
    const [selectedStakedPlaces, setSelectedStakedPlaces] = useState<number[]>([])

    const randomCards = [...Array(10)].map(()=>randomCard())

    return <div className={ [css.modalContainer, props.active ? css.modalContainerActive : ''].join(' ') }>
        <div className={ css.modal }>
            { table.modalAlert || (table.basketPlaces.length && !table.choosingCardPlace) ? (
                <div className={ css.modalAlert }>
                    <img className={ css.modalAlertIcon } src="/assets/images/icons/alert.png" alt="Alert" />
                    { table.modalAlert ? (
                        table.modalAlert
                    ) : table.basketPlaces.length ? (
                        'Places not submit - please clear/submit.'
                    ) : ''}
                </div>
            ) : (
                ''
            ) }
            <div className={ css.modalHeader }>
                <div>
                    <div className={ css.headerTitle }>
                        { table.choosingCardPlace ? 
                            <>
                                Choose cart <span className={ css.textLight }>place n.{ table.choosingCardPlace }</span>
                            </>
                        :
                        table.basketPlaces.length ?
                            <div>
                                Confirm places <span className={ css.textLight }>01:56</span>
                            </div>
                        :    
                            'Basket places'
                        }
                    </div>
                </div>
                <div className={ css.modalHeaderButtons }>
                    { Boolean(table.basketPlaces.length) &&
                        <button onClick={ () => dispatch(submitPlaces()) } className={ css.modalHeaderButton }>
                            submit
                        </button>
                    }
                    <button onClick={ () => {props.setActive(false);dispatch(setChoosingCardPlace(0))} } className={ css.modalButtonNext }>
                        <img className={ css.modalButtonNextIcon } src="/assets/images/icons/arrow-right.png" alt="Arrow Right" />
                    </button>
                </div>
            </div>
            <div className={ [(table.choosingCardPlace || table.stakedPlaces.length || table.basketPlaces.length) ? css.modalContent : '', css.modalContentRaw].join(' ') }>
                { table.choosingCardPlace ? (    
                    <div className={ css.cards }>
                        { randomCards.map((item,index) => 
                            <Card
                                key={ index }
                                className={ css.card }
                                rank={ randomCards[index][0] }
                                suit={ randomCards[index][1] }
                                onClick={ () => {
                                    dispatch(
                                        addBasketPlace(
                                            {
                                                number: table.choosingCardPlace,
                                                rank: randomCards[index][0],
                                                suit: randomCards[index][1] 
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
                                    rank={ place.rank }
                                    suit={ place.suit }
                                    active={ selectedBasketPlaces.includes(place.number) }
                                    onClick={
                                        () => 
                                            selectedBasketPlaces.includes(place.number)
                                            ?
                                            setSelectedBasketPlaces(selectedBasketPlaces.filter(number=>number!==place.number))
                                            :
                                            setSelectedBasketPlaces([...selectedBasketPlaces, place.number])
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
                                    rank={ place.rank }
                                    suit={ place.suit }
                                    active={ selectedStakedPlaces.includes(place.number) }
                                    onClick={
                                        () => 
                                            selectedStakedPlaces.includes(place.number)
                                            ?
                                            setSelectedStakedPlaces(selectedStakedPlaces.filter(number=>number!==place.number))
                                            :
                                            setSelectedStakedPlaces([...selectedStakedPlaces, place.number])
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
                            <img className={ css.basketEmptySofa } src="/assets/images/texture/table-sofa-modal.png" alt="" />
                        </div>
                    </div>
                ) }
            </div>
            { !table.choosingCardPlace && (table.stakedPlaces.length || table.basketPlaces.length) ? (
                <div className={ css.modalFooter }>
                    <div className={ css.modalFooterButtons }>
                        { Boolean(table.stakedPlaces.length) && (
                            <button onClick={ () => dispatch(clearStakedPlaces()) } className={ css.modalFooterButton }>
                                <img className={ css.modalFooterButtonIcon } src="/assets/images/icons/return.png" alt="Icon" />
                                return all
                            </button>
                        ) }
                        { Boolean(table.basketPlaces.length) && (
                            <button onClick={ () => dispatch(clearBasketPlaces()) } className={ css.modalFooterButton }>
                                <img className={ css.modalFooterButtonIcon } src="/assets/images/icons/clear.png" alt="Icon" />
                                clear all
                            </button>
                        ) }
                    </div>
                </div>       
            ) : (
                <></>
            ) }
        </div>
    </div>
}


export default TableModal