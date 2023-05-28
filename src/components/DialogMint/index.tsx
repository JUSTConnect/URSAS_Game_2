import css from './index.module.scss'

import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { RoomMintData } from '@/agents/web3/mintContract/types'

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

import { getRoomListMintData } from '@/agents/web3/mintContract/rooms'
import { RoomLevel } from '@/lib/types/game'


interface props extends React.HTMLAttributes<HTMLDivElement>
{
    active?: boolean
}

export default (props: props) => {
    const dispatch = useDispatch()

    const [mintData, setMintData] = useState<RoomMintData[]|undefined>()

    const setValues = async () => {
        let data = await getRoomListMintData()
        setMintData(data)
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
                            { mintData ? (
                                mintData.map((item, index) => (
                                    <MintCard
                                        key={ index }
                                        price={ item.cost }
                                        available={ item.available }
                                        level={ 16-index as RoomLevel }
                                        resetValues={ setValues }
                                    />
                                ))
                            ) : ('loading') }
                        </div>
                    </Content>
                </Dialog>
            </div>
        </>
    )
}