import BaseService from './base-service'
import { getSavesCoinGecko } from '../utils/coingecko-sample-response.ts'

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
    try {
      const response = await BaseService.get<Cryptocurrency[]>('https://api.coingecko.com/api/v3/coins/markets', {
        params: {
          vs_currency: 'usd',
          order: 'market_cap_desc',
          per_page: 250,
          page: 1,
          sparkline: false,
        },
      })
      console.log(response.data)
      return response.data
    } catch (error) {
      console.error('Error fetching cryptocurrencies from API:', error)
      console.log('Using sample data instead.')
      return getSavesCoinGecko()
    }
  },
}

export default coinGeckoService
