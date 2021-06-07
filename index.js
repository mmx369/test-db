const express = require('express')
// const { MongoClient } = require('mongodb')
// const assert = require('assert')
const cors = require('cors')
const app = express()
const port = 3003
app.use(cors())
app.use(express.static('client/build'))

const MongoClient = require('mongodb').MongoClient,
  f = require('util').format,
  fs = require('fs')

//Specify the Amazon DocumentDB cert
const ca = [fs.readFileSync('rds-combined-ca-bundle.pem')]

//Create a MongoDB client, open a connection to Amazon DocumentDB as a replica set,
//  and specify the read preference as secondary preferred
const client = MongoClient.connect(
  'mongodb://Administartor:insert69@kr-web.cluster-cj8jptizxiwh.eu-central-1.docdb.amazonaws.com:27017/?ssl=true&ssl_ca_certs=rds-combined-ca-bundle.pem&replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false',
  {
    sslValidate: true,
    sslCA: ca,
    useNewUrlParser: true,
  },
  function (err, client) {
    if (err) throw err
    //Specify the database to be used
    db = client.db('test')

    //Specify the collection to be used
    col = db.collection('profiles')
    //Insert a single document
    col.insertOne({ hello: 'Amazon DocumentDB' }, function (err, result) {
      //Find the document that was previously written
      col.find({}.toArray(), function (err, result) {
        //Print the result to the screen
        console.log(result)
        //Close the connection
        client.close()
        return result
      })
    })
  }
)

// const uri =
//   'mongodb+srv://max:insert69@cluster0.gqoe4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

// const uri =
//   'mongodb://Administartor:insert69@kr-web.cluster-cj8jptizxiwh.eu-central-1.docdb.amazonaws.com:27017/?ssl=true&ssl_ca_certs=rds-combined-ca-bundle.pem&replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false'

// const client = new MongoClient(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })

// async function listDatabases(client) {
//   databasesList = await client.db().admin().listDatabases()
//   console.log('Databases:')
//   databasesList.databases.forEach((db) => console.log(` - ${db.name}`))
//   return databasesList.databases
// }

// async function findTest(client) {
//   return await db.profiles.find().toArray()
// }

// async function findAll(client) {
//   const collection = client.db('myFirstDatabase').collection('theestOne')
//   return await collection.find({}).toArray()
// }

// async function main() {
//   try {
//     await client.connect()
//     // await listDatabases(client)
//     // return await findAll(client)
//     return await findTest(client)
//   } catch (e) {
//     console.error(e)
//   }
// }

app.get('/test', async (req, res) => {
  const list = await main().catch(console.error)
  // console.log(333333, list)
  res.status(200).json(list)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
