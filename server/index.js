const config = require('./config/app');
const mongoose = require('mongoose');
require('./app/models/collection');

const express = require('express');
const app = express(); //creating server
require('./config/express') (app, express);

const configFile = require('../webpack.config.js');

require('./config/webpack') (app, configFile);

require('./config/route') (app);

const open = require('open');

mongoose.connect(config.mongodbUrl, { useNewUrlParser: true }, err => {
    console.log('Connection success');      

    app.listen(config.appPort, () => {
        console.log('Server running...');
        console.log('Listening at localhost:' + config.appPort );
        console.log('Opening your system browser...');
        console.log();
        open(config.target_entry());
    })  
});
