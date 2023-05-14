import css from './index.module.scss'

import { useState, useEffect } from 'react'

import { ABIItem, ABIType } from '@/types/web3'


interface props {
    item: ABIItem
    getContract: Function
}

const formatters = {
    uint256: Number,
    uint32: Number,
    uint8: Number,
    address: String,
    bool: Boolean
}

const input_types = {
    uint256: 'number',
    uint32: 'number',
    uint8: 'number',
    address: 'text',
    bool: 'checkbox'
}

type input_type = typeof input_types

export default (props: props) => {
    const inputs = props.item.inputs.map(item=>item.name)
    type input = typeof inputs
    const [result, setResult] = useState<string>('')
    const [values, setValues] = useState<input>([])

    useEffect(() => {
        let values = Object()

        props.item.inputs.forEach(input => {
            values[input.name] = ''
        })
        setValues(values)
    }, [])
    return (
        <div className={ css.card }>
            { props.item.name } ({ props.item.type } - { props.item.stateMutability })
            <div>
                { props.item.inputs.map((input, index)=>(
                    <>
                        <input
                            key={ input.name }
                            type={ input_types[input.type] }
                            placeholder={ `${input.name} (${ input.internalType })` }
                            className={ input_types[input.type] === 'checkbox' ? css.checkbox : css.input }
                            onInput={ (e) => setValues({...values, [input.name]: e.currentTarget.value}) }
                        />
                        { input_types[input.type] === 'checkbox' && input.name }
                    </>
                )) }
            </div>
            <button
                className={ css.button }
                onClick={ () => {
                    console.log(Object.values(values))
                    props.getContract()[props.item.name](...Object.values(values), Object.assign({gasLimit: 3000000}, props.item.stateMutability === 'payable' ? {value: 1} : null))
                        .then(
                            (i: JSON)=>setResult(JSON.stringify(i, null, 2))
                        )
                        .catch(
                            (e: Error) => setResult(e.message)
                        )
                } }
            >Submit</button>
            <button
                className={ css.button }
                onClick={ () => {
                    props.item.inputs.map(
                        (input) => input.name
                    )
                    console.log(Object.values(values))
                } }
            >
                Debug
            </button>
            <pre>
                { JSON.stringify(values, null, 2) }
            </pre>
            <div className={ css.json }>
                <pre>
                    {result}
                </pre>
            </div>
        </div>
    )
}