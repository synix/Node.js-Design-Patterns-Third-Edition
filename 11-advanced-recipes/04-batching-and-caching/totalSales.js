import level from 'level'
import sublevel from 'subleveldown'

const db = level('example-db')
const salesDb = sublevel(db, 'sales', { valueEncoding: 'json' })

export async function totalSales (product) {
  const now = Date.now()
  let sum = 0

  for await (const transaction of salesDb.createValueStream()) {
    if (!product || transaction.product === product) {
      sum += transaction.amount
    }
  }

  // 因为`loadTest.js`中的请求的间隔为200ms, 所以`totalSales()`的执行时间至少大于200ms, 否则无法观察到batching(也就是`totalSalesBatch.js`)的优化效果
  await new Promise(resolve => setTimeout(resolve, 500))

  console.log(`totalSales() took: ${Date.now() - now}ms`)

  return sum
}
