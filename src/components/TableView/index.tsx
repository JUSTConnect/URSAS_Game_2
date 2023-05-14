import css from './index.module.css'

import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { useEthers } from '@usedapp/core'

import { RootState } from '@/app/store'
import DialogPlace from '@components/DialogPlace'
import Blur from '@components/Blur'

import { CardRank, CardSuit } from '@components/Card'
import { setChoosingCardPlace, setModalAlert, addBusyPlace } from '@/features/table/tableSlice'
import Place from './Place'
import Sofa from './Sofa'


interface TableViewProps
{
    modalActive: boolean
    setModalActive: Function
}


const TableView = (props: TableViewProps) => {
    const router = useRouter()
    const dispatch = useDispatch()
    const game = useSelector((state: RootState)=>state.game)
    const table = useSelector((state: RootState)=>state.table)
    const { account } = useEthers()

    if (table.stakedPlaces.length + table.busyPlaces.length === 10)
    {
        router.push(`/tables/${game.currentRoom}`)
    }

    const handleClickPlace = (number: number) => {
        props.setModalActive(true)
        dispatch(setChoosingCardPlace(number))

        setTimeout(() => {
            dispatch(
                addBusyPlace({
                    number: number,
                    card: {
                        rank: CardRank.N1,
                        suit: CardSuit.d
                    }
                })
            )
            if (!table.basketPlaces.map(place=>place.number).includes(number))
            {
                dispatch(setModalAlert('Your seat has been taken, please select another!'))
                setTimeout(() => dispatch(setModalAlert('')), 5000)
            }
        }, 10000)
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
                            active={ table.stakedPlaces.map(item=>item.number).includes(index+1) }
                        />
                        <Place
                            number={ index+1 }
                            className={ css[`place${index+1}`] }
                            basket = { table.basketPlaces.map(item=>item.number).includes(index+1) } 
                            staked = { table.stakedPlaces.map(item=>item.number).includes(index+1) }
                            loading = { game.loadingTable }
                            choosing = { table.choosingCardPlace === index+1 }
                            onClick = { () => handleClickPlace(index+1) }

                            card={ (!game.loadingTable && [...table.stakedPlaces, ...table.busyPlaces, ...table.basketPlaces].filter(item=>item.number===index+1)[0]) ? {
                                rank: [...table.stakedPlaces, ...table.busyPlaces, ...table.basketPlaces].filter(item=>item.number===index+1)[0].card.rank,
                                suit: [...table.stakedPlaces, ...table.busyPlaces, ...table.basketPlaces].filter(item=>item.number===index+1)[0].card.suit
                            } : undefined }
                        />
                    </div>
                )
            })}
        </div>
        <Blur 
            isActive={props.modalActive}
            onClick={ () => {props.setModalActive(false); dispatch(setChoosingCardPlace(0))} }
        />
        { account &&
            <DialogPlace
                active={ props.modalActive }
                setActive={ props.setModalActive }
            />
        }
    </div>
}


export default TableView