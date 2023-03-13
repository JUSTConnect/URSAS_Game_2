import css from './index.module.css'

import { RoomsDoorItem as DoorItem } from '@components/RoomsDoor'


interface DoorListProps extends React.HTMLAttributes<HTMLDivElement>
{

}


const DoorList = (props: DoorListProps) => {
    return <div className={ css.container }>
        <div className={ css.doorItemList }>
            <DoorItem
                level={0}
                active={true}
                go={false}
            />
            { [...Array(50)].map((item, index)=>{
                return <DoorItem
                    level={index + 1}
                    active={false}
                    go={false}
                    key={index}
                />
            }) }
        </div> 
    </div>
}


export default DoorList