import css from './index.module.css'

import Item from './Item'


interface DoorListProps extends React.HTMLAttributes<HTMLDivElement>
{

}


const DoorList = (props: DoorListProps) => {
    return <div className={ css.container }>
        <div className={ css.doorItemList }>
            <Item
                level={0}
                active={true}
                go={true}
            />
            <Item
                level={0}
                active={true}
                go={false}
            />
            { [...Array(50)].map((item, index)=>{
                return <Item
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