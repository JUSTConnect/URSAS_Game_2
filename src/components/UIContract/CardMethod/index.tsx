import css from './index.module.scss'

import { useState, useEffect } from 'react'

import { ABIItem } from '@/types/web3'


interface props {
    item: ABIItem
    getContract: Function
}

export default (props: props) => {
    const [result, setResult] = useState<string>('')
    const [values, setValues] = useState<object>({1:1})

    useEffect(() => {
        setValues({
            // ...values,
            1:1 
        })
        // props.item.inputs.forEach(input => {
        //     console.log(input)
        // })
        console.log(values)
        // console.log(props.item.inputs.length)
    }, [])

    return (
        <div className={ css.card }>
            { props.item.name }
            <div>
                { props.item.inputs.map(input=>(
                    <input
                        key={ input.name }
                        type="text"
                        placeholder={ `${input.name} (${ input.internalType })` }
                        className={ css.input }
                    />
                )) }
            </div>
            <button
                className={ css.button }
                onClick={ () => {
                    console.log(props.getContract()[props.item.name](1, 16, {gasLimit: 3000000, value: 1}).then(
                        (i: JSON)=>setResult(JSON.stringify(i, null, 2))
                    ))
                } }
            >Submit</button>
            <div className={ css.json }>
                <pre>
                    {result}
                </pre>
            </div>
        </div>
    )
}