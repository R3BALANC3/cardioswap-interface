import { ChainId, JSBI, Percent, Token, WETH } from '@cardioswap/v2-sdk'

export const ROUTER_ADDRESS = '0x078A74FdB0B1d36Cd4c8b56baBe7A102947d2f3d'

// a list of tokens by chain
type ChainTokenList = {
  readonly [chainId in ChainId]: Token[]
}



export const WCELO = new Token(ChainId.MAINNET, '0x7092D649371eE35d85978DE893A3B363E475c13A', 18, 'WCELO', 'Wrapped CELO')
export const FLUSH = new Token(ChainId.MAINNET, '0xB7B060E5494CC58EB630456AEBdE76CB429eF6b0', 18, 'FLUSH', 'Straight Flush')
export const R33 = new Token(ChainId.MAINNET, '0xB7B060E5494CC58EB630456AEBdE76CB429eF6b0', 18, 'R33', 'R3BALANC3')
export const ETH = new Token(ChainId.MAINNET, '0x02DcdD04e3F455D838cd1249292C58f3B79e3C3C', 18, 'WETH', 'Wrapped Ether from Ethereum')
export const USDT = new Token(ChainId.MAINNET, '0x0Cb6F5a34ad42ec934882A05265A7d5F59b51A2f', 18, 'USDT', 'Tether USD from Ethereum')
export const USDC = new Token(ChainId.MAINNET, '0x15D38573d2feeb82e7ad5187aB8c1D52810B1f07', 18, 'USDC', 'USD Coin from Ethereum')
export const DAI = new Token(ChainId.MAINNET, '0xefD766cCb38EaF1dfd701853BFCe31359239F305', 18, 'DAI', 'Dai Stablecoin from Ethereum')


const WETH_ONLY: ChainTokenList = {
  [ChainId.MAINNET]: [WETH[ChainId.MAINNET]],
  [ChainId.BSCTESTNET]: [WETH[ChainId.BSCTESTNET]],
}

// used to construct intermediary pairs for trading
export const BASES_TO_CHECK_TRADES_AGAINST: ChainTokenList = {
  ...WETH_ONLY,
  [ChainId.MAINNET]: [...WETH_ONLY[ChainId.MAINNET], R33, ETH, USDT, USDC],
}

/**
 * Some tokens can only be swapped via certain pairs, so we override the list of bases that are considered for these
 * tokens.
 */
export const CUSTOM_BASES: { [chainId in ChainId]?: { [tokenAddress: string]: Token[] } } = {
  [ChainId.MAINNET]: {},
}

// used for display in the default list when adding liquidity
export const SUGGESTED_BASES: ChainTokenList = {
  ...WETH_ONLY,
  [ChainId.MAINNET]: [...WETH_ONLY[ChainId.MAINNET], R33, ETH, USDT, USDC],
}

// used to construct the list of all pairs we consider by default in the frontend
export const BASES_TO_TRACK_LIQUIDITY_FOR: ChainTokenList = {
  ...WETH_ONLY,
  [ChainId.MAINNET]: [...WETH_ONLY[ChainId.MAINNET], R33, ETH, USDT, USDC],
}

export const PINNED_PAIRS: { readonly [chainId in ChainId]?: [Token, Token][] } = {
  [ChainId.MAINNET]: [
    [WCELO, R33],
    [WCELO, USDT],
    [USDT, USDC],
  ],
}

export const NetworkContextName = 'NETWORK'

// default allowed slippage, in bips
export const INITIAL_ALLOWED_SLIPPAGE = 800
// 20 minutes, denominated in seconds
export const DEFAULT_DEADLINE_FROM_NOW = 60 * 20

// one basis point
export const ONE_BIPS = new Percent(JSBI.BigInt(1), JSBI.BigInt(10000))
export const BIPS_BASE = JSBI.BigInt(10000)
// used for warning states
export const ALLOWED_PRICE_IMPACT_LOW: Percent = new Percent(JSBI.BigInt(100), BIPS_BASE) // 1%
export const ALLOWED_PRICE_IMPACT_MEDIUM: Percent = new Percent(JSBI.BigInt(300), BIPS_BASE) // 3%
export const ALLOWED_PRICE_IMPACT_HIGH: Percent = new Percent(JSBI.BigInt(500), BIPS_BASE) // 5%
// if the price slippage exceeds this number, force the user to type 'confirm' to execute
export const PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN: Percent = new Percent(JSBI.BigInt(1000), BIPS_BASE) // 10%
// for non expert mode disable swaps above this
export const BLOCKED_PRICE_IMPACT_NON_EXPERT: Percent = new Percent(JSBI.BigInt(2500), BIPS_BASE) // 25%

// used to ensure the user doesn't send so much ETH so they end up with <.01
export const MIN_ETH: JSBI = JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(16)) // .01 ETH
