import css from './index.module.scss'


type tableValues = [
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string
]


interface props
{
    values: tableValues
}


export default (props: props) => {
    return (
        <div className={ css.container }>
            <table className={ css.table }>
                <tbody>
                    <tr>
                        { Array.from(Array(16)).map((item, index)=>
                            <td key={ index } className={ css.head }>{ index + 1}</td>
                        ) }
                    </tr>
                    <tr>
                        { Array.from(Array(16)).map((item, index)=>
                            <td key={ index }>{ props.values[index] }</td>
                        ) }
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export { type tableValues }