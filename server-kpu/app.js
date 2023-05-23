require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

const baseUrl = process.env.BASE_URL || '/e-rekap';
const { router } = require('./routes/routes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// app.use(cors({
//     origin: ['http://localhost:3000',
//         'http://localhost:5000',
//         ' https://secondhand-group4.herokuapp.com',
//         'https://second-hand-by-group-4.netlify.app', 'https://second-hand-by-group-4.vercel.app', 'https://second-hand-by-group-4.herokuapp.com'],
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
//     credentials: true,
// }));

// app.use(cors({
//     origin: '*',
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
//     credentials: true
// }));

app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
}));

app.use(`${baseUrl}`, router);

module.exports = app;
