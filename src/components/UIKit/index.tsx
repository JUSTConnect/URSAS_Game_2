import css from './index.module.scss'


import Text from '@components/Typography'
import { Variant as text } from '@components/Typography'
import Badge from '@components/UIBadge'
import Button from '@components/UIButton'
import {
    Color as ButtonColor,
    Variant as ButtonVariant,
    Size as ButtonSize
} from '@components/UIButton'
import Place from '@components/UIPlace'
import { CardRank, CardSuit } from '@components/Card'


export default () => {
    return <div className={ css.container }>
        <Text variant={text.h1}>URSAS UI-kit</Text>
        <div className={ css.section }>
            <Text variant={text.h2}>Typography:</Text>
            <Text>Paragraph:</Text>
            <Text>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic odit sed ipsam! Accusantium provident praesentium dicta odio sed officia possimus minima unde tenetur tempora, magnam quasi pariatur voluptates molestiae nobis!
            </Text>
            <Text muted={true}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic odit sed ipsam! Accusantium provident praesentium dicta odio sed officia possimus minima unde tenetur tempora, magnam quasi pariatur voluptates molestiae nobis!
            </Text>        
            <Text>Small:</Text>
            <Text variant={text.small}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic odit sed ipsam! Accusantium provident praesentium dicta odio sed officia possimus minima unde tenetur tempora, magnam quasi pariatur voluptates molestiae nobis!
            </Text>
            <Text variant={text.small} muted={true}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic odit sed ipsam! Accusantium provident praesentium dicta odio sed officia possimus minima unde tenetur tempora, magnam quasi pariatur voluptates molestiae nobis!
            </Text>
        </div>
        <div className={ css.section }>
            <Text variant={text.h2}>Button:</Text>
            <Button>LIGHT</Button>&nbsp;&nbsp;
            <Button color={ ButtonColor.DARK } variant={ ButtonVariant.NORMAL }>DARK</Button>&nbsp;&nbsp;
            <Button color={ ButtonColor.DARK } variant={ ButtonVariant.OUTLINE }>OUTLINE</Button>&nbsp;&nbsp;
            <Button><i className="fa-solid fa-wallet"></i></Button>&nbsp;&nbsp;
            <Button color={ ButtonColor.DARK } variant={ ButtonVariant.NORMAL }><i className="fa-solid fa-list"></i></Button>&nbsp;&nbsp;
            <Button color={ ButtonColor.DARK } variant={ ButtonVariant.OUTLINE }><i className="fa-sharp fa-solid fa-bars"></i></Button>&nbsp;&nbsp;
            <Button minWidth={true} circle={true}>CIRCLE</Button>&nbsp;&nbsp;
            <Button fullWidth={true}>FULL WIDTH</Button>
            <Button minWidth={true}>CLAIM</Button>&nbsp;&nbsp;
            <Button size={ButtonSize.MD}>Filter</Button>&nbsp;&nbsp;
            <Button size={ButtonSize.MD} disabled={true}>Filter</Button>&nbsp;&nbsp;
        </div>
        <div className={ css.section }>
            <Text variant={text.h2}>Badge:</Text>
            <Badge>12</Badge>
            <Badge mobileTransparrent={ true }>Mobile transparrent</Badge>
            <Badge loading={ true }>Mobile transparrent</Badge>
        </div>
        <div className={ css.section }>
            <Text variant={text.h2}>Place:</Text>
            <Place
                number={ 1 }
                card={ {rank: CardRank.CLOCK, suit: CardSuit.CLUB} }
            />
            <Place
                number={ 1 }
                staked={ true }
                card={ {rank: CardRank.N1, suit: CardSuit.CLUB} }
            />
            <Place
                number={ 1 }
                basket={ true }
                card={ {rank: CardRank.N10, suit: CardSuit.HEART} }
            />
            <Place
                number={ 1 }
            />
            <Place
                loading={ true }
            />
            <Place
                number={1}
                choosing={ true }
            />
        </div>
    </div>
}