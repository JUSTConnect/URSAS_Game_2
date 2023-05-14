import css from './index.module.scss'

import Text from '@components/Typography'
import { Variant as text } from '@components/Typography'
import ABI from '@contract/abi'
import ABIGame from '@contract/abi-game'
import { ABIItem } from '@/types/web3'
import { getMintContract, getGameContract } from '@/utils/web3'

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
        <br />
        <br />
        <Text variant={text.h1}>Game Contract ABI</Text>  
        <Text variant={text.h2}>Functions ({ ABIGame.length })</Text>  
        <div className={ css.section }>
            <div className={ css.cardsMethod }>
                { (ABIGame as ABIItem[]).map((item: ABIItem, index) =>
                    <Card
                        item={item}
                        getContract={getGameContract}
                        key={index}
                    />
                ) }
            </div>
        </div>
        <Text variant={text.h2}>Errors</Text>  
        <div className={ css.section }>
            <div className={ css.cardsMethod }>
                { ABIGame.map((item) =>
                    item.type === 'error' &&
                        <div key={ item.name } className={ css.cardMethod }>
                            { item.name }
                        </div>
                ) }
            </div>
        </div>
    </div>
}