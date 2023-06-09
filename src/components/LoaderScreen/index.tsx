import css from './index.module.css'
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "@/app/store";
import {getAmountPlayersInBlackRoom} from "@/agents/web3/gameContract/tables";


interface props {

}


export default (props: props) => {
  const [amount, setAmount] = useState(10)
  const firstTable = useSelector((state: RootState) => state.rooms?.rooms[0]?.tables[0])
  useEffect(() => {
    getAmountPlayersInBlackRoom().then((data) => {
      setAmount(data)
    })
  }, [])

  const stakingProgress = firstTable?.placesAvailable && firstTable?.placesAvailable ? (firstTable?.players?.length - firstTable.placesAvailable) * 10 : 0

  return (
    <div className={css.loader} style={{width: `${stakingProgress}%`}}>

    </div>
  )
}