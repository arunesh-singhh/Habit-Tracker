import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { connectToDB } from './backend/config/mongodb.js';
import expressLayouts from 'express-ejs-layouts';
import router from './backend/routes/habit.router.js';

const server = express();

server.use(express.json());
// for data passed inside the url
server.use(express.urlencoded({
    extended: true
}));

// static folder
server.use(express.static('frontend'));

// // using layouts
server.use(expressLayouts);

// // extracting stylesheets and scripts for individual pages
server.set('layout extractStyles', true);
server.set('layout extractScripts', true);


// // setting view engine as ejs and defining its path
server.set('view engine', 'ejs');
server.set('views', './frontend/views');

// setting up routes
server.use('/', router);

server.listen(process.env.PORT, () => {
    console.log(`server is running on port:${process.env.PORT}`);
    connectToDB();
});

export default server;