import css from './index.module.scss'

import Text from '@components/Typography'
import { Variant as text } from '@components/Typography'
import ABI from '@contract/abi'
import { ABIItem } from '@/types/web3'
import { getMintContract } from '@/utils/web3'

import Card from './CardMethod'

export default () => {
    return <div className={ css.container }>
        <Text variant={text.h1}>Mint Contract ABI</Text>  
        <Text variant={text.h2}>Functions ({ ABI.length })</Text>  
        <div className={ css.section }>
            <div className={ css.cardsMethod }>
                { (ABI as ABIItem[]).map((item: ABIItem, index) =>
                    <Card
                        item={item}
                        getContract={getMintContract}
                        key={index}
                    />
                    // item.type === 'function' &&
                    //     <div className={ css.cardMethod }>
                    //         { item.name }
                    //         <div>
                    //             { item.inputs.map(input=>(
                    //                 <input
                    //                     type="text"
                    //                     placeholder={ `${input.name} (${ input.internalType })` }
                    //                     className={ css.input }
                    //                 />
                    //             )) }
                    //         </div>
                    //         <button
                    //             className={ css.button }
                    //             onClick={ () => {
                    //                 console.log(getMintContract()[item.name](1, 16, {gasLimit: 3000000}).then(
                    //                     i=>console.log(i)
                    //                 ))
                    //             } }
                    //         >Submit</button>
                    //     </div>
                ) }
            </div>
        </div>
        <Text variant={text.h2}>Errors</Text>  
        <div className={ css.section }>
            <div className={ css.cardsMethod }>
                { ABI.map((item) =>
                    item.type === 'error' &&
                        <div key={ item.name } className={ css.cardMethod }>
                            { item.name }
                        </div>
                ) }
            </div>
        </div>
    </div>
}