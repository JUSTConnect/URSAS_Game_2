import css from './index.module.css'
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "@/app/store";
import {getAmountPlayersInBlackRoom} from "@/agents/web3/gameContract/tables";
import {ethers} from "ethers";


interface props {

}


export default (props: props) => {
  const [stakingProgress, setStakingProgress] = useState(0)
  const rooms = useSelector((state: RootState) => state.rooms?.rooms)
  useEffect(() => {
    getAmountPlayersInBlackRoom().then((amount) => {
      if (amount && rooms?.length && rooms[0]?.tables?.length) {
        const firstTable = rooms[0]?.tables[0]?.players?.length
        if (firstTable) {
          const stakingProgress = (100 / amount) * firstTable
          setStakingProgress(stakingProgress)
        }
      }
    })
  }, [rooms])


  return (
    <div className={css.loader} style={{width: `${stakingProgress}%`}}>

    </div>
  )
}