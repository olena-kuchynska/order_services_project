const ObjectID = require('mongodb').ObjectID;
const mongoose = require('mongoose');
const TaskModel = mongoose.model('tasks');

const getTasks = (req, res) => {
    TaskModel.find((err, docs) => {
        if(err) {
            console.error(err);
            return res.sendStatus(500);
        }
        res.send(docs);
    });
}

const getCurrentTask = (req, res) => {
    TaskModel.findOne({_id: ObjectID(req.params.id)}, (err, docs) => {
        if(err) {
            console.error(err);
            return res.sendStatus(500);
        }
        res.send(docs);
    });
}

const addTask = (req, res) => {
    let task = new TaskModel({
        typeOfService: req.body.typeOfService,
        taskOfService: req.body.taskOfService, 
        dateCreating: req.body.dateCreating, 
        taskText: req.body.taskText, 
        description: req.body.description, 
        location: req.body.location 
    });

    task.save(err => {
        if(err) {
            console.error(err);
            return res.sendStatus(500);
        }
        res.sendStatus(200);
    });
}

const updateTask = (req, res) => {
    TaskModel.findById(req.params.id, (err, task) => {
        if(err) {
            console.error(err);
            return res.sendStatus(500);
        }
        task.typeOfService = req.body.typeOfService;
        task.taskOfService = req.body.taskOfService;
        task.dateCreating = req.body.dateCreating;
        task.taskText = req.body.taskText;
        task.description = req.body.description;
        task.location = req.body.location;
        task.save();
        res.sendStatus(200);
    });
    
}

const deleteTask = (req, res) => {
    TaskModel.findById(req.params.id, (err, task) => {
        if(err) {
            console.error(err);
            return res.sendStatus(500);
        }
        task.remove();
        res.sendStatus(200);        
    });
}

module.exports = {
    getTasks,
    getCurrentTask,
    addTask,
    updateTask,
    deleteTask
}