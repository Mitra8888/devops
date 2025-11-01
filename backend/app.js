const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

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

const anuglarDistPath = path.join(__dirname, '../frontend/dist/frontend');
app.use(express.static(anuglarDistPath));
app.get(/^(?!\/api).*/, (req, res) => {
    res.sendFile(path.join(anuglarDistPath, 'index.html'));
});



app.get('/health', (req, res)=>{
    const dbReady = mongoose.connection.readyState ===1;
    res.status(dbReady ? 200: 500).json({ mongoConnected:dbReady});
})


async function startServer(){
    try {
        const connectionString =
        process.env.MONGO_URI ||
        "mongodb+srv://mitra:mitra@mitra.rjpyleu.mongodb.net/?retryWrites=true&w=majority&appName=Mitra";

        mongoose.set('strictQuery', true);
        await mongoose.connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDb");

        app.listen(port, '0.0.0.0', ()=>{
            console.log('server is running on port ${port}');
        });
    } catch (error){
        console.errror("failed to connect to mongodb", error);
        process.exit(1);
    }
} 
startServer();