import css from './index.module.css'
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "@/app/store";


interface props {

}


export default (props: props) => {
  const [amount, setAmount] = useState(10)
  const firstTable = useSelector((state: RootState) => state.rooms?.rooms[0]?.tables[0])
  console.log(firstTable)
  useEffect(() => {
  }, [])

  return (
    <div className={css.loader}>

    </div>
  )
}