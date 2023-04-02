import { HTMLAttributes } from 'react'
import css from './index.module.css'

enum Rank
{
    POT = 'POT',
    CLOCK = 'CLOCK',
    ACE = 'A',
    KING = 'K',
    QUEEN = 'Q',
    JACK = 'J',
    JOKER = 'JO',
    N10 = '10',
    N9 = '9',
    N8 = '8',
    N7 = '7',
    N6 = '6',
    N5 = '5',
    N4 = '4',
    N3 = '3',
    N2 = '2',
    N1 = '1'
}

enum Suit
{
    DIAMOND = 1,
    HEART = 2,
    CLUB = 3,
    SPADE = 4
}

function randomCard():[Rank, Suit] {
    const ranks = [Rank.POT, Rank.CLOCK, Rank.ACE, Rank.KING, Rank.QUEEN, Rank.JACK, Rank.JOKER, Rank.N10, Rank.N9, Rank.N8, Rank.N7, Rank.N6, Rank.N5, Rank.N4, Rank.N3, Rank.N2, Rank.N1]
    const suits = [Suit.DIAMOND, Suit.HEART, Suit.CLUB, Suit.SPADE]
    return [
        ranks[Math.floor(Math.random() * ranks.length)],
        suits[Math.floor(Math.random() * suits.length)]
    ]
}


interface props extends HTMLAttributes<HTMLButtonElement>
{
    rank: Rank
    suit: Suit
}

const suitIcons = {
    1: <svg width="14" height="17" viewBox="0 0 14 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.9022 0.000183105L0 8.41603L6.9022 17.0002L14 8.50018L6.9022 0.000183105Z" fill="#B5C4E3"/></svg>,
    2: <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.5447 0.000274019C7.79142 -0.0525562 7.14207 2.08707 7.0122 3.09084C6.85636 2.08707 6.23298 -0.0525562 3.47973 0.000274019C-0.156629 0.0795193 -0.624161 4.22669 0.622592 6.31348C1.89532 8.40027 2.54467 9.06065 3.8174 10.4078C5.0122 11.6493 6.44077 13.0757 6.96025 13.9474C6.96025 13.9474 6.98623 14.0531 7.0122 14.0267C7.03818 14.0531 7.06415 13.9474 7.06415 13.9474C7.58363 13.0757 9.0122 11.6757 10.207 10.4078C11.4797 9.08707 12.1291 8.40027 13.4018 6.31348C14.6486 4.22669 14.1551 0.0795193 10.5447 0.000274019Z" fill="#B5C4E3"/></svg>,
    3: <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.0885 6.04893C11.5701 4.48706 9.23166 5.42418 9.23166 5.42418C9.8694 4.77104 10.3249 4.25988 10.2338 3.18077C10.2338 3.15237 10.2338 3.09558 10.2338 3.06718C10.2338 1.36333 8.77613 0.000244141 6.954 0.000244141C5.13187 0.000244141 3.67417 1.36333 3.67417 3.06718C3.67417 3.29436 3.70454 3.49314 3.73491 3.69193C3.79565 4.43026 4.19044 4.88463 4.73708 5.42418C4.73708 5.42418 2.39869 4.51546 0.880248 6.04893C-0.607822 7.61079 0.151397 9.45663 0.606929 10.053C1.09283 10.6493 1.79131 11.6716 3.49196 11.5581C4.98003 11.4445 5.19261 11.2173 6.22515 10.4505C6.10367 12.552 4.73708 14.0002 4.73708 14.0002H4.82819H6.98437H9.14055H9.23166C8.4117 13.1767 7.68285 11.3309 7.77396 10.4789C8.77613 11.2173 9.01908 11.4729 10.4768 11.5581C12.1774 11.6716 12.8759 10.6493 13.3618 10.053C13.8477 9.45663 14.6069 7.61079 13.0885 6.04893Z" fill="#4E5E80"/></svg>,
    4: <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.4345 5.27806C10.8423 3.69222 9.00311 2.15594 8.20703 1.36301C7.63056 0.768325 7.2188 0.297528 7.02664 0.0992981V0.000183105C7.02664 0.000183105 6.99919 0.0249619 6.97174 0.0497406C6.97174 0.0249619 6.97174 0.000183105 6.97174 0.000183105V0.0992981C6.80703 0.297528 6.39527 0.743546 5.79134 1.36301C5.02272 2.18071 3.15605 3.717 1.56389 5.27806C-0.0282631 6.8639 -0.165518 8.42496 0.136443 9.73824C0.438404 11.0515 1.94821 12.2657 4.33644 11.9931C5.07762 11.9188 5.62664 11.5966 6.0384 11.1754C5.76389 13.0338 4.66585 13.9754 4.66585 13.9754H9.27762C8.42664 13.1329 8.12468 11.9188 8.04233 11.1754C8.42664 11.5719 8.97566 11.894 9.71684 11.9683C12.1051 12.2409 13.6149 11.002 13.9168 9.71346C14.1639 8.42496 14.0541 6.83912 12.4345 5.27806Z" fill="#4E5E80"/></svg>
}

const suitColors = {
    red: [Suit.DIAMOND, Suit.HEART],
    dark: [Suit.CLUB, Suit.SPADE]
}

const SpecialRanks = [
    Rank.POT,
    Rank.JOKER,
    Rank.CLOCK
]

const SpecialRankIcons = {
    'POT': <img className={ css.rankIcon } src="/assets/images/icons/card-pot.png" alt="pot"/>,
    'CLOCK': <img className={ css.rankIcon } src="/assets/images/icons/card-clock.png" alt="clock"/>,
    'JO': 'JO'
}


const Wrapper = (props: HTMLAttributes<HTMLButtonElement>) => {
    return <>
        { props.onClick ? (
            <button className={ props.className } onClick={ props.onClick }>
                { props.children }
            </button>
        ) : (
            <div className={ props.className }>
                { props.children }
            </div>
        ) }
    </>
}


export default (props: props) => {
    const isSpecial = () => {
        return SpecialRanks.includes(props.rank)
    }

    return <Wrapper
        onClick={ props.onClick }
        className={
            [
                css.card,
                isSpecial() ? css.special : '',
                props.rank === Rank.CLOCK ? css.clock : '',
                !isSpecial() && suitColors.red.includes(props.suit) ? css.red : css.dark,
                'fontSpecial',
                props.className,
            ].join(' ')
        }
    >
        <div className={ css.content }>
            <div className={ css.type}>
                { props.rank === Rank.POT || props.rank === Rank.JOKER || props.rank === Rank.CLOCK ? (
                    <>{ SpecialRankIcons[props.rank] }</>
                ) : (
                    props.rank
                ) }
            </div>
            { isSpecial() ? (
                ''
            ) : (
                <div className={ css.icon }>
                    { suitIcons[props.suit] }
                </div>
            ) }
        </div>
    </Wrapper>
} 

export {
    Rank as CardRank,
    Suit as CardSuit,
    randomCard
}