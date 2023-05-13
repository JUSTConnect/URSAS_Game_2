import { MetaMaskInpageProvider } from "@metamask/providers";

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider
  }

  type Level = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16

  type

  enum Rank {
    N1 = 'POT',
    N2 = 'CLOCK',
    N3 = 'A',
    N4 = 'K',
    N5 = 'Q',
    N6 = 'J',
    N7 = 'JO',
    N8 = '10',
    N9 = '9',
    N10 = '8',
    N11 = '7',
    N12 = '6',
    N13 = '5',
    N14 = '4',
    N15 = '3',
    N16 = '2',
  }
  
  enum Suit {
    DIAMOND = 1,
    HEART = 2,
    CLUB = 3,
    SPADE = 4
  }
}