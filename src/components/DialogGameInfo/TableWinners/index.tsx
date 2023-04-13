import css from './index.module.scss'

import Button, {
    Variant as ButtonVariant,
    Color as ButtonColor,
    Size as ButtonSize
} from '@/components/UIButton'

interface winner
{
    walletHash: string,
    amount?: number
}


interface props
{
    data: winner[]
    result: number
}


export default (props: props) => {
    return (
        <>
            <div className={ css.row }>
                Result: <span className={ 'textPrimary' }>
                    You { props.result === 1 ? 'win' : 'lose'}
                </span>
            </div>
            <div className={ css.container }>
                <table className={ css.table }>
                    <tbody>
                        <tr>
                            <td className={ css.head }>   
                                Winner’s wallet
                            </td>
                            <td className={ [css.head, css.amount].join(' ') }>Amount</td>
                        </tr>
                        { props.data.map((winner, index) =>
                            <tr key={ index } className={ index === 1 ? css.active : '' }>
                                <td>{ winner.walletHash }</td>
                                <td className={ css.amount }>{ winner.amount || '-' }</td>
                            </tr>
                        ) }
                    </tbody>
                </table>
            </div>
            <div className={ css.pagination }>
                <Button
                    variant={ ButtonVariant.OUTLINE }
                    color={ ButtonColor.DARK }
                    size={ ButtonSize.SM }
                    disabled
                >
                    <i className="fa-solid fa-arrow-left"></i>
                </Button>
                1-5 of 100
                <Button
                    variant={ ButtonVariant.OUTLINE }
                    color={ ButtonColor.DARK }
                    size={ ButtonSize.SM }
                >
                    <i className="fa-solid fa-arrow-right"></i>
                </Button>
            </div>
        </>
    )
}

export {
    type winner
}