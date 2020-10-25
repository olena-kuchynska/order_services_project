const ObjectID = require('mongodb').ObjectID;
const mongoose = require('mongoose');
const ServiceModel = mongoose.model('services');

const getServices = (req, res) => {
    ServiceModel.find((err, docs) => {
        if(err) {
            console.error(err);
            return res.sendStatus(500);
        }
        res.send(docs);
    });
}

const getCurrentService = (req, res) => {
    ServiceModel.findOne({_id: ObjectID(req.params.id)}, (err, docs) => {
        if(err) {
            console.error(err);
            return res.sendStatus(500);
        }
        res.send(docs);
    });
}

const addService = (req, res) => {
    let service = new ServiceModel({
        type: req.body.type, 
        tasks: req.body.tasks
    });

    service.save(err => {
        if(err) {
            console.error(err);
            return res.sendStatus(500);
        }
        res.send(service);
    });
}
const updateService = (req, res) => {
    ServiceModel.findById(req.params.id, (err, service) => {
        if(err) {
            console.error(err);
            return res.sendStatus(500);
        }
        service.type = req.body.type;
        service.tasks = req.body.tasks;
        task.save();
        res.sendStatus(service);
    });
    
}

const deleteService = (req, res) => {
    ServiceModel.findById(req.params.id, (err, service) => {
        if(err) {
            console.error(err);
            return res.sendStatus(500);
        }
        service.remove();
        res.sendStatus(200);
    });
    
}

module.exports = {
    getServices,
    getCurrentService,
    addService,
    updateService,
    deleteService
}