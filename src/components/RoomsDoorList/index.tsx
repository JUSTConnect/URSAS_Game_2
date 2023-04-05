import css from './index.module.css'

import { useSelector } from 'react-redux'

import { RootState } from '@/app/store'
import Item from './Item'


interface DoorListProps extends React.HTMLAttributes<HTMLDivElement>
{
    currentDoor: number
    setCurrentDoor: Function
}


const DoorList = (props: DoorListProps) => {
    const game = useSelector((state: RootState) => state.game)

    return <div className={ css.container }>
        <div className={ css.doorItemList }>
            <Item
                level={1}
                go={ game.walletConnected && props.currentDoor === 1 }
                onClick={ ()=> props.setCurrentDoor(1) }
            />
            <Item
                level={2}
                over={ game.walletConnected &&  true}
                go={ game.walletConnected && props.currentDoor === 2 }
                onClick={ ()=> props.setCurrentDoor(2) }
            />
            { [...Array(14)].map((item, index)=>{
                return <Item
                    level={index + 3}
                    go={ game.walletConnected && props.currentDoor === index+3 }
                    key={index}
                    onClick={ ()=> props.setCurrentDoor(index+3) }
                />
            }) }
        </div> 
    </div>
}


export default DoorList