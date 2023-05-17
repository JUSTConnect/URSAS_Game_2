import css from './index.module.scss'

import { BigNumber } from 'ethers'

import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { getMintContract } from '@/lib/utils/web3'
import { setMintDialog } from '@/features/mainframe/mainframeSlice'
import Dialog, {
    Header,
    HeaderButtons,
    ContentScrollable as Content,
} from '@components/Dialog'
import Button, {
    Color as ButtonColor,
    Variant as ButtonVariant,
    Size as ButtonSize,
} from '@components/UIButton'
import Blur from '../Blur'
import MintCard from './MintCard'



interface props extends React.HTMLAttributes<HTMLDivElement>
{
    active?: boolean
}

export default (props: props) => {
    const dispatch = useDispatch()
    const [prices, setPrices] = useState<BigNumber[]>([])
    const [limits, setLimits] = useState<number[][]>([[], []])

    const setValues = async () => {
        try {
            let prices: BigNumber[] = await getMintContract().getDataAboutCostsForRooms()
            let limits: number[][] = await getMintContract().getDataAboutLimitsForRooms()

            setLimits(limits)
            setPrices(prices)
        } catch(e) {
            console.log(`Error in Dialog Mint: ${e}`)   
        }
        
    }

    useEffect(() => {
        setValues()
    }, [])

    return (
        <>
            <Blur
                onClick={ () => dispatch(setMintDialog(false)) }
                isActive={ props.active }
            />
            <div className={
                [
                    css.wrapper,
                    props.active && css.active
                ].join(' ')
            }>
                <Dialog className={ [css.dialog, props.className].join(' ') }>
                    <Header>
                        <div className={ css.heading }>
                            Mint level
                        </div>
                        <HeaderButtons>
                            <Button
                                onClick={ () => dispatch(setMintDialog(false)) }
                                color={ ButtonColor.DARK }
                                variant={ ButtonVariant.OUTLINE }
                                size={ ButtonSize.SM }
                            >
                                <i className="fa-solid fa-arrow-left"></i>
                            </Button>
                        </HeaderButtons>
                    </Header>
                    <Content>
                        <div className={ css.mintCards }>
                            { Array.from(Array(16)).map((item, index) => (
                                <MintCard
                                    key={ index }
                                    price={ prices[15-index] }
                                    available={ limits[0][15-index] - limits[1][15-index] }
                                    level={16-index}
                                    resetValues={ setValues }
                                />
                            )) }
                        </div>
                    </Content>
                </Dialog>
            </div>
        </>
    )
}