import css from './index.module.scss'

import BaseTableRooms, { type tableValues } from '../BaseTableRooms'

interface props
{
    keyName: string
    value?: string
    tableValues: tableValues
}


export default (props: props) => {
    return (
        <>
            <div className={ css.row }>
                { props.keyName }: <span className={ 'textPrimary' }>{ props.value }</span>
            </div>
            <BaseTableRooms
                values={ props.tableValues }
            />
        </>
    )
}