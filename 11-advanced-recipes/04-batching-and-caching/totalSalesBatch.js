import { totalSales as totalSalesRaw } from './totalSales.js'

const runningRequests = new Map()

export function totalSales (product) {
  if (runningRequests.has(product)) {
    console.log(`Batching for ${product}...`)
    return runningRequests.get(product)
  }

  const resultPromise = totalSalesRaw(product)
  runningRequests.set(product, resultPromise)
  resultPromise.finally(() => {
    console.log(`Deleting ${product} from runningRequests...`)
    runningRequests.delete(product)
  })

  return resultPromise
}
