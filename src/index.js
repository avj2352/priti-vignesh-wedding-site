const express = require('express');
const path = require('path');
const { getPORT } = require('./util/config.util');
require('./util/colors');

const app = express();
const PORT = getPORT();

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({extended: false}));

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use('/', express.static(path.join(__dirname, 'public')));
// app.get('/',(req, res) => {res.send('Hello World')});

const server = app.listen(PORT, ()=>{
    console.log(`Server is listening on port - ${server.address().port}`.info);
});
