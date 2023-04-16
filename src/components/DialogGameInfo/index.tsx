import css from './index.module.scss'

import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { setGameInfoDialog } from '@/features/mainframe/mainframeSlice'
import Dialog, {
    Header,
    HeaderButtons,
    ContentScrollable,
} from '@components/Dialog'
import Button, {
    Color as ButtonColor,
    Variant as ButtonVariant,
    Size as ButtonSize,
} from '@components/UIButton'
import Blur from '../Blur'

import type { tableValues } from './BaseTableRooms'
import DataMain from './DataMain'
import DataGame from './DataGame'
import TableWinners from './TableWinners'
import RowWithTable from './RowWithTable'


enum typePrize
{
    WL = 'White List',
    NFT = 'NFT',
    COIN = 'Coin'
}

enum seasonState
{
    CURRENT = 'Current',
    ANNOUNCEMENT = 'Announcement',
    RESULT = 'Result'
}

interface info
{
    typePrize?: typePrize
    result?: number
}


interface props extends React.HTMLAttributes<HTMLDivElement>
{
    active?: boolean
    data?: info
}

// example data

const winnersWallets = [
    {
        walletHash: '0x67B94473D81D0cd00849D563C94d0432Ac988B49',
        amount: 10
    },
    {
        walletHash: '0x67B94473D81D0cd00849D563C94d0432Ac988B49',
        amount: 10
    },
    {
        walletHash: '0x67B94473D81D0cd00849D563C94d0432Ac988B49',
        amount: 10
    },
    {
        walletHash: '0x67B94473D81D0cd00849D563C94d0432Ac988B49',
        amount: 10
    },
    {
        walletHash: '0x67B94473D81D0cd00849D563C94d0432Ac988B49',
        amount: 10
    },
    {
        walletHash: '0x67B94473D81D0cd00849D563C94d0432Ac988B49',
        amount: 10
    },
]

const pricesMint: tableValues = [
    '123',
    '123',
    '123',
    '123',
    '123',
    '123',
    '123',
    '123',
    '123',
    '123',
    '123',
    '123',
    '123',
    '123',
    '123',
    '123121212',
]

//


export default (props: props) => {
    const dispatch = useDispatch()
    const [state, setState] = useState<seasonState>(seasonState.ANNOUNCEMENT)

    return (
        <>
            <Blur
                onClick={ () => dispatch(setGameInfoDialog(false)) }
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
                            Game info {'>'} Season <span className={ 'textPrimary' }>1</span>
                        </div>
                        <HeaderButtons>
                            <Button
                                onClick={ () => dispatch(setGameInfoDialog(false)) }
                                color={ ButtonColor.DARK }
                                variant={ ButtonVariant.OUTLINE }
                                size={ ButtonSize.SM }
                            >
                                <i className="fa-solid fa-arrow-left"></i>
                            </Button>
                        </HeaderButtons>
                    </Header>
                    <ContentScrollable>
                        Switch mode (for testing) &nbsp;
                        <button onClick={ () => setState(seasonState.CURRENT) }>Current</button>
                        <button onClick={ () => setState(seasonState.ANNOUNCEMENT) }>Announcement</button>
                        <button onClick={ () => setState(seasonState.RESULT) }>Result</button>
                        <br />
                        <br />
                        <div className={ css.section }>
                            <div className={ css.inner }>
                                <DataMain data={props.data} state={state}/>

                                { state === seasonState.CURRENT ? (
                                    <RowWithTable
                                        keyName={ 'Prices mint' }
                                        tableValues={ pricesMint }
                                    />
                                ) : state === seasonState.RESULT ? (
                                    <TableWinners
                                        result={1}
                                        data={
                                            winnersWallets
                                        }
                                    />
                                ) : null }
                            </div>
                        </div>
                        { Boolean(state === seasonState.CURRENT) &&
                            <div className={ css.section }>
                                <div className={ css.inner }>
                                    <DataGame/>
                                    <RowWithTable
                                        keyName={ 'Time of game in room' }
                                        value={ 'Hours' }
                                        tableValues={ pricesMint }
                                    />
                                    <RowWithTable
                                        keyName={ 'Games completed' }
                                        tableValues={ pricesMint }
                                    />
                                </div>
                            </div>
                        }
                    </ContentScrollable>
                </Dialog>
            </div>
        </>
    )
}

export {
    type info,
    typePrize,
    seasonState
}