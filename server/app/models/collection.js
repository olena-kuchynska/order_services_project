const mongoose = require('mongoose');

const taskModel = mongoose.model('tasks', {
    typeOfService: String,
    taskOfService: String, 
    dateCreating: Number, 
    taskText: String, 
    description: String, 
    location: String
});

const serviceModel = mongoose.model('services', {
    type: String, 
    tasks: Array
});
