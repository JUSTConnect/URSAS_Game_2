import css from './index.module.css'
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "@/app/store";
import {getAmountPlayersInBlackRoom} from "@/agents/web3/gameContract/tables";
import {ethers} from "ethers";


interface props {

}


export default (props: props) => {
  const [amount, setAmount] = useState(0)
  const firstTable = useSelector((state: RootState) => state.rooms?.rooms[0]?.tables[0])
  useEffect(() => {
    getAmountPlayersInBlackRoom().then((data) => {
      setAmount(Number(ethers.utils.formatEther(data)))
    }).catch((e: any) => {
      console.log(e)
    })
  }, [])

  const stakingProgress = amount === 0 ? 0 : (100 / amount * firstTable?.players?.length) > 100 ? 100 : (100 / amount * firstTable?.players?.length)

  return (
    <div className={css.loader} style={{width: `${stakingProgress}%`}}>

    </div>
  )
}