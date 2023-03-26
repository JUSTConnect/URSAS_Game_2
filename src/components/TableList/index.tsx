import css from './index.module.css'

import { useContext } from 'react'

import { GameContext } from '@components/Mainframe'
import Table from '@components/Table'
import Loader from '@components/Loader'


interface TableListProps extends React.HTMLAttributes<HTMLDivElement>
{

}


const TableList = (props: TableListProps) => {
    const game = useContext(GameContext)
    return <>
        { game.loadingTables ? (
            <div className={ css.loader }>
                <Loader/>
            </div>
        ) : (
            <div className={ css.tableList }>
                <Table isActive={true} tableNumber={1} freePlaces={1}/>
                <Table tableNumber={2} freePlaces={10}/>
                <Table tableNumber={3} gameEnd={'12:55'}/>
                <Table cooldown={true} tableNumber={2}/>
                { [...Array(50)].map((item, index)=>{
                    return <Table tableNumber={index+4} freePlaces={1} key={ index }/>

                }) }
            </div>
        ) }
    </> 
}


export default TableList