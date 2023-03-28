import css from './index.module.css'

import { useContext, useState } from 'react'
import { useSelector } from 'react-redux'

import { RootState } from '@/app/store'
import Table from '@components/Table'
import LoaderLogo from '@components/LoaderLogo'


interface TableListProps extends React.HTMLAttributes<HTMLDivElement>
{

}


const TableList = (props: TableListProps) => {
    const game = useSelector((state: RootState) => state.game)
    const mode = useState()

    return <>
        { game.loadingTables ? (
            <div className={ css.loader }>
                <LoaderLogo/>
            </div>
        ) : (
            <div className={ css.tableList }>
                <Table href={`/table/${1}`} isActive={true} tableNumber={1} freePlaces={1}/>
                <Table href={`/table/${2}`} tableNumber={2} freePlaces={10}/>
                <Table href={`/table/${3}`} tableNumber={3} gameEnd={'12:55'}/>
                <Table href={`/table/${4}`} cooldown={true} tableNumber={4}/>
                { [...Array(50)].map((item, index)=>{
                    return <Table href={`/table/${index+5}`} tableNumber={index+4} freePlaces={1} key={ index }/>

                }) }
            </div>
        ) }
    </> 
}


export default TableList