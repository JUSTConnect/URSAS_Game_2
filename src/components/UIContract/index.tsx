import css from './index.module.scss'

import { useState } from 'react'

import Text from '@components/Typography'
import { Variant as text } from '@components/Typography'
import ABI from '@/lib/contract/abi-mint'
import ABIGame from '@/lib/contract/abi-game'
import { ABIItem } from '@/lib/types/web3'
import { getMintContractNew, getGameContractNew } from '@/lib/utils/web3'

import Card from './CardMethod'

export default () => {
    const [showCallers, setShowCallers] = useState<boolean>(true)

    return <div className={ css.container }>
        <Text variant={text.h1}>Mint Contract ABI</Text>
        <div>
            <input
                type="checkbox"
                className={ css.checkbox }
                onInput={ (e) => setShowCallers(e.currentTarget.checked) }
            />
                show callers
        </div>
        <Text variant={text.h2}>Functions ({ ABI.length })</Text>
        <div className={ css.section }>
            <div className={ css.cardsMethod }>
                { (ABI as ABIItem[])?.map((item: ABIItem, index) =>
                    Boolean(showCallers)
                    ?
                    <Card
                        item={item}
                        getContract={getMintContractNew}
                        key={index}
                    />
                    :
                    <div key={index}>{item.name || '<undefined>'}</div>
                ) }
            </div>
        </div>
        <Text variant={text.h2}>Errors</Text>
        <div className={ css.section }>
            <div className={ css.cardsMethod }>
                { ABI?.map((item) =>
                    item.type === 'error' &&
                        <div key={ item.name } className={ css.cardMethod }>
                            { item.name }
                        </div>
                ) }
            </div>
        </div>
        <br />
        <br />
        <Text variant={text.h1}>Game Contract ABI</Text>
        <Text variant={text.h2}>Functions ({ ABIGame?.length })</Text>
        <div className={ css.section }>
            <div className={ css.cardsMethod }>
                {
                    (ABIGame as ABIItem[])?.map((item: ABIItem, index) =>
                        Boolean(showCallers)
                        ?
                        <Card
                            item={item}
                            getContract={getGameContractNew}
                            key={index}
                        />
                        :
                        <div key={index}>{item.name || '<undefined>'}</div>
                    )
                }
            </div>
        </div>
        <Text variant={text.h2}>Errors</Text>
        <div className={ css.section }>
            <div className={ css.cardsMethod }>
                { ABIGame?.map((item) =>
                    item.type === 'error' &&
                        <div key={ item.name } className={ css.cardMethod }>
                            { item.name }
                        </div>
                ) }
            </div>
        </div>
    </div>
}