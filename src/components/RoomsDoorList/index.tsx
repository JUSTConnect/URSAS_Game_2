import css from './index.module.css'

import { useSelector } from 'react-redux'
import { useEthers } from '@usedapp/core'

import { RootState } from '@/app/store'
import Item from './Item'


interface DoorListProps extends React.HTMLAttributes<HTMLDivElement>
{
    currentDoor: number
    setCurrentDoor: Function
}


const DoorList = (props: DoorListProps) => {
    const { account } = useEthers()

    return <div className={ css.container }>
        <div className={ css.doorItemList }>
            {/*<Item*/}
            {/*    level={1}*/}
            {/*    go={ Boolean(account) && props.currentDoor === 1 }*/}
            {/*    onClick={ ()=> props.setCurrentDoor(1) }*/}
            {/*/>*/}
            {/*<Item*/}
            {/*    level={2}*/}
            {/*    over={ Boolean(account) &&  true}*/}
            {/*    go={ Boolean(account) && props.currentDoor === 2 }*/}
            {/*    onClick={ ()=> props.setCurrentDoor(2) }*/}
            {/*/>*/}
            { [...Array(16)].map((item, index)=>{
                return <Item
                    level={index + 1}
                    go={ Boolean(account) && props.currentDoor === index+1 }
                    key={index}
                    onClick={ ()=> props.setCurrentDoor(index+1) }
                />
            }) }
        </div> 
    </div>
}


export default DoorList