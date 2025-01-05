import level from 'level'
import sublevel from 'subleveldown'
import nanoid from 'nanoid'

// 'example-db'为LevelUP database的存储位置
const db = level('example-db')
// salesDb为一个LevelUP database的一个sublevel, 也就是一个subsecion
const salesDb = sublevel(db, 'sales', { valueEncoding: 'json' })
const products = ['book', 'game', 'app', 'song', 'movie']

async function populate () {
  // 随机生成100000个sale条目
  for (let i = 0; i < 100000; i++) {
    await salesDb.put(nanoid(), {
      amount: Math.ceil(Math.random() * 100),
      product: products[Math.floor(Math.random() * 5)]
    })
  }

  console.log('DB populated')
}

populate()
