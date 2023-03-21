import css from './index.module.css'

import Table from '@components/Table'


interface TableListProps extends React.HTMLAttributes<HTMLDivElement>
{

}


const TableList = (props: TableListProps) => {
    return <div className={ css.tableList }>
        <Table isActive={true} tableNumber={1} freePlaces={1}/>
        <Table tableNumber={2} freePlaces={10}/>
        <Table tableNumber={3} gameEnd={'12:55'}/>
        <Table cooldown={true} tableNumber={2}/>
        { [...Array(50)].map((item, index)=>{
            return <Table tableNumber={index+4} freePlaces={1} key={ index }/>

        }) }
    </div>
}


export default TableList