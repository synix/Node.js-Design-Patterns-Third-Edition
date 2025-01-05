import superagent from 'superagent'

const start = Date.now()
// 发送请求20次
let count = 20
// 记录还未完成的请求
let pending = count
const interval = 200
// 期待输入的命令为：node loadTest.js product=app
const query = process.argv[2] ? process.argv[2] : 'product=book'

function sendRequest () {
  superagent.get(`http://localhost:8000?${query}`)
    .then(result => {
      console.log(result.status, result.body)
      if (!--pending) {
        console.log(`All completed in: ${Date.now() - start}ms`)
      }
    })

  if (--count) {
    // 延迟200ms后再次发送请求
    setTimeout(sendRequest, interval)
  }
}

sendRequest()
