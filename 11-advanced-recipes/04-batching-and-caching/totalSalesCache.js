import { totalSales as totalSalesRaw } from './totalSales.js'

const CACHE_TTL = 30 * 1000 // 30 seconds TTL
const cache = new Map()

export function totalSales (product) {
  if (cache.has(product)) {
    console.log(`Cache hit for ${product}...`)
    return cache.get(product)
  }

  const resultPromise = totalSalesRaw(product)
  cache.set(product, resultPromise)
  resultPromise.then(() => {
    setTimeout(() => {
      console.log(`Cache delete for ${product}...`)
      cache.delete(product)
    }, CACHE_TTL)
  }, err => {
    cache.delete(product)
    throw err
  })

  return resultPromise
}
