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

app.get('/health', (req, res) => {
    const dbReady = mongoose.connection.readyState === 1;
    res.status(dbReady ? 200 : 500).json({ mongoConnected: dbReady });
});

async function startServer() {
    try {
        // Use Docker MongoDB instead of cloud
        const connectionString =
            process.env.MONGO_URI ||
            "mongodb://mongo:27017/myappdb";

        mongoose.set('strictQuery', true);
        
        // Remove deprecated options
        await mongoose.connect(connectionString);
        
        console.log("Connected to MongoDB");

        app.listen(port, '0.0.0.0', () => {
            console.log(`Server is running on port ${port}`); // Fixed: use backticks
        });
    } catch (error) {
        console.error("Failed to connect to MongoDB", error);
        process.exit(1);
    }
}

startServer();