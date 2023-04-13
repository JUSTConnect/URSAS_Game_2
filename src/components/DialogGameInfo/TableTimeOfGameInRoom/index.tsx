import css from './index.module.scss'

interface props
{}

export default (props: props) => {
    return (
        <>
            <div className={ css.row }>
                Time of game in room: <span className={ 'textPrimary' }>Hours</span>
            </div>
            <div className={ css.container }>
                <table className={ css.table }>
                    <tbody>
                        <tr>
                            <td className={ css.head }>16</td>
                            <td className={ css.head }>15</td>
                            <td className={ css.head }>14</td>
                            <td className={ css.head }>13</td>
                            <td className={ css.head }>12</td>
                            <td className={ css.head }>11</td>
                            <td className={ css.head }>10</td>
                            <td className={ css.head }>9</td>
                            <td className={ css.head }>8</td>
                            <td className={ css.head }>7</td>
                            <td className={ css.head }>6</td>
                            <td className={ css.head }>5</td>
                            <td className={ css.head }>4</td>
                            <td className={ css.head }>3</td>
                            <td className={ css.head }>2</td>
                            <td className={ css.head }>1</td>
                        </tr>
                        <tr>
                            <td>24</td>
                            <td>24</td>
                            <td>24</td>
                            <td>24</td>
                            <td>24</td>
                            <td>24</td>
                            <td>24</td>
                            <td>24</td>
                            <td>24</td>
                            <td>24</td>
                            <td>24</td>
                            <td>24</td>
                            <td>24</td>
                            <td>24</td>
                            <td>24</td>
                            <td>24</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}