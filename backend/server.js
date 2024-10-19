const express = require('express')
const dotenv = require('dotenv')
const { MongoClient } = require('mongodb');
const bodyparser = require('body-parser')
var cors = require('cors')




dotenv.config()
const app = express()
const port = 3000

app.use(bodyparser.json())
app.use(cors())

// Connection URL
const url = process.env.MONGO_URI;
const client = new MongoClient(url);

// Database Name
const dbName = 'passwordManager';
client.connect();
console.log('Connected successfully to server');
const db = client.db(dbName);

// Get all passwords
app.get('/', async (req, res) => {
    const collection = db.collection('passwords');
    const findResult = await collection.find({}).toArray();
    res.json(findResult)
})

// Save a password
app.post('/',async (req,res)=>{
    const password = req.body
    const collection = db.collection('passwords');
    await collection.insertOne(password);
    res.send({success:true})
})

// Delete a password
app.delete('/', async (req, res) => {
    try {
        const password = req.body;
        const collection = db.collection('passwords');
        const result = await collection.deleteOne(password);

        if (result.deletedCount === 0) {
            return res.status(404).send({ success: false, message: 'No matching password found' });
        }
        
        res.send({ success: true, result: result });
    } catch (error) {
        res.status(500).send({ success: false, error: error.message });
    }
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
