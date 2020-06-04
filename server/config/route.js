const location = require('../app/controllers/locationRoute');
const services = require('../app/controllers/servicesRoute');
const tasks = require('../app/controllers/tasksRoute');
const path = require('path'); 

module.exports = (app) => {
    app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

    app.get('/tasks', tasks.getTasks); 
    app.get('/tasks/:id', tasks.getCurrentTask);
    app.post('/tasks', tasks.addTask);
    app.put('/tasks/:id', tasks.updateTask);
    app.delete('/tasks/:id', tasks.deleteTask);

    app.get('/services', services.getServices);
    app.get('/services/:id', services.getCurrentService);
    app.post('/services', services.addService);
    app.put('/services/:id', services.updateService);
    app.delete('/services/:id', services.deleteService);  

    app.get('/location', location);

}