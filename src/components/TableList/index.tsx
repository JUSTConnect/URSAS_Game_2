import css from './index.module.css'

import Table from '@components/Table'


interface TableListProps extends React.HTMLAttributes<HTMLDivElement>
{

}


const TableList = (props: TableListProps) => {
    return <div className={ css.tableList }>
        <Table isActive={false} tableNumber={1} freePlaces={1}/>
        <Table isActive={true} tableNumber={1} freePlaces={1}/>
        <Table isActive={true} tableNumber={1} freePlaces={1}/>
        <Table isActive={true} tableNumber={1} freePlaces={1}/>
    </div>
}


export default TableList