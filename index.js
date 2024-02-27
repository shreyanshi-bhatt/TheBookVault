import express from 'express';
import mongoose from 'mongoose';
import { Book } from './models/bookModel.js';
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';
import 'dotenv/config';

const mongoDBUrl = process.env.MONGODB_URI;

const PORT = 3000 || process.env.PORT;

const app = express();

// middleware to parse the request body
app.use(express.json());

// middleware to handle CORS (Cross-Origin Resource Sharing) Policy
// Option 1: Allow all origins with default of cors(*)
app.use(cors());
// Option 2: Allow custom origins
// app.use(
//     cors({
//         origin: 'http://localhost:3000',
//         methods: ["GET", "POST", "PUT", "DELETE"],
//         allowedHeaders: ["Content-Type"]
//     })
// )


app.get('/', (req, res) => {
    console.log(req);
    return res.status(234).send("Welcome to the backend of Shreyanshi's Bookstore!");
})

app.use('/books', booksRoute);

mongoose
.connect(mongoDBUrl)
.then(() => {
    console.log("Connected to MongoDB...");
    app.listen(PORT, () => {
        console.log("Server Up & running...");
    })
})
.catch((error) => {
    console.log("Error connecting to MongoDB: ", error);
})


