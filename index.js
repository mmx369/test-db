const express = require('express')
const { MongoClient } = require('mongodb')
const assert = require('assert')
const cors = require('cors')
const app = express()
const port = 3003
app.use(cors())

const uri =
  'mongodb+srv://max:insert69@cluster0.gqoe4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

async function listDatabases(client) {
  databasesList = await client.db().admin().listDatabases()
  console.log('Databases:')
  databasesList.databases.forEach((db) => console.log(` - ${db.name}`))
  return databasesList.databases
}

async function findAll(client) {
  const collection = client.db('myFirstDatabase').collection('theestOne')
  return await collection.find({}).toArray()
}

async function main() {
  try {
    await client.connect()
    await listDatabases(client)
    return await findAll(client)
  } catch (e) {
    console.error(e)
  }
}

app.get('/', async (req, res) => {
  const list = await main().catch(console.error)
  // console.log(333333, list)
  res.status(200).json(list)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
