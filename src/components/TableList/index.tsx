import css from './index.module.css'

import Table from '@components/Table'


interface TableListProps extends React.HTMLAttributes<HTMLDivElement>
{

}


const TableList = (props: TableListProps) => {
    return <div className={ css.tableList }>
        <Table isActive={true} tableNumber={1} freePlaces={1}/>
        <Table disabled={true} tableNumber={2} freePlaces={1}/>
        { [...Array(50)].map((item, index)=>{
            return <Table tableNumber={index+2} freePlaces={1} key={ index }/>

        }) }
    </div>
}


export default TableList