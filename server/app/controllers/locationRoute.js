const request = require('request');

module.exports = (req, res) => {
    request('https://ipinfo.io', (err, respons, body) => {
    if(err) {
        console.error(err);
        return res.sendStatus(500);
    }
    return res.send(body);
    });
}