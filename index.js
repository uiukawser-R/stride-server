const express = require('express')
const cors=require('cors')
require('dotenv').config()
const app = express()
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json())








const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.opp4yua.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {


    const eventDB = client.db("eventDB");
        // const userDB = client.db("userDB");
        const eventsCollection = eventDB.collection("eventsCollection");
        // const usersCollection = userDB.collection("usersCollection");



        app.get("/events", async (req, res) => {
            const eventData = eventsCollection.find();
            const result = await eventData.toArray();
            res.send(result);

        })




    // await client.connect();
    // await client.db("admin").command({ ping: 1 });
    // console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);








app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})