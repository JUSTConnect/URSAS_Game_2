import css from './index.module.scss'

import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from '@/app/store'
import { setChoosingCardPlace } from '@/features/table/tableSlice'
import Badge from '@components/Badge'
import SubHeader, { SubHeaderSection, Buttons } from '@components/SubHeader'
import { Info } from '@components/SubHeader'
import Button, {
  Variant as ButtonVariant,
  Size as ButtonSize,
  Color as ButtonColor
} from '@components/UIButton'

interface SubHeaderTableProps
{
  modalActive: boolean
  setModalActive: Function
}

const SubHeaderTable = (props: SubHeaderTableProps) => {
  const dispatch = useDispatch()
  const game = useSelector((state: RootState)=>state.game)
  const table = useSelector((state: RootState)=>state.table)
  const [infoActive, setInfoActive] = useState<boolean>(false)

  const countTakenPlaces = () => {
    return 10 - (table.basketPlaces.length + table.busyPlaces.length + table.stakedPlaces.length)
  }

  return <SubHeader>
    <SubHeaderSection>
      <div>
        <span className={ css.theLoby }>Room <span className={ 'textPrimary' }>{ game.currentRoom } Level</span></span>
        &nbsp;
        <span className={ css.theLoby }>Table <span className={ 'textPrimary' }>n. 1020</span></span>
      </div>
      <div
        className={[
          css.info,
          infoActive && css.infoActive
        ].join(' ')}
      >
        <Info>
          <div className={ css.infoContent }>
            <div>
              Base time: <span className={'textPrimary'}>24h</span>
            </div>
            <div>
              Increase time: <span className={'textPrimary'}>2h</span>
            </div>
            <div>
              Suit: <span className={'textPrimary'}>Hearts</span>
            </div>
            <div>
              Places: <span className={'textPrimary'}>{ table.stakedPlaces.length }/10</span>
            </div>
          </div>
        </Info>
      </div>
    </SubHeaderSection>
    <SubHeaderSection>
      <Buttons>
        <Button
          onClick={ () => {setInfoActive(!infoActive)} }
          className={ [css.button, css.buttonInfo, infoActive && css.buttonActive].join(' ') }
          size={ ButtonSize.SM }
          variant={ ButtonVariant.NORMAL }
          color={ ButtonColor.DARK }
        >
          <i className="fa-sharp fa-solid fa-circle-info"></i>
        </Button>
        <Button
          onClick={ !game.loadingTable ? ()=>{props.setModalActive(!props.modalActive); dispatch(setChoosingCardPlace(0))} : () => {} }
          className={ [css.button, props.modalActive && css.buttonActive].join(' ') }
          size={ ButtonSize.SM }
          variant={ ButtonVariant.NORMAL }
          color={ ButtonColor.DARK }
        >
          <i className="fa-sharp fa-solid fa-basket-shopping"></i>
        </Button>
      </Buttons>
    </SubHeaderSection>
  </SubHeader>
}

export default SubHeaderTable