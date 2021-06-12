const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const fs = require('fs')
const app = express()
const port = 3003
app.use(cors())
app.use(express.static('client/build'))

const url =
  'mongodb://Administartor:insert69@kr-web.cluster-cj8jptizxiwh.eu-central-1.docdb.amazonaws.com:27017/?ssl=true&ssl_ca_certs=rds-combined-ca-bundle.pem&replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false'

mongoose
  .connect(url, {
    useNewUrlParser: true,
    ssl: true,
    sslValidate: true,
    sslCA: fs.readFileSync('./rds-combined-ca-bundle.pem'),
  })
  .then(() => console.log('Connection to DB successful'))
  .catch((err) => console.error(err, 'Error'))

const kittySchema = new mongoose.Schema({
  name: String,
})

const Kitten = mongoose.model('Kitten', kittySchema)

const silence = new Kitten({ name: 'Silence' })
console.log(silence.name)
silence.save(function (err, silense) {
  if (err) return console.error(err)
  console.log('saved!!!')
})

app.get('/test', async (req, res) => {
  const result = await Kitten.find({})
  res.status(200).json(result)
})

// const MongoClient = require('mongodb').MongoClient,
//   f = require('util').format,
//   fs = require('fs')

//Specify the Amazon DocumentDB cert
// const ca = [fs.readFileSync('rds-combined-ca-bundle.pem')]

//Create a MongoDB client, open a connection to Amazon DocumentDB as a replica set,
//  and specify the read preference as secondary preferred

// let db

// const client = MongoClient.connect(
//   'mongodb://Administartor:insert69@kr-web.cluster-cj8jptizxiwh.eu-central-1.docdb.amazonaws.com:27017/?ssl=true&ssl_ca_certs=rds-combined-ca-bundle.pem&replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false',
//   {
//     sslValidate: true,
//     sslCA: ca,
//     useNewUrlParser: true,
//   },

//   function (err, client) {
//     if (err) throw err
//     //Specify the database to be used
//     db = client.db('test')
//   }
// )

// app.get('/test', async (req, res) => {
//   let col = db.collection('profiles')
//   col.insertOne({ hello: 'Amazon DocumentDB' }, function (err, result) {
//     col.find({}, function (err, result2) {
//       result2.toArray().then((data) => {
//         console.log(data)
//         res.status(200).json(data)
//       })
//     })
//   })
// })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
