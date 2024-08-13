

import express from 'express';

import cors from 'cors';


import Connect_db from './database/data.js';

import 'dotenv/config';

//import router from './Routes/user.routes.js';

import router from './Routes/route.js';

const app = express();
const port = process.env.PORT || 4000;

app.use(cors({
  origin: '*'
}));

app.use(express.json());



app.get('/', (req, res) => {
  res.send('Hello World!');
});

const fruit = ["apple", "grapes", "orbhi"]


Connect_db()

app.get('/fruit', (req, res) => {

res.send(fruit)


})

//app.use('/api/users',  router);

app.use('/api/users',  router);


app.listen(port, () => {
  console.log(`Server is running zaalima at http://localhost:${port}`);
});







