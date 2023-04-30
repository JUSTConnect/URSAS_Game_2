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
import Card, { CardRank, CardSuit } from '@components/Card'

import Dialog, {
    Header as DialogHeader,
    HeaderButtons as DialogHeaderButtons,
    Content as DialogContent,
    Footer as DialogFooter,
    FooterButtons as DialogFooterButtons
} from '@components/Dialog'

import DialogGameAccount from '@components/DialogGameAccount'
import DialogMint from '@components/DialogMint'
import DialogGameInfo, {typePrize} from '@components/DialogGameInfo'
import TestEthers from '../TestEthers'


export default () => {
    return <div className={ css.container }>
        <Text variant={text.h1}>URSAS UI-kit</Text>
        {/* <div className={ css.section }>
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
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                <Badge>12</Badge>
                <Badge mobileTransparrent={ true }>Mobile transparrent</Badge>
                <Badge loading={ true }>Mobile transparrent</Badge>
            </div>
        </div>
        <div className={ css.section }>
            <Text variant={text.h2}>Place:</Text>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
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
        <div className={ css.section }>
            <Text variant={text.h2}>Cards:</Text>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                <Card
                    suit={CardSuit.CLUB}
                    rank={CardRank.ACE}
                />
                __
                <Card
                    suit={CardSuit.HEART}
                    rank={CardRank.ACE}
                />
                --
                <Card
                    suit={CardSuit.SPADE}
                    rank={CardRank.ACE}
                />
                --
                <Card
                    suit={CardSuit.DIAMOND}
                    rank={CardRank.ACE}
                />
            </div>
            <br />
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                <Card
                    suit={CardSuit.CLUB}
                    rank={CardRank.N2}
                />
                --  
                <Card
                    suit={CardSuit.CLUB}
                    rank={CardRank.N3}
                />
                __
                <Card
                    suit={CardSuit.CLUB}
                    rank={CardRank.N4}
                />
                __
                <Card
                    suit={CardSuit.CLUB}
                    rank={CardRank.N5}
                />
                __
                <Card
                    suit={CardSuit.CLUB}
                    rank={CardRank.N6}
                />
                __
                <Card
                    suit={CardSuit.CLUB}
                    rank={CardRank.N7}
                />
                __
                <Card
                    suit={CardSuit.CLUB}
                    rank={CardRank.N8}
                />
                --
                <Card
                    suit={CardSuit.CLUB}
                    rank={CardRank.N9}
                />
                --
                <Card
                    suit={CardSuit.CLUB}
                    rank={CardRank.N10}
                />
                -----
                <Card
                    suit={CardSuit.CLUB}
                    rank={CardRank.JACK}
                />
                --
                <Card
                    suit={CardSuit.CLUB}
                    rank={CardRank.QUEEN}
                />
                --
                <Card
                    suit={CardSuit.CLUB}
                    rank={CardRank.KING}
                />
                --
                <Card
                    suit={CardSuit.CLUB}
                    rank={CardRank.N1}
                />
            </div>
            <br />
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                <Card
                    suit={CardSuit.DIAMOND}
                    rank={CardRank.POT}
                />
                --
                <Card
                    suit={CardSuit.CLUB}
                    rank={CardRank.JOKER}
                />
                --
                <Card
                    suit={CardSuit.CLUB}
                    rank={CardRank.CLOCK}
                />
            </div>
        </div>
        <div>
            <Text variant={ text.h2 }>
                Dialog:
            </Text>
            <Dialog className={ css.dialog }>
                <DialogHeader>
                    Header
                    <DialogHeaderButtons>
                        <Button
                            color={ ButtonColor.DARK }
                            variant={ ButtonVariant.NORMAL }
                            size={ ButtonSize.SM }
                        >
                            button 1
                        </Button>
                        <Button
                            color={ ButtonColor.DARK }
                            variant={ ButtonVariant.NORMAL }
                            size={ ButtonSize.SM }
                        >
                            button 2
                        </Button>
                        <Button color={ ButtonColor.DARK } variant={ ButtonVariant.OUTLINE } size={ ButtonSize.SM }><i className="fa-solid fa-arrow-left"></i></Button>
                    </DialogHeaderButtons>
                </DialogHeader>
                <DialogContent>
                    Content
                </DialogContent>
                <DialogFooter>
                    <DialogFooterButtons>
                        <Button
                            color={ ButtonColor.LIGHT }
                            size={ ButtonSize.SM }
                            fullWidth
                        >
                            button 1
                        </Button>
                        <Button
                            color={ ButtonColor.LIGHT }
                            size={ ButtonSize.SM }
                            fullWidth
                        >
                            button 2
                        </Button>
                    </DialogFooterButtons>
                </DialogFooter>
            </Dialog>
            <br />
            <br />
        </div> */}
        {/* <div>
            <Text variant={ text.h2 }>
                Game info dialog:
            </Text>
            <DialogGameInfo data={
                {
                    typePrize: typePrize.WL,
                    result: 1
                }
            }/>
            <br />
            <br />
        </div> */}
        <TestEthers/>
    </div>
}