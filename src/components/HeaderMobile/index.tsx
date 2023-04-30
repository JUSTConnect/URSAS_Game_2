import css from './index.module.scss'

import { useDispatch, useSelector } from 'react-redux'

import { RootState } from '@/app/store'
import { setFooterModal, setMintDialog } from '@/features/mainframe/mainframeSlice'
import Button, {
    Variant as ButtonVariant,
    Size as ButtonSize,
    Color as ButtonColor
} from '../UIButton'


const BurgerButton = (props: React.HTMLAttributes<HTMLButtonElement>) => {
    const main = useSelector((state: RootState) => state.mainframe)

    return (
        <Button
            onClick={props.onClick}
            color={ ButtonColor.DARK }
            size={ ButtonSize.SM }
            variant={ ButtonVariant.OUTLINE }
        >
            { !main.footerModal ? (
                <div className={ css.burgerButtonSticks }>
                    <div className={css.burgerButtonStick}></div>
                    <div className={css.burgerButtonStick}></div>
                </div>
            ) : (
                <svg className={ css.burgerButtonSticks } viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M2.40441 0.989586C2.20915 0.794324 1.89257 0.794324 1.6973 0.989586C1.50204 1.18485 1.50204 1.50143 1.6973 1.69669L6.2935 6.29289L0.990197 11.5962C0.794934 11.7915 0.794934 12.108 0.990197 12.3033C1.18546 12.4986 1.50204 12.4986 1.6973 12.3033L7.00061 7L12.3039 12.3033C12.4992 12.4986 12.8158 12.4986 13.011 12.3033C13.2063 12.108 13.2063 11.7914 13.011 11.5962L7.70772 6.29289L12.3039 1.69671C12.4992 1.50144 12.4992 1.18486 12.3039 0.989598C12.1086 0.794336 11.7921 0.794336 11.5968 0.989598L7.00061 5.58579L2.40441 0.989586Z" fill="url(#paint0_linear_122_26893)"/>
                    <defs>
                    <linearGradient id="paint0_linear_122_26893" x1="7.0006" y1="0.84314" x2="7.0006" y2="12.4498" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#E7DF36"/>
                    <stop offset="1" stopColor="#EFB23D"/>
                    </linearGradient>
                    </defs>
                </svg>
            ) }
        </Button>
    ) 
}

const HeaderMobile = () => {
    const main = useSelector((state: RootState) => state.mainframe)
    const dispatch = useDispatch()

    return <div className={ css.headerMobile }>
        <img src="/assets/images/logo.svg" alt="Logo" className={css.logo} />
        <div className={ css.buttons }>
            <Button
                onClick={ () => dispatch(setMintDialog(!main.mintDialog)) }
                size={ ButtonSize.SM }
                minWidth
            >
                buy
            </Button>
            <BurgerButton onClick={()=>{dispatch(setFooterModal(!main.footerModal))}}/>
        </div>
    </div>
}


export default HeaderMobile