const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

//enable cors
app.use(cors());
//enable json parser
app.use(express.json());
// route the customer api
const customerRoutes = require('./routes/customers');
// use the customer routes
app.use('/api/customers', customerRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to Customers API!');
});

app.listen(port, (error) => {
    if (!error)
        console.log("Server is Successfully Running, and App is listening on port " + port);
    else
        console.log("Error occurred, server can't start", error);
});

main().catch(err => console.log(err));

async function main() {
    const connectionString = process.env.MONGO_URI || "mongodb+srv://mitra:mitra@mitra.rjpyleu.mongodb.net/?retryWrites=true&w=majority&appName=Mitra";
    
    mongoose.set('strictQuery', true);
    await mongoose.connect(connectionString,
        { useNewUrlParser: true, useUnifiedTopology: true }
    );
    console.log("Connected to MongoDB", connectionString);
}