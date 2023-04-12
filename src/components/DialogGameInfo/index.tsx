import css from './index.module.scss'

import { useDispatch } from 'react-redux'

import { setGameInfoDialog } from '@/features/mainframe/mainframeSlice'
import Dialog, {
    Header,
    HeaderButtons,
    Content,
} from '@components/Dialog'
import Button, {
    Color as ButtonColor,
    Variant as ButtonVariant,
    Size as ButtonSize,
} from '@components/UIButton'
import Blur from '../Blur'

import TableWinners from './TableWinners'


interface props extends React.HTMLAttributes<HTMLDivElement>
{
    active?: boolean
}

export default (props: props) => {
    const dispatch = useDispatch()

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
                    <Content>
                        <div className={ css.section }>
                            <div className={ css.inner }>
                                <div className={ css.row }>
                                    Game start date: <span className={ 'textPrimary' }>13 March 2023 00:01</span>
                                </div>
                                <div className={ css.row }>
                                    Game finish date: <span className={ 'textPrimary' }>23 March 2023 00:01</span>
                                </div>
                                <div className={ css.row }>
                                    Game duration time: <span className={ 'textPrimary' }>6 Days 12 Hours 43 Minutes</span>
                                </div>
                                <div className={ css.row }>
                                    Announcement of results: <span className={ 'textPrimary' }>32:17</span>
                                </div>
                                <div className={ css.row }>
                                    Prize chain: <span className={ 'textPrimary' }>Polygon</span>
                                </div>
                                <div className={ css.row }>
                                    Type Prize: <span className={ 'textPrimary' }>NFT</span>
                                </div>
                                <div className={ css.row }>
                                    Prize: <span className={ 'textPrimary' }>Y00TOS </span>
                                </div>
                                <div className={ css.row }>
                                    Distribution participants: <span className={ 'textPrimary' }>100</span>
                                </div>
                                <div className={ css.row }>
                                    Distribution system: <span className={ 'textPrimary' }>Raffle</span>
                                </div>
                                <div className={ css.row }>
                                    Winners: <span className={ 'textPrimary' }>1</span>
                                </div>
                                <div className={ css.row }>
                                    Total game complete: <span className={ 'textPrimary' }>12320</span>
                                </div>
                                <br />
                                <div className={ css.tableContainer }>
                                    <table className={ css.tableRooms }>
                                        <tr>
                                            <td className={ css.tableRoomsHead }>123</td>
                                            <td className={ css.tableRoomsHead }>1</td>
                                            <td className={ css.tableRoomsHead }>1</td>
                                            <td className={ css.tableRoomsHead }>1</td>
                                            <td className={ css.tableRoomsHead }>1</td>
                                            <td className={ css.tableRoomsHead }>1</td>
                                            <td className={ css.tableRoomsHead }>1</td>
                                            <td className={ css.tableRoomsHead }>1</td>
                                            <td className={ css.tableRoomsHead }>1</td>
                                            <td className={ css.tableRoomsHead }>1</td>
                                            <td className={ css.tableRoomsHead }>1</td>
                                            <td className={ css.tableRoomsHead }>1</td>
                                            <td className={ css.tableRoomsHead }>1</td>
                                            <td className={ css.tableRoomsHead }>1</td>
                                            <td className={ css.tableRoomsHead }>1</td>
                                            <td className={ css.tableRoomsHead }>1</td>
                                        </tr>
                                        <tr>
                                            <td>1</td>
                                            <td>1</td>
                                            <td>1</td>
                                            <td>1</td>
                                            <td>1</td>
                                            <td>1</td>
                                            <td>1</td>
                                            <td>1</td>
                                            <td>1</td>
                                            <td>1</td>
                                            <td>1</td>
                                            <td>1</td>
                                            <td>1</td>
                                            <td>1</td>
                                            <td>1</td>
                                            <td>1</td>
                                        </tr>
                                    </table>
                                </div>
                                <br />
                                {/* <div className={ css.tableContainer }>
                                    <TableWinners/>
                                </div> */}
                            </div>
                        </div>
                    </Content>
                </Dialog>
            </div>
        </>
    )
}