import css from './index.module.scss'


interface winner
{
    walletHash: string,
    amount?: number
}


interface props
{
    data: winner[]
}


export default (props: props) => {
    return (
        <table className={ css.table }>
            <tr>
                <td className={ css.head }>   
                    Winner’s wallet
                </td>
                <td className={ [css.head, css.amount].join(' ') }>Amount</td>
            </tr>
            {/* { props.data.map(winner =>
                <tr>
                    <td>{ winner.walletHash }</td>
                    <td className={ css.amount }>{ winner.amount || '-' }</td>
                </tr>
            ) } */}
            <tr>
                <td>0x67B94473D81D0cd00849D563C94d0432Ac988B49</td>
                <td className={ css.amount }>1</td>
            </tr>
            <tr>
                <td>0x67B94473D81D0cd00849D563C94d0432Ac988B49</td>
                <td className={ css.amount }>1</td>
            </tr>
            <tr>
                <td>0x67B94473D81D0cd00849D563C94d0432Ac988B49</td>
                <td className={ css.amount }>1</td>
            </tr>
        </table>
    )
}