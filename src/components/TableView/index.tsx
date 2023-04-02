import css from './index.module.css'

import { useState } from 'react'
import { useSelector } from 'react-redux'

import { RootState } from '@/app/store'
import TableModal from '@components/TableModal'
import Blur from '@components/Blur'

import type { PlaceProps as PlaceData } from '@components/TableModal/Place'
import { CardRank, CardSuit } from '../Card'
import Place from './Place'
import Sofa from './Sofa'
import LoaderLogo from '@components/LoaderLogo'


interface TableViewProps
{
    modalActive: boolean
    setModalActive: Function
}

// example data
const exampleBusyPlaces: PlaceData[] = [
    {
        number: 4,
        suit: CardSuit.CLUB,
        rank: CardRank.N10,
    }
]
const exampleStakedPlaces: PlaceData[] = [
    {
        number: 1,
        suit: CardSuit.CLUB,
        rank: CardRank.N9,
    }
]
const exampleBasketPlaces: PlaceData[] = [
    {
        number: 2,
        suit: CardSuit.HEART,
        rank: CardRank.N10,
    }
]
// 

const TableView = (props: TableViewProps) => {
    const game = useSelector((state: RootState)=>state.game)

    const [busyPlaces, setBusyPlaces] = useState<PlaceData[]>(exampleBusyPlaces)
    const [stakedPlaces, setStakedPlaces] = useState<PlaceData[]>(exampleStakedPlaces)
    const [basketPlaces, setBasketPlaces] = useState<PlaceData[]>(exampleBasketPlaces)
    const [choosingCardPlace, setChoosingCardPlace] = useState<number>(0)

    const handleClickPlace = (number: number) => {
        props.setModalActive(true); setChoosingCardPlace(number)
    }


    return <div className={ css.tableView }>
        <div className={ css.tableContainer }>
            <div className={ css.table }>
                <div className={ css.tableContent }>
                    <div className={ css.tableContentInner }>
                    </div>
                </div>
            </div>
            <img className={ css.cocaCola } src="/assets/images/texture/table-coca-cola.png" alt="Coca Cola" />
            { [...Array(10)].map((item, index)=> {
                return (
                    <div key={index}>
                        <Sofa
                            number={ index+1 }
                            active={ stakedPlaces.map(item=>item.number).includes(index+1) }
                        />
                        <Place
                            number={ index+1 }
                            busy = { busyPlaces.map(item=>item.number).includes(index+1) }
                            basket = { basketPlaces.map(item=>item.number).includes(index+1) } 
                            staked = { stakedPlaces.map(item=>item.number).includes(index+1) }
                            empty={ game.loadingTable || ![...stakedPlaces, ...basketPlaces].map(item=>item.number).includes(index+1) && !busyPlaces.map(item=>item.number).includes(index+1) }
                            loading = { game.loadingTable || choosingCardPlace === index+1 }
                            onClick = { () => handleClickPlace(index+1) }

                            rank={ [...stakedPlaces, ...busyPlaces, ...basketPlaces].filter(item=>item.number===index+1)[0]?.rank }
                            suit={ [...stakedPlaces, ...busyPlaces, ...basketPlaces].filter(item=>item.number===index+1)[0]?.suit }
                        />
                    </div>
                )
            })}
        </div>
        <Blur 
            isActive={props.modalActive}
            onClick={ () => {props.setModalActive(false); setChoosingCardPlace(0)} }
        />
        <TableModal 
            active={ props.modalActive }
            setActive={ props.setModalActive }
            {...{
                basketPlaces,
                setBasketPlaces,
                stakedPlaces,
                setStakedPlaces,
                choosingCardPlace,
                setChoosingCardPlace
            }}
        />
    </div>
}


export default TableView