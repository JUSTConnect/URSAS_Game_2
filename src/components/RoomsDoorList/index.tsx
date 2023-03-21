import css from './index.module.css'

import Item from './Item'


interface DoorListProps extends React.HTMLAttributes<HTMLDivElement>
{
    currentDoor: number
    setCurrentDoor: Function
}


const DoorList = (props: DoorListProps) => {
    return <div className={ css.container }>
        <div className={ css.doorItemList }>
            <Item
                level={1}
                go={ props.currentDoor === 1 }
                onClick={ ()=> props.setCurrentDoor(1) }
            />
            <Item
                level={2}
                over={true}
                go={ props.currentDoor === 2 }
                onClick={ ()=> props.setCurrentDoor(2) }
            />
            { [...Array(14)].map((item, index)=>{
                return <Item
                    level={index + 3}
                    go={ props.currentDoor === index+3 }
                    key={index}
                    onClick={ ()=> props.setCurrentDoor(index+3) }
                />
            }) }
        </div> 
    </div>
}


export default DoorList