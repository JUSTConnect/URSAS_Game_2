import css from './index.module.scss'

import { useDispatch, useSelector } from 'react-redux'

import { RootState } from '@/app/store'
import { setActiveHeaderDropdown } from '@/features/mainframe/mainframeSlice'

type controller = {
    id: number
    currentId: number
    setId: Function
}


interface DropdownProps extends React.HTMLAttributes<HTMLDivElement>
{
    text: React.ReactElement
    badgeValue: number
    values: Array<Array<Number>>
    dropdownId: number
    controller?: controller
    rooms?: boolean
    tables?: boolean
    loading?: boolean
}


const Loader = () => {
    return <div className={ css.loaderContainer }>
        <div className={ css.loaderContainerInner }>
            <div className={ css.loaderBorder }>
                <div className={ css.loaderBorderInner }>

                </div>
            </div>
            <div className={ css.loader }>
                <div className={ css.loaderInner }></div>
            </div>
        </div>
    </div>
}


const Dropdown = (props: DropdownProps) => {
    const mainframe = useSelector((state: RootState) => state.mainframe)
    const dispatch = useDispatch()

    return <div className={ [css.dropdown, props.loading ? css.loading : ''].join(' ') }>
        <button
            className={ css.button }
            onClick={
                () => {
                    dispatch(setActiveHeaderDropdown(
                        mainframe.activeHeaderDropdown === props.dropdownId ? 0 : props.dropdownId 
                    ))
                } 
            }>
            <div className={ [css.text, 'fixMargin'].join(' ') }>
                { props.text }       
            </div>
            { !props.loading ? (
                <div className={ css.badge}>
                    <span className={ [css.badgeValue, 'fixMargin'].join(' ') }>
                        { props.badgeValue }
                    </span>
                </div>
            ) : (
                <Loader/>
            )}
            <i className={ ['fa-solid fa-play', [css.arrowIcon, mainframe.activeHeaderDropdown === props.dropdownId ? css.arrowIconActive : '' ].join(' ')].join(' ')}></i>
        </button>
        <div className={ [css.data, mainframe.activeHeaderDropdown === props.dropdownId ? css.dataActive : ''].join(' ') }>
            <img className={ css.dataAngleLeft } src="/assets/images/texture/dropdown-angle-left.png" alt="" />
            <img className={ css.dataAngleRight } src="/assets/images/texture/dropdown-angle-right.png" alt="" />
            <div className={ css.dataContainer }>
                { props.rooms ? (
                    <>
                        { props.values.map((item, index)=>{
                            return <div key={ index } className={css.dataItem}>
                                <><span className={ 'textMuted' }>Room</span> { item[0] } level</>
                            </div>
                        }) }
                    </>
                ) : '' }
                { props.tables ? (
                    <>
                        { props.values.map((item, index)=>{
                            return <div key={ index } className={css.dataItem}>
                                <><span className={ 'textMuted' }>Table</span> <span className={ 'fixNumber' }>№</span>{ item[0] } - <span className={ 'textMuted' }>Place</span> <span className={ 'fixNumber' }>№</span>{ item[1] }</>
                            </div>
                        }) }
                    </>
                ) : '' }
            </div>
        </div>
    </div>
}

export default Dropdown
export { Loader }