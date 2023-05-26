import css from './index.module.scss'

import { useContractFunction } from '@usedapp/core'
import { useState, useEffect } from 'react'

import { ABIItem } from '@/lib/types/web3'


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
    bool: 'checkbox',
    'uint256[]': 'text'
}

type input_type = typeof input_types

export default (props: props) => {
    const inputs = props.item.inputs.map(item=>item.name)
    type input = typeof inputs
    const [result, setResult] = useState<string>('')
    const [values, setValues] = useState<input>([])
    const [value, setValue] = useState<string>('')

    const {state, send} = useContractFunction(props.getContract(), props.item.name)

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
                    <div key={ index }>
                        <input
                            type={ input_types[input.type] }
                            placeholder={ `${input.name} (${ input.internalType })` }
                            className={ input_types[input.type] === 'checkbox' ? css.checkbox : css.input }
                            onInput={ (e) => {
                                if (input.type === 'uint256[]') {
                                    setValues({...values, [input.name]: e.currentTarget.value.split(',')})
                                } else {
                                    setValues({...values, [input.name]: e.currentTarget.value})
                                }
                            } }
                        />
                        { input_types[input.type] === 'checkbox' && input.name }
                    </div>
                )) }
                { props.item.stateMutability === 'payable' &&
                    <input
                        className={ css.input }
                        placeholder='Value'
                        type="text"
                        onInput={ (e) => setValue(e.currentTarget.value) }    
                    />
                }
            </div>
            <button
                className={ css.button }
                onClick={ () => {
                    send(...Object.values(values), Object.assign({gasLimit: 3000000}, props.item.stateMutability === 'payable' ? {value: value} : null))
                } }
            >Submit</button>
            <button
                className={ css.button }
                onClick={ () => {
                    props.item.inputs.map(
                        (input) => input.name
                    )
                } }
            >
                Debug
            </button>
            <pre>
                { JSON.stringify(values, null, 2) }
            </pre>
            <div className={ css.json }>
                <pre>
                    {state.transaction ? JSON.stringify(state.transaction) : ''}
                </pre>
            </div>
        </div>
    )
}