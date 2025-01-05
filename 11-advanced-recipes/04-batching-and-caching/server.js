import { createServer } from 'http'
// import { totalSales } from './totalSales.js'
// import { totalSales } from './totalSalesBatch.js'
import { totalSales } from './totalSalesCache.js'

createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost')
  // 期待输入的URL为：http://localhost:8000/?product=app
  const product = url.searchParams.get('product')
  console.log(`Processing query: ${url.search}`)

  const sum = await totalSales(product)

  res.setHeader('Content-Type', 'application/json')
  res.writeHead(200)
  res.end(JSON.stringify({
    product,
    sum
  }))
}).listen(8000, () => console.log('Server started'))
