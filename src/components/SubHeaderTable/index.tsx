import css from './index.module.css'

import { useDispatch, useSelector } from 'react-redux'

import { RootState } from '@/app/store'
import { setChoosingCardPlace } from '@/features/table/tableSlice'
import Badge from '@components/Badge'
import SubHeader, { SubHeaderSection } from '@components/SubHeader'

interface SubHeaderTableProps
{
  modalActive: boolean
  setModalActive: Function
}

const SubHeaderTable = (props: SubHeaderTableProps) => {
  const dispatch = useDispatch()
  const game = useSelector((state: RootState)=>state.game)
  const table = useSelector((state: RootState)=>state.table)

  const countTakenPlaces = () => {
    return 10 - (table.basketPlaces.length + table.busyPlaces.length + table.stakedPlaces.length)
  }

  return <SubHeader>
    <SubHeaderSection>
      <div className={ css.theLoby }>Table n.{ game.currentGame }</div >
      <div className={ css.totalRooms }><span>Places</span> <Badge loading={ game.loadingTable }>&nbsp;{ countTakenPlaces() }/10&nbsp;</Badge></div>
    </SubHeaderSection>
    <SubHeaderSection>
      { !props.modalActive && Boolean(table.basketPlaces.length) &&
        <div>
            Confirm places <span className={ 'textPrimary' }>02:00</span>
        </div>
      }
      <button onClick={ !game.loadingTable ? ()=>{props.setModalActive(!props.modalActive); dispatch(setChoosingCardPlace(0))} : () => {} } className={ [css.filterButton].join(' ') }>
        {
          <svg  width="16" height="13" viewBox="0 0 16 13" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M3.33424 13C3.14535 13 2.97313 12.9418 2.81758 12.8253C2.66202 12.7084 2.55647 12.5555 2.50091 12.3666L0.634244 5.63331C0.578689 5.47776 0.603577 5.33331 0.708911 5.19998C0.814689 5.06665 0.956466 4.99998 1.13424 4.99998H4.50091L7.43424 0.633313C7.4898 0.544424 7.56758 0.472202 7.66758 0.416646C7.76758 0.361091 7.87313 0.333313 7.98424 0.333313C8.09535 0.333313 8.20091 0.361091 8.30091 0.416646C8.40091 0.472202 8.47869 0.544424 8.53424 0.633313L11.4676 4.99998H14.8676C15.0454 4.99998 15.1871 5.06665 15.2929 5.19998C15.3982 5.33331 15.4231 5.47776 15.3676 5.63331L13.5009 12.3666C13.4454 12.5555 13.3398 12.7084 13.1842 12.8253C13.0287 12.9418 12.8565 13 12.6676 13H3.33424ZM8.00091 10.3333C8.36758 10.3333 8.68158 10.2029 8.94291 9.94198C9.2038 9.68065 9.33424 9.36665 9.33424 8.99998C9.33424 8.63331 9.2038 8.31931 8.94291 8.05798C8.68158 7.79709 8.36758 7.66665 8.00091 7.66665C7.63424 7.66665 7.32047 7.79709 7.05958 8.05798C6.79824 8.31931 6.66758 8.63331 6.66758 8.99998C6.66758 9.36665 6.79824 9.68065 7.05958 9.94198C7.32047 10.2029 7.63424 10.3333 8.00091 10.3333ZM6.11758 4.99998H9.86758L7.98424 2.19998L6.11758 4.99998Z" 
              fill={ props.modalActive ? '#EFB23D' : '#B5C4E3' }
            />
          </svg>        
        }
      </button>
    </SubHeaderSection>
  </SubHeader>
}

export default SubHeaderTable