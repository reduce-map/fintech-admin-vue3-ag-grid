import BaseService from './base-service'

export interface Cryptocurrency {
  id: string
  symbol: string
  name: string
  image: string
  current_price: number
  market_cap: number
  market_cap_rank: number
  fully_diluted_valuation: number | null
  total_volume: number
  high_24h: number
  low_24h: number
  price_change_24h: number
  price_change_percentage_24h: number
  market_cap_change_24h: number
  market_cap_change_percentage_24h: number
  circulating_supply: number
  total_supply: number | null
  max_supply: number | null
  ath: number
  ath_change_percentage: number
  ath_date: string
  atl: number
  atl_change_percentage: number
  atl_date: string
  roi: null | {
    times: number
    currency: string
    percentage: number
  }
  last_updated: string
}

const coinGeckoService = {
  async getCryptocurrencies(): Promise<Cryptocurrency[]> {
    // throw new Error('Not implemented'); // uncomment to see difference with 12.07.2024 :)
    const cachedData = sessionStorage.getItem('coin-gecko-Data')

    if (!!cachedData) {
      // assumption that the data is in the correct format
      // assuming try catch in the calling function
      return JSON.parse(cachedData) as unknown as Cryptocurrency[]
    }

    const response = await BaseService.get<Cryptocurrency[]>('https://api.coingecko.com/api/v3/coins/markets', {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: 250,
        page: 1,
        sparkline: false,
      },
    })

    sessionStorage.setItem('coin-gecko-Data', JSON.stringify(response.data))

    return response.data
  },
}

export default coinGeckoService
