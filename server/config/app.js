module.exports = {
    appPort: 3333,
    mongodbUrl: 'mongodb://localhost:27017',
    dbname: 'myDB',
    target_entry: function() {return 'http://localhost:' + this.appPort},
}